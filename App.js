import { ApolloProvider } from '@apollo/client'
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/Main'
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <>
      <StatusBar style="light"/>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value = {authStorage}>
            <Main />  
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      
    </>
  )
};

export default App;
