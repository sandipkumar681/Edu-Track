import { useEffect, useState, Suspense } from "react";
import { View, Text, StyleSheet, useColorScheme, Button } from "react-native";

const TestingPage = () => {
  const isDarkMode = useColorScheme() === "dark";

  const [data, setData] = useState([]);

  const handlePress = () => {
    setData([
      { id: 1, name: "Sandip" },
      { id: 2, name: "Kumar" },
      { id: 3, name: "Behera" },
    ]);
  };

  const makeSlowUIButtton = () => {
    // setTimeout(() => {
    let i = 1;
    let j = 1;
    while (i < 1000) {
      j += i;
      i++;
      console.log(j);
    }
    // }, [3000]);
  };

  useEffect(() => {
    makeSlowUIButtton();
  }, []);

  return (
    <View
      style={[isDarkMode ? styles.darkBg : styles.whiteBg, styles.container]}
    >
      <View>
        {data.map((item) => (
          <Text key={item.id} style={styles.whiteText}>
            {item.name}
          </Text>
        ))}
      </View>
      <Text style={[isDarkMode ? styles.whiteText : styles.darkText]}>
        TestingPage
      </Text>
      <Button onPress={handlePress} title="Set Data" />
      <Suspense>
        <Button onPress={makeSlowUIButtton} title="Make Ui unresponsiable" />
      </Suspense>
    </View>
  );
};

export default TestingPage;

const styles = StyleSheet.create({
  whiteBg: { backgroundColor: "white" },
  darkBg: { backgroundColor: "black" },
  whiteText: { color: "#f5eedd" },
  darkText: { color: "black" },
  container: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
