import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  date: {
    marginTop: 4,
    color: '#666',
  },
});

const ReviewItem = ({ review }) => {
  const date = new Date(review.createdAt);

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const heading = review.user
    ? review.user.username
    : review.repository?.fullName;

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text fontWeight="bold">{review.rating}</Text>
      </View>
      <View style={styles.content}>
        <Text fontWeight="bold">{heading}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
