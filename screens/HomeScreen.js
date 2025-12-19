import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ProductCard from '../components/ProductCard';
import CategoryPill from '../components/CategoryPill';
import { fetchProducts } from '../services/productService';
import { supabase } from '../services/supabase';

export default function HomeScreen({ onNavigate, onProductSelect }) {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();

    // Real-time subscription
    const subscription = supabase
      .channel('public:products')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'products' },
        (payload) => {
          console.log('New product received!', payload);
          setProducts((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Community Market</Text>
        <TouchableOpacity onPress={() => onNavigate('profile')} style={styles.profileButton}>
           <Text style={styles.profileButtonText}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        
        {/* CATEGORIES SECTION */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
          {products.length === 0 ? (
            <Text style={styles.emptyText}>No products found. Check Supabase RLS policies.</Text>
          ) : (
            products.map((product) => (
              <TouchableOpacity 
                key={product.id} 
                onPress={() => onProductSelect(product)}
                activeOpacity={0.9}
              >
                <ProductCard product={product} />
              </TouchableOpacity>
            ))
          )}
        </View>

      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => onNavigate('add')}>
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    position: 'absolute',
    right: 20,
  },
  profileButtonText: {
    fontSize: 24,
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
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
