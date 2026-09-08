import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useUserReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });

  return {
    reviews: data?.me?.reviews,
    loading,
    error,
    refetch,
  };
};

export default useUserReviews;
