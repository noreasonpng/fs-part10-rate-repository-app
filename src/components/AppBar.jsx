import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 16,
    backgroundColor: '#24292e',
  },
  scrollView: {
    flexGrow: 0,
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
  },
  link: {
    marginRight: 24,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data } = useQuery(ME);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  const tabs = [
    { name: 'Repositories', to: '/' },
    ...(data?.me
      ? [
          { name: 'Sign out', onPress: signOut },
          { name: 'Create a review', to: '/reviewform' },
          { name: 'My Reviews', to: '/userreviews' },
        ]
      : [
          { name: 'Sign in', to: '/signin' },
          { name: 'Sign up', to: '/signup' },
        ]),
  ].filter(Boolean);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.tabs}
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map((tab) =>
          tab.onPress ? (
            <Pressable key={tab.name} onPress={tab.onPress} style={styles.link}>
              <Text color="textLight" style={styles.text}>
                {tab.name}
              </Text>
            </Pressable>
          ) : (
            <Link key={tab.name} to={tab.to} style={styles.link}>
              <Text color="textLight" style={styles.text}>
                {tab.name}
              </Text>
            </Link>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
