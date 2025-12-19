import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// This is our "ProductCard" Lego block
export default function ProductCard() {
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>Image Here</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>Red Jacket</Text>
        <Text style={styles.price}>$99.00</Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,       // Round corners look modern
    margin: 10,             // Space outside the card
    padding: 10,            // Space inside the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,           // Shadow for Android
  },
  imagePlaceholder: {
    width: '100%',          
    height: 150,            // Fixed height
    backgroundColor: '#e0e0e0', // Light grey color
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#888',
  },
  details: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#27ae60', // Green color for money
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});