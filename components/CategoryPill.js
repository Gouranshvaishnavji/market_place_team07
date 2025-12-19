import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Changed name to "CategoryPill"
export default function CategoryPill({ title }) {
  return (
    <TouchableOpacity style={styles.pill}>
      <Text style={styles.pillText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,      // This is what makes it look like a "Pill"
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});