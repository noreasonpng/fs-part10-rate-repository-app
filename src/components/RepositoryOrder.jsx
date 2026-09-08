import { Picker } from '@react-native-picker/picker';

const RepositoryOrder = ({ selectedOrder, onOrderChange }) => (
  <Picker selectedValue={selectedOrder} onValueChange={onOrderChange}>
    <Picker.Item label="Latest repositories" value="LATEST" />
    <Picker.Item label="Highest rated" value="HIGHEST_RATED" />
    <Picker.Item label="Lowest rated" value="LOWEST_RATED" />
  </Picker>
);

export default RepositoryOrder;
