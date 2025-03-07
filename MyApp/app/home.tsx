import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Modal, TextInput, FlatList, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; // For the "+" icon

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [addPostModalVisible, setAddPostModalVisible] = useState(false);
  const [difficulty, setDifficulty] = useState('1');
  const [time, setTime] = useState('0-15 min');
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [instructions, setInstructions] = useState(['']); 
  const [ingredient, setIngredient] = useState(''); 
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]); 
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

useEffect(() => {
    // Sample recipes data
    setRecipes([
      { id: '1', title: 'Spaghetti Carbonara', difficulty: '2', time: '15-30 min', image: 'https://www.allrecipes.com/thmb/zJzTLhtUWknHXVoFIzysljJ9wR8=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg' },
      { id: '2', title: 'Grilled Chicken', difficulty: '3', time: '45-60 min', image: 'https://www.inspiredtaste.net/wp-content/uploads/2021/06/Grilled-Chicken-Recipe-5-1200.jpg' },
      { id: '3', title: 'Vegetable Stir Fry', difficulty: '1', time: '0-15 min', image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg' },
      { id: '4', title: 'Tacos', difficulty: '1', time: '15-30 min', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/800px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg'},
      { id: '5', title: 'Chicken Alfredo', difficulty: '2', time: '30-45 min', image: 'https://iwashyoudry.com/wp-content/uploads/2022/08/Chicken-Alfredo-Low-Res-21.jpg' },
      { id: '6', title: 'Vegetable Soup', difficulty: '1', time: '30-45 min', image: 'https://feelgoodfoodie.net/wp-content/uploads/2024/11/Creamy-Vegetable-Soup-12.jpg' },
      { id: '7', title: 'Beef Stir Fry', difficulty: '2', time: '15-30 min', image: 'https://www.lemonblossoms.com/wp-content/uploads/2019/03/Easy-Beef-Stir-Fry-S2.jpg' },
      { id: '8', title: 'Shrimp Scampi', difficulty: '2', time: '15-30 min', image: 'https://static01.nyt.com/images/2022/06/02/dining/ShrimpScampi_thumb/ShrimpScampi_thumb-mediumSquareAt3X.jpg' }
    ]);
  }, []);

  const updateInstruction = (text, index) => {
    const newInstructions = [...instructions];
    newInstructions[index] = text;
    setInstructions(newInstructions);
  };
  const removeInstruction = (index) => {
    const newInstructions = [...instructions]; 
    newInstructions.splice(index, 1); 
    setInstructions(newInstructions);
  };

  // Function to add a new empty instruction step
  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const addIngredient = () => {
    if (ingredientSearch && ingredientQuantity) {
      setIngredients([...ingredients, { name: ingredientSearch, quantity: ingredientQuantity }]);
      setIngredientSearch('');
      setIngredientQuantity('');
    }
  };

  return (

    <ScrollView contentContainerStyle={styles.container}>  {/* ScrollView wraps the entire content */}
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text>Difficulty: {item.difficulty}</Text>
              <Text>Time: {item.time}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
          </View>
        )}
      />
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setAddPostModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={30} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.title}>HOME</Text>
        <TouchableOpacity onPress={() => setAddPostModalVisible(true)}>
          <Ionicons name="person-circle-outline" size={30} color="#007BFF" />
        </TouchableOpacity>
      </View>
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={addPostModalVisible}
          onRequestClose={() => setAddPostModalVisible(false)}
        >
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Details</Text>
  
            {/* UPLOAD Section moved to the top */}
            <View style={styles.uploadBox}><Text>UPLOAD IMAGE</Text></View>
  
            <Text style={styles.label}>Instructions</Text>
            <FlatList
              data={instructions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {index > 0 && (
                    <TouchableOpacity style={styles.removeButton} onPress={() => removeInstruction(index)}>
                      <View style={styles.circleContainer}>
                        <Ionicons name="remove" size={13} color="red" />
                      </View>
                    </TouchableOpacity>
                  )}
  
                  <TextInput
                    style={styles.instructionInput}
                    placeholder={`Step ${index + 1}`}
                    placeholderTextColor="#888"
                    multiline
                    value={item}
                    onChangeText={(text) => updateInstruction(text, index)}
                  />
                </View>
              )}
            />
  
            {/* Add Step Button */}
            <TouchableOpacity onPress={addInstruction} style={styles.addButton}>
              <AntDesign name="pluscircle" size={24} color="blue" />
              <Text style={styles.addButtonText}>Add Step</Text>
            </TouchableOpacity>


            <View style={styles.ingredientSection}>
              <TextInput
                style={styles.input}
                placeholder="Search Ingredient"
                value={ingredientSearch}
                onChangeText={setIngredientSearch}
              />
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={ingredientQuantity}
                onChangeText={setIngredientQuantity}
              />
              <TouchableOpacity onPress={addIngredient} style={styles.addButton}>
                <AntDesign name="pluscircle" size={24} color="blue" />
                <Text style={styles.addButtonText}>Add Ingredient</Text>
              </TouchableOpacity>

              {/* Display added ingredients */}
              {ingredients.length > 0 && (
                <View style={styles.ingredientsList}>
                  {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Text>{ingredient.name} - {ingredient.quantity}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View>
              {/* Difficulty Dropdown */}
              <View style={{ marginBottom: showDifficultyDropdown ? 185 : 0 }}>
                <Text style={styles.label}>DIFFICULTY</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => {
                    setShowDifficultyDropdown(!showDifficultyDropdown);
                    setShowTimeDropdown(false);  // Close Time dropdown
                  }}
                >
                  <Text style={styles.buttonText}>{difficulty} ▼</Text>
                </TouchableOpacity>
  
                {showDifficultyDropdown && (
                  <View style={styles.dropdownOptions}>
                    {['1', '2', '3', '4', '5'].map(option => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => {
                          setDifficulty(option);
                          setShowDifficultyDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
  
              {/* Time Dropdown */}
              <View style={{ marginBottom: showTimeDropdown ? 185 : 0 }}>
                <Text style={styles.label}>TIME</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => {
                    setShowTimeDropdown(!showTimeDropdown);
                    setShowDifficultyDropdown(false);  // Close Difficulty dropdown
                  }}
                >
                  <Text style={styles.buttonText}>{time} ▼</Text>
                </TouchableOpacity>
  
                {showTimeDropdown && (
                  <View style={styles.dropdownOptions}>
                    {['0-15 min', '15-30 min', '30-60 min', '60-90 min', '90+ min'].map(option => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => {
                          setTime(option);
                          setShowTimeDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
  
            <TouchableOpacity style={styles.postButton}><Text style={styles.buttonText}>POST →</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalClose} onPress={() => setAddPostModalVisible(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  recipeItem: {
    color:'#ff5733',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    width: 350,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12, 
  },
  recipeInfo: {
    color: '#ff5733',
    flex: 1,
  },
  recipeTitle: {
    maxWidth: 200,
    color: '#ff5733',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  instructionInput: {
    backgroundColor: '#f0f0f0',  // Light gray background
    width: 250,
    padding: 5,  // Add padding inside the text box
    borderRadius: 5,  
    marginRight: '10%',
    marginBottom: 10,  
    fontSize: 16,  
  },
  addButton: {
    flexDirection: 'row',  
    alignItems: 'center', 
    marginTop: 10,
    padding: 10,  
    backgroundColor: '#eee',  
    borderRadius: 5,  
    borderWidth: 0,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -10,
    marginRight: 0,
    backgroundColor: '#ffcccc',
    padding: 0,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 16, 
    color: 'blue',  
    marginLeft: 5,  
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 70,  // Adjusted to make space for fixed header
  },
  selectionContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-start',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  header: {
    position: 'fixed',  // Fix the header at the top of the screen
    top: 0,
    left: 0,
    right: 0,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',  
    alignItems: 'center',  
    padding: 10,
    backgroundColor: 'white', 
    zIndex: 20,  
    height: 60, 
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginBottom: 10,
    outlineColor: '#fff',
  },
  ingredientInput: {
    backgroundColor: '#f0f0f0',  // Light gray background
    width: 200,
    padding: 5,  // Add padding inside the text box
    borderRadius: 5,  
    marginRight: '10%',
    marginBottom: 10,  
    fontSize: 16,  
  },
  quantityInput: {
    backgroundColor: '#f0f0f0',  // Light gray background
    width: 250,
    padding: 5,  
    borderRadius: 5,  
    marginRight: '10%',
    marginBottom: 10,  
    fontSize: 16,  
  },
  ingredientsList: {
    marginTop: 10,
  },
  ingredientItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  ingredientSection: {
    width: '100%',
    marginBottom: 20,
    marginTop:20,
  },
  dropdownOptions: {
    position: 'absolute', 
    top: '100%',
    left: 0, 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  dropdownText: {
    padding: 10,
    textAlign: 'center',
  },
  modalContainer: {
    zIndex: 20,
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
    elevation: 0,
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

