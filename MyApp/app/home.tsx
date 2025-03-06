import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Modal, TextInput, Alert, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { auth, storage, db } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

interface Post {
  id: string;
  instructions: string;
  difficulty: string;
  time: string;
  imageUrl: string;
  createdAt: number;
  userId: string;
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [addPostModalVisible, setAddPostModalVisible] = useState(false);
  const [difficulty, setDifficulty] = useState('1');
  const [time, setTime] = useState('0-15 min');
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [uploadText, setUploadText] = useState('Upload Image');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(postsQuery);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    if (!instructions.trim()) {
      Alert.alert('Error', 'Please enter instructions');
      return;
    }

    try {
      setIsLoading(true);

      // 1. Upload image to Firebase Storage
      const response = await fetch(image);
      const blob = await response.blob();
      const imageRef = ref(storage, `posts/${Date.now()}`);
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      // 2. Create post document in Firestore
      const postData = {
        instructions: instructions.trim(),
        difficulty,
        time,
        imageUrl,
        createdAt: Date.now(),
        userId: auth.currentUser?.uid,
      };

      await addDoc(collection(db, 'posts'), postData);

      // Reset form and close modal
      setInstructions('');
      setDifficulty('1');
      setTime('0-15 min');
      setImage(null);
      setUploadText('Upload Image');
      setAddPostModalVisible(false);
      Alert.alert('Success', 'Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        alert("Permission to access media library is required!");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setUploadText('Image Selected');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setAddPostModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={30} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.title}>HOME</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="person-circle-outline" size={30} color="#007BFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.postsContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Loading posts...</Text>
        ) : posts.length === 0 ? (
          <Text style={styles.noPostsText}>No posts yet.</Text>
        ) : (
          posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Image 
                source={{ uri: post.imageUrl }} 
                style={styles.postImage}
                resizeMode="cover"
              />
              <View style={styles.postContent}>
                <Text style={styles.postInstructions}>{post.instructions}</Text>
                <View style={styles.postMetadata}>
                  <Text style={styles.metadataText}>Difficulty: {post.difficulty}</Text>
                  <Text style={styles.metadataText}>Time: {post.time}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addPostModalVisible}
        onRequestClose={() => setAddPostModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Details</Text>
          <Text style={styles.label}>Instructions</Text>
          <TextInput 
            style={styles.aboutBox} 
            placeholder="Enter instructions..." 
            placeholderTextColor="#888" 
            multiline 
            value={instructions} 
            onChangeText={setInstructions} 
          />
          <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
            <Text>{uploadText}</Text>
          </TouchableOpacity>
          <View style={styles.selectionContainer}>
            <Text style={styles.label}>DIFFICULTY</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => {
              setShowDifficultyDropdown(!showDifficultyDropdown);
              setShowTimeDropdown(false);
            }}>
              <Text style={styles.buttonText}>{difficulty} ▼</Text>
            </TouchableOpacity>
            {showDifficultyDropdown && (
              <View style={styles.dropdownOptions}>
                {['1', '2', '3', '4', '5'].map(option => (
                  <TouchableOpacity key={option} onPress={() => { setDifficulty(option); setShowDifficultyDropdown(false); }}>
                    <Text style={styles.dropdownText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <Text style={styles.label}>TIME</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => {
              setShowTimeDropdown(!showTimeDropdown);
              setShowDifficultyDropdown(false);
            }}>
              <Text style={styles.buttonText}>{time} ▼</Text>
            </TouchableOpacity>
            {showTimeDropdown && (
              <View style={styles.dropdownOptions}>
                {['0-15 min', '15-30 min', '30-60 min', '60-90 min', '90+ min'].map(option => (
                  <TouchableOpacity key={option} onPress={() => { setTime(option); setShowTimeDropdown(false); }}>
                    <Text style={styles.dropdownText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <TouchableOpacity 
            style={[styles.postButton, isLoading && styles.disabledButton]} 
            onPress={handlePost}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>{isLoading ? 'Posting...' : 'POST →'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalClose} onPress={() => setAddPostModalVisible(false)}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  selectionContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  uploadBox: {
    width: 150,
    height: 150,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  aboutBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dropdownContainer: {
    position: 'relative',
    width: '100%',
  },
  dropdown: {
    backgroundColor: '#222',
    padding: 10,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  dropdownOptions: {
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    top: 40,
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownText: {
    padding: 10,
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalClose: {
    marginTop: 10,
  },
  modalTitle: {
    color: '#ff5733',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalCloseText: {
    color: '#ff5733',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  filterButton: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  postsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postContent: {
    padding: 15,
  },
  postInstructions: {
    fontSize: 16,
    marginBottom: 10,
  },
  postMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metadataText: {
    color: '#666',
    fontSize: 14,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  noPostsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});
