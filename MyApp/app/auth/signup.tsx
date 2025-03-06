import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../services/firebase';  // Correct path to firebase.ts
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/home'); // Navigate to home page after successful signup
      } catch (error) {
        // Handle error if needed
        console.error('Error signing up:', error); // Navigate to home page after successful signup

      }
    }
  };
  
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <Text style={styles.title}>Sign Up</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
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

//import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
// import { useRouter } from 'expo-router';
// import auth from '@react-native-firebase/auth'; // Correct import for auth (default import)



// export default function SignUpScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   // Handle sign-up using Firebase Auth
//   const handleSignUp = async () => {
//     if (!email || !password) {
//         Alert.alert('Error', 'Please enter both email and password');
//         return;
//       }
  
//       try {
//         await auth().createUserWithEmailAndPassword(email, password);
//         console.log('User signed up successfully!');
//         Alert.alert('Success', 'Account created successfully');
//         router.push('/home'); // Navigate to home page after successful signup
//       } catch (error) {
//         console.error('Error signing up:');
//         Alert.alert('Sign Up Error');
//       }
//     };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
//       <Text style={styles.title}>Sign Up</Text>
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
//       <TouchableOpacity style={styles.button} onPress={handleSignUp}> {/* Call handleSignUp */}
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
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 56,
//     fontWeight: 'bold',
//     color: '#ff5733',
//     marginBottom: 40,
//     textTransform: 'uppercase',
//     letterSpacing: 3,
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
