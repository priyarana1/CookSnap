import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <Text style={styles.title}>COOK N SNAP</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/login')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#ff5733',
    marginBottom: 40,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  button: {
    backgroundColor: '#ff8c66',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginVertical: 12,
    width: 240,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
