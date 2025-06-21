import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LongPressedContext from "../../context/LongPressContext";
import { useContext } from "react";
import { MMKVLoader } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().initialize();

const HeaderRightIcon = () => {
  const isDarkMode = useColorScheme() === "dark";

  const { longPressed, selectedIndexes, setLongPressed, setSelectedIndexes } =
    useContext(LongPressedContext);
  // console.log(selectedIndexes);
  const handleDelete = () => {
    const examArray = MMKV.getMap("examArray");
    // console.log(examArray);
    // while (selectedIndexes.length !== 0) {
    // console.log(selectedIndexes[0]);
    const newExamArray = examArray.filter(
      (exam, index) => !selectedIndexes.includes(index)
    );
    // console.log(newExamArray);
    MMKV.setMap("examArray", newExamArray);
    setSelectedIndexes((prev) =>
      // console.log(typeof prev, prev);
      prev.slice(1)
    );
    // }
    setLongPressed((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {longPressed && (
        <Pressable style={[styles.iconPressable]}>
          <Icon
            name="pencil"
            size={25}
            color={isDarkMode ? "white" : "black"}
          />
        </Pressable>
      )}
      {longPressed && (
        <Pressable style={[styles.iconPressable]} onPress={handleDelete}>
          <Icon name="delete" size={25} color="#F44336" />
        </Pressable>
      )}
      <Pressable style={[styles.iconPressable]}>
        <Icon
          name="dots-vertical"
          size={25}
          color={isDarkMode ? "white" : "black"}
        />
      </Pressable>
    </View>
  );
};

export default HeaderRightIcon;

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 12 },
  iconPressable: { paddingHorizontal: 4 },
});
