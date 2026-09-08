import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, Link } from 'react-router-native';
import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar';
import SignIn from './components/SignIn';
import RepositoryView from './components/RepositoryView';
import SignUp from './components/SignUp';
import ReviewForm from './components/ReviewForm';
import UserReviews from './components/UserReviews';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repositories/:id" element={<RepositoryView />} />
        <Route path="/reviewform" element={<ReviewForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userreviews" element={<UserReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
