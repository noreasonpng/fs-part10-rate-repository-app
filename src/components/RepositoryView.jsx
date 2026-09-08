import { View, Pressable, StyleSheet, Linking, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#0366d6',
    borderRadius: 4,
    margin: 16,
    padding: 12,
  },

  reviewsTitle: {
    marginHorizontal: 16,
    marginBottom: 8,
  },

  separator: {
    height: 8,
  },
});

const RepositoryInfo = ({ repository, onOpenInGitHub }) => (
  <View>
    <RepositoryItem repository={repository} />
    <Pressable style={styles.button} onPress={onOpenInGitHub}>
      <Text color="textLight" fontWeight="bold">
        Open in GitHub
      </Text>
    </Pressable>
    <Text fontWeight="bold" style={styles.reviewsTitle}>
      Reviews
    </Text>
  </View>
);

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Repository could not be loaded.</Text>;
  }

  if (!repository) {
    return <Text>No repository found</Text>;
  }

  const openInGitHub = () => {
    Linking.openURL(repository.url);
  };

  const reviews = repository.reviews?.edges.map(edge => edge.node) || [];

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={repository} onOpenInGitHub={openInGitHub} />
      )}
    />
  );
};

export default RepositoryView;
