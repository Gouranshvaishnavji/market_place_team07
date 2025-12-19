import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* This is our Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Community Market</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
  },
  header: {
    padding: 20,
    backgroundColor: '#3498db', // Blue background
    marginTop: 30, // Pushes it down so it doesn't hide behind the phone notch
  },
  headerText: {
    color: '#fff', // White text
    fontSize: 24, // Big text
    fontWeight: 'bold', // Thick text
  },
});