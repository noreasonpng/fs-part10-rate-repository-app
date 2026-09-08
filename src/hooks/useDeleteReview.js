import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const deleteReviewById = async (id) => {
    await deleteReview({
      variables: {
        deleteReviewId: id,
      },
    });
  };

  return [deleteReviewById];
};

export default useDeleteReview;