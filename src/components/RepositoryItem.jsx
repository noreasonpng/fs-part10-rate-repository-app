import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    marginRight: 12,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  fullName: {},
  description: {
    marginTop: 4,
  },
  language: {
    alignSelf: 'flex-start',
    marginTop: 8,
    padding: 4,
    backgroundColor: '#0366d6',
    borderRadius: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  stat: {
    alignItems: 'center',
  },
});

const formatCount = (count) => {
  if (count < 1000) return count.toString();

  const thousands = Math.round(count / 100) / 10;
  return `${thousands}k`;
};

const RepositoryItem = ({ repository }) => {
  return (
    <View testID="repositoryItem">
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: repository.ownerAvatarUrl }}
            style={styles.avatar}
          />
          <View style={styles.content}>
            <Text
              fontSize="subheading"
              fontWeight="bold"
              style={styles.fullName}
            >
              {repository.fullName}
            </Text>
            <Text style={styles.description}>{repository.description}</Text>
            <Text color="textLight" style={styles.language}>
              {repository.language}
            </Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text fontWeight="bold">
              {formatCount(repository.stargazersCount)}
            </Text>
            <Text>Stars</Text>
          </View>
          <View style={styles.stat}>
            <Text fontWeight="bold">{formatCount(repository.forksCount)}</Text>
            <Text>Forks</Text>
          </View>
          <View style={styles.stat}>
            <Text fontWeight="bold">{formatCount(repository.reviewCount)}</Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.stat}>
            <Text fontWeight="bold">{repository.ratingAverage}</Text>
            <Text>Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
