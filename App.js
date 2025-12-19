import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, StatusBar as RNStatusBar, ScrollView } from 'react-native';

// 1. We import the Lego Block we made
import ProductCard from './components/ProductCard';

export default function App() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Community Market</Text>
      </View>

      {/* BODY - We use ScrollView so we can list many items */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {/* We place our Lego Block 3 times to simulate a list */}
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light grey background for the whole app
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 50,
  },
  header: {
    padding: 20,
    backgroundColor: '#3498db',
    alignItems: 'center',
    marginBottom: 10, // Space between header and list
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20, // Space at the bottom so the last card isn't cut off
  },
});