
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth functions
import { auth } from '../../services/firebase';  // Import your Firebase auth instance

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      // Try to sign in the user
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, navigate to the home screen
      router.push('/home');
    } catch (error) {
      console.error('Error logging in:'); // Log error for debugging
      alert('Login failed: '); // Show an alert to the user on error
      router.push('/');

    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#555"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backButtonText}>Back</Text>
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
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#ff5733',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 15,
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
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: '#ff5733',
    fontSize: 20,
    fontWeight: '600',
  },
});


// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = () => {
//     router.push('/home');
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
//       <Text style={styles.title}>Log In</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         placeholderTextColor="#555"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="#555"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
//         <Text style={styles.buttonText}>Submit</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
//         <Text style={styles.backButtonText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 56,
//     fontWeight: 'bold',
//     color: '#ff5733',
//     marginBottom: 40,
//   },
//   input: {
//     width: '80%',
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     fontSize: 18,
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: '#ff8c66',
//     paddingVertical: 18,
//     paddingHorizontal: 60,
//     borderRadius: 30,
//     marginVertical: 12,
//     width: 240,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: '700',
//   },
//   backButton: {
//     marginTop: 20,
//   },
//   backButtonText: {
//     color: '#ff5733',
//     fontSize: 20,
//     fontWeight: '600',
//   },
// });