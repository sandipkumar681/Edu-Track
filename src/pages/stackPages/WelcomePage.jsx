import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import aiImage from "../../images/aiImage.jpg";
import { useEffect, useState } from "react";
import { MMKVLoader } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().initialize();

const WelcomePage = ({ navigation }) => {
  const [mockExamTypeArray, setMockExamTypeArray] = useState([
    { id: 1, name: "UPSC", selected: false },
    { id: 2, name: "SSC", selected: false },
    { id: 3, name: "NDA", selected: false },
    { id: 4, name: "Railway", selected: false },
    { id: 5, name: "Banks", selected: false },
    { id: 6, name: "NEET", selected: false },
    { id: 7, name: "JEE", selected: false },
    { id: 8, name: "MCA", selected: false },
  ]);

  const [doesAnyExamItemSelected, setDoesAnyExamItemSelected] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);

  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    const checkIfAnyExamItemSelected = () => {
      setDoesAnyExamItemSelected(
        mockExamTypeArray.some((item) => item.selected === true)
      );
    };

    checkIfAnyExamItemSelected();
  }, [mockExamTypeArray]);

  useEffect(() => {
    const getNameAndAvatarUri = async () => {
      setName(await MMKV.getStringAsync("name"));
      setAvatar(await MMKV.getStringAsync("avatarUri"));
    };

    getNameAndAvatarUri();
  });

  const handleSkip = () => {
    navigation.replace("Edutrack");
  };

  const handleNext = () => {
    if (!doesAnyExamItemSelected) {
      Alert.alert("Incorrect Input", "No exam selected.");
      return;
    }

    navigation.replace("Edutrack");
  };

  return (
    <View
      style={[
        styles.welcomePageContainer,
        isDarkMode ? styles.darkBg : styles.whiteBg,
      ]}
    >
      <View style={[styles.imageContainer]}>
        <Image
          style={styles.image}
          source={avatar ? { uri: avatar } : aiImage}
        />
      </View>
      <Text
        style={[
          styles.imageContainerText,
          isDarkMode ? styles.whiteText : styles.darkText,
        ]}
      >
        Hello, <Text style={styles.userNameText}>{name}</Text> 👋
      </Text>
      <Text
        style={[
          isDarkMode ? styles.whiteText : styles.darkText,
          styles.middleText,
        ]}
      >
        Choose Your Exam Type
      </Text>
      <View style={styles.examTypeContainer}>
        {mockExamTypeArray.map((item) => (
          <Pressable
            key={item.id}
            style={[
              styles.examItemContainer,
              item.selected ? styles.examItemBackgroundColor : "",
            ]}
            onPress={() =>
              setMockExamTypeArray((prev) =>
                prev.map((obj) =>
                  obj.id === item.id ? { ...obj, selected: !obj.selected } : obj
                )
              )
            }
          >
            <Text style={[styles.examItemText]}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.buttonWrapper]} onPress={handleSkip}>
          <Text
            style={[
              isDarkMode ? styles.whiteText : styles.darkText,
              styles.buttonWrapperText,
            ]}
          >
            Skip
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.buttonWrapper,
            doesAnyExamItemSelected ? styles.nextBg : styles.disabledNextBg,
          ]}
          onPress={handleNext}
        >
          <Text style={[styles.whiteText, styles.buttonWrapperText]}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  welcomePageContainer: { padding: 6, flex: 1 },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 70,
    marginBottom: 5,
  },
  whiteBg: { backgroundColor: "white" },
  darkBg: { backgroundColor: "black" },
  whiteText: { color: "white" },
  darkText: { color: "black" },
  imageContainerText: { fontSize: 20, textAlign: "center", marginTop: 5 },
  userNameText: { fontWeight: "bold" },
  middleText: {
    fontSize: 28,
    paddingHorizontal: 7,
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  examTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  examItemBackgroundColor: { backgroundColor: "#f69b71" },
  examItemContainer: {
    width: "40%",
    height: 65,
    backgroundColor: "#eee",
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  examItemText: { fontWeight: "600", fontSize: 17 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-around" },
  buttonWrapper: {
    width: "35%",
    borderRadius: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  // skipBg: { backgroundColor: "#051b26" },
  nextBg: { backgroundColor: "#7be2cf" },
  disabledNextBg: { backgroundColor: "#bff1e7" },
  buttonWrapperText: { fontSize: 15 },
});
