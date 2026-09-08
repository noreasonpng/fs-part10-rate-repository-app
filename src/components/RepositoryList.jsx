import { FlatList, View, TextInput, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem'
import { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import useDebounce from '../hooks/useDebounce';
import { Link } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryOrder from './RepositoryOrder';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchContainer: {
    padding: 12,
    backgroundColor: 'white',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#e1e4e8',
    borderRadius: 4,
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  onOrderChange,
  searchKeyword,
  onSearchKeywordChange,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      testID="repositoryList"
      data={repositoryNodes}
      ListHeaderComponent={
        <View>
          <View style={styles.searchContainer}>
            <TextInput
              testID="searchInput"
              style={styles.searchInput}
              placeholder="Search repositories"
              value={searchKeyword}
              onChangeText={onSearchKeywordChange}
              autoCapitalize="none"
            />
          </View>
          <RepositoryOrder selectedOrder={selectedOrder} onOrderChange={onOrderChange} />
        </View>
      }
      renderItem={({ item }) => (
        <Link to={`/repositories/${item.id}`}>
          <RepositoryItem repository={item} />
        </Link>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const orderVariables = {
  LATEST: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  HIGHEST_RATED: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  LOWEST_RATED: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('LATEST');
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories({
    ...orderVariables[selectedOrder],
    searchKeyword: debouncedSearchKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      onOrderChange={setSelectedOrder}
      searchKeyword={searchKeyword}
      onSearchKeywordChange={setSearchKeyword}
    />
  );
};
export default RepositoryList;