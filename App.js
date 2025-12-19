import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, StatusBar as RNStatusBar, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import AddProduct from './screens/AddProduct';
import ProductDetails from './screens/ProductDetails';
import ProfileScreen from './screens/ProfileScreen';

// Bottom Tab Component
const BottomTabs = ({ current, navigate }) => (
  <View style={styles.tabBar}>
    <TouchableOpacity 
      style={styles.tabItem} 
      onPress={() => navigate('home')}
    >
      <Text style={[styles.tabIcon, current === 'home' && styles.activeTab]}>🏠</Text>
      <Text style={[styles.tabLabel, current === 'home' && styles.activeTabLabel]}>Home</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      style={styles.tabItem} 
      onPress={() => navigate('add')}
    >
      <View style={styles.addTabButton}>
        <Text style={styles.addTabIcon}>+</Text>
      </View>
      <Text style={styles.tabLabel}>Sell</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      style={styles.tabItem} 
      onPress={() => navigate('profile')}
    >
      <Text style={[styles.tabIcon, current === 'profile' && styles.activeTab]}>👤</Text>
      <Text style={[styles.tabLabel, current === 'profile' && styles.activeTabLabel]}>Profile</Text>
    </TouchableOpacity>
  </View>
);

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
          <View style={styles.fullScreenContainer}>
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

  // Show tabs only on main screens
  const showTabs = ['home', 'profile'].includes(currentScreen);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      
      {showTabs && <BottomTabs current={currentScreen} navigate={navigateTo} />}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  fullScreenContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#3498db',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    height: Platform.OS === 'ios' ? 85 : 65,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 24,
    color: '#999',
    marginBottom: 4,
  },
  activeTab: {
    color: '#3498db',
  },
  tabLabel: {
    fontSize: 10,
    color: '#999',
  },
  activeTabLabel: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  addTabButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    marginTop: -20,
    elevation: 4,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addTabIcon: {
    fontSize: 30,
    color: '#fff',
    marginTop: -2,
  },
});