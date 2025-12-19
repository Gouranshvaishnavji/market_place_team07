import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export default function AuthNavigator() {
  const [screen, setScreen] = useState('login');

  return (
    <View style={styles.container}>
      {screen === 'login' ? (
        <LoginScreen onNavigate={setScreen} />
      ) : (
        <RegisterScreen onNavigate={setScreen} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
