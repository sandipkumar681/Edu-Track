import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import aiImage from "../../images/aiImage.jpg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MMKVLoader } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().initialize();

const TestingPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const isDarkMode = useColorScheme() === "dark";
  const styles = getStyles(isDarkMode);

  const handleChoosePhoto = async () => {
    await launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.error("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Name is required.");
      return;
    }
    if (name.trim().length < 3) {
      Alert.alert("Validation", "Name must be atleast 3 character.");
      return;
    }

    if (name.trim().length > 10) {
      Alert.alert("Validation", "Name must not exceed 10 characters.");
      return;
    }

    await MMKV.setStringAsync("name", name);
    if (imageUri) {
      await MMKV.setStringAsync("avatarUri", imageUri);
    }
    navigation.replace("Welcome");
  };

  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkBg : styles.whiteBg]}
    >
      <View style={[styles.imageContainer]}>
        <Image
          style={styles.image}
          source={imageUri ? { uri: imageUri } : aiImage}
        />
        <Pressable style={styles.iconContainer} onPress={handleChoosePhoto}>
          <Icon name="square-edit-outline" size={30} color="red" />
        </Pressable>
      </View>

      <TextInput
        placeholder="What should we call you?"
        value={name}
        onChangeText={(newName) => setName(newName)}
        style={[isDarkMode ? styles.whiteText : styles.darkText, styles.input]}
      />

      <Pressable style={styles.proceedButton} onPress={handleSubmit}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
        <Icon
          name="arrow-right"
          size={20}
          color="#fff"
          style={styles.proceedIcon}
        />
      </Pressable>
    </View>
  );
};

export default TestingPage;

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      position: "relative",
    },
    whiteBg: { backgroundColor: "white" },
    darkBg: { backgroundColor: "black" },
    whiteText: { color: "white" },
    darkText: { color: "black" },
    label: {
      marginBottom: 8,
      fontSize: 20,
      fontWeight: "500",
    },
    input: {
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 6,
      padding: 10,
      marginBottom: 20,
    },
    image: {
      height: 140,
      width: 140,
      borderRadius: 70,
      resizeMode: "cover",
    },
    imageContainer: {
      width: 140,
      height: 140,
      alignSelf: "center",
      marginTop: 70,
      marginBottom: 20,
      position: "relative",
    },
    iconContainer: {
      position: "absolute",
      bottom: 5,
      right: 5,
      backgroundColor: "white",
      borderRadius: 15,
      padding: 4,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    proceedButton: {
      position: "absolute",
      bottom: 70,
      right: 20,
      backgroundColor: "#007bff",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      flexDirection: "row",
      alignItems: "center",
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    proceedButtonText: {
      color: "white",
      fontWeight: "600",
      fontSize: 16,
      marginRight: 8,
    },
    proceedIcon: {
      marginTop: 1,
    },
  });
