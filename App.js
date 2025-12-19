import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import AddProduct from './screens/AddProduct';
import ProductDetails from './screens/ProductDetails';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentScreen('details');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onNavigate={navigateTo} 
            onProductSelect={handleProductSelect} 
          />
        );
      case 'add':
        return (
          <View style={styles.container}>
            <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between' }]}>
              <TouchableOpacity onPress={() => navigateTo('home')}>
                <Text style={styles.headerButtonText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.headerText}>Add Product</Text>
              <View style={{ width: 50 }} />
            </View>
            <AddProduct />
          </View>
        );
      case 'details':
        return (
          <ProductDetails 
            product={selectedProduct} 
            onBack={() => navigateTo('home')} 
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            onBack={() => navigateTo('home')} 
          />
        );
      default:
        return (
          <HomeScreen 
            onNavigate={navigateTo} 
            onProductSelect={handleProductSelect} 
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 50,
  },
  header: {
    padding: 20,
    backgroundColor: '#3498db',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});