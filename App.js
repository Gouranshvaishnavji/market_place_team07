import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, StatusBar as RNStatusBar, ScrollView, TouchableOpacity } from 'react-native';

import ProductCard from './components/ProductCard';
// 1. UPDATED IMPORT: We are now importing CategoryPill
import CategoryPill from './components/CategoryPill';
import AddProduct from './screens/AddProduct';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  if (currentScreen === 'add') {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Add Product</Text>
          <View style={{ width: 50 }} />
        </View>
        <AddProduct />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Community Market</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* CATEGORIES SECTION */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {/* 2. UPDATED COMPONENT: Using the Pill now */}
            <CategoryPill title="All" />
            <CategoryPill title="Electronics" />
            <CategoryPill title="Clothing" />
            <CategoryPill title="Books" />
            <CategoryPill title="Furniture" />
            <CategoryPill title="Toys" />
          </ScrollView>
        </View>

        {/* PRODUCTS LIST */}
        <Text style={styles.sectionTitle}>Recent Items</Text>
        <View style={styles.productsList}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </View>

      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setCurrentScreen('add')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

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
  scrollContent: {
    paddingBottom: 20,
  },
  categoryContainer: {
    paddingVertical: 15,
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  productsList: {
    paddingBottom: 20,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    backgroundColor: '#3498db',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});