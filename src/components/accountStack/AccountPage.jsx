import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { useEffect } from "react";
import { MMKVLoader } from "react-native-mmkv-storage";
import defaultImage from "../../images/aiImage.jpg";
import CheckInternetStatus from "./CheckInternetStatus";

const MMKV = new MMKVLoader().initialize();

const AccountPage = () => {
  const isDarkMode = useColorScheme() === "dark";
  const styles = getStyles(isDarkMode);
  const name = MMKV.getString("name");
  const avatarUri = MMKV.getString("avatarUri");
  // console.log(avatarUri);
  return (
    <View style={[styles.container, styles.backgroundColorOfPage]}>
      {/* <Text style={[styles.whiteText, styles.textColorOfThisPage]}>
        Coming Soon! 😊
      </Text> */}
      <View style={styles.avatarAndNameContainer}>
        <Image
          source={avatarUri ? { uri: avatarUri } : defaultImage}
          style={styles.avatar}
        />
        <Text style={[styles.name, styles.textColorOfThisPage]}>
          Hi, {name}👋
        </Text>
      </View>
      <CheckInternetStatus />
    </View>
  );
};

export default AccountPage;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    backgroundColorOfPage: { backgroundColor: isDarkMode ? "black" : "white" },
    textColorOfThisPage: { color: isDarkMode ? "white" : "black" },
    container: {
      flex: 1,
      padding: 4,
      paddingTop: 20,
      justifyContent: "space-around",
    },
    whiteBg: { backgroundColor: "white" },
    darkBg: { backgroundColor: "black" },
    whiteText: { color: "#f5eedd" },
    darkText: { color: "black" },
    avatar: {
      height: 140,
      width: 140,
      borderRadius: 70,
      resizeMode: "cover",
      marginBottom: 10,
    },
    avatarAndNameContainer: { alignItems: "center" },
    name: { fontSize: 20 },
  });
