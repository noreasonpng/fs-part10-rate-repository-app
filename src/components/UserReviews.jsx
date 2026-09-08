import {
  FlatList,
  View,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import ReviewItem from './ReviewItem';
import Text from './Text';
import useUserReviews from '../hooks/useUserReviews';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  button: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  viewButton: {
    backgroundColor: '#0366d6',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
  },
  buttonText: {
    color: 'white',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const UserReviewsContainer = ({ reviews, refetch }) => {
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const handleDelete = (review) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteReview(review.id);
            refetch();
          },
        },
      ]
    );
  };

  return (
    <FlatList
      testID="userReviewList"
      data={reviewNodes}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />
          <View style={styles.buttons}>
            <Pressable
              style={[styles.button, styles.viewButton]}
              onPress={() => navigate(`/repositories/${item.repository.id}`)}
            >
              <Text style={styles.buttonText}>View repository</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.deleteButton]}
              onPress={() => handleDelete(item)}
            >
              <Text style={styles.buttonText}>Delete review</Text>
            </Pressable>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={
        <Text style={{ padding: 16 }}>
          You haven't reviewed any repositories yet.
        </Text>
      }
    />
  );
};

const UserReviews = () => {
  const { reviews, loading, error, refetch } = useUserReviews();

  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>Reviews could not be loaded.</Text>;
  }

  return <UserReviewsContainer reviews={reviews} refetch={refetch} />;
};
export default UserReviews;
