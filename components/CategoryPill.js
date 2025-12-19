import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default function CategoryPill({ title }) {
  return (
    <TouchableOpacity style={styles.pill}>
      <Text style={styles.pillText}>{title}</Text>
    </TouchableOpacity>
  );
}

CategoryPill.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  pill: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
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