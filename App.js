import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Image } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';

const SplashScreen = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.splashText}>Community Market</Text>
    <ActivityIndicator size="large" color="#3498db" style={styles.spinner} />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
};

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
  },
  spinner: {
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});