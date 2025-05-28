import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import blankArrayImage from "../../images/working-man-checking-giant-check-list.png";

const ExamPage = () => {
  const isDarkMode = useColorScheme() === "dark";

  const examArray = [];

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer]}>
        <Pressable style={[styles.iconPressable]}>
          <Icon name="magnify" size={34} color="#f5eedd" />
        </Pressable>

        <Pressable style={[styles.iconPressable]}>
          <Icon name="dots-vertical" size={34} color="#f5eedd" />
        </Pressable>
      </View>
      <View style={[styles.showExamNameContainer]}>
        {examArray.length === 0 ? (
          <View style={[styles.blankArrayImageContainer]}>
            <Image
              source={blankArrayImage}
              style={[styles.blankArrayImageStyle]}
            />
            <Text style={[styles.whiteText, { fontSize: 16 }]}>
              No exams yet!
            </Text>
          </View>
        ) : (
          {}
        )}
      </View>
      <View style={[styles.plusIconContainer]}>
        <Icon name="plus" size={34} color="#f5eedd" />
      </View>
    </View>
  );
};

export default ExamPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#051b25",
    flex: 1,
  },
  whiteBg: { backgroundColor: "white" },
  darkBg: { backgroundColor: "black" },
  whiteText: { color: "#f5eedd" },
  darkText: { color: "black" },
  imageContainerText: { fontSize: 20, textAlign: "center", marginTop: 5 },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 15,
    marginHorizontal: 5,
  },
  iconPressable: { paddingHorizontal: 4 },
  blankArrayImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  blankArrayImageStyle: { width: 200, height: 200 },
  showExamNameContainer: { flex: 1 },
  plusIconContainer: {
    backgroundColor: "#077a7d",
    padding: 8,
    borderRadius: 50,
    position: "absolute",
    bottom: 18,
    right: 25,
  },
});
