import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [addPostModalVisible, setAddPostModalVisible] = useState(false);
  const [difficulty, setDifficulty] = useState('1');
  const [time, setTime] = useState('0-15 min');
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [instructions, setInstructions] = useState('');
  const router = useRouter();

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
          <View style={styles.uploadBox}><Text>UPLOAD</Text></View>
          <Text style={styles.label}>Ingredients</Text>
          <View style={styles.searchContainer}>
            <TextInput style={styles.input} placeholder="Search..." placeholderTextColor="#888" />
          </View>
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
          <TouchableOpacity style={styles.postButton}><Text style={styles.buttonText}>POST →</Text></TouchableOpacity>
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
});
