import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar as RNStatusBar, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ onBack }) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>My Profile</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.email ? user.email.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
          <Text style={styles.name}>User</Text>
          <Text style={styles.email}>{user?.email || 'No email'}</Text>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>My Listings</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Saved Items</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Settings</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },
  logoutButton: {
    borderBottomWidth: 0,
    marginTop: 20,
  },
  logoutText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});
