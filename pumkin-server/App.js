import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Home from './components/Home'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});
