import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, StatusBar as RNStatusBar, ScrollView } from 'react-native';

import ProductCard from './components/ProductCard';
// 1. UPDATED IMPORT: We are now importing CategoryPill
import CategoryPill from './components/CategoryPill';

export default function App() {
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
  }
});