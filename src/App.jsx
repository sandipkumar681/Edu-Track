import WelcomePage from "./components/stackPages/WelcomePage";
import UserDetailsInput from "./components/stackPages/UserDetailsInput";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { MMKVLoader } from "react-native-mmkv-storage";
import { StatusBar, StyleSheet, Text, useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ExamStack from "./components/bottomStackPage/ExamStack";
import LoadingScreen from "./components/etc/LoadingPage";
import LongPressedContextProvider from "./context/LongPressedContext";
import AccountStack from "./components/bottomStackPage/AccountStack";

const MMKV = new MMKVLoader().initialize();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const isDarkMode = useColorScheme() === "dark";

  const styles = getStyles(isDarkMode);

  return (
    <Tab.Navigator
      initialRouteName="Exam"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#077a7d",
        tabBarInactiveTintColor: "#a6a9a2",
        tabBarStyle: {
          height: 80,
          paddingHorizontal: 10,
          backgroundColor: isDarkMode ? "black" : "white",
        },
        tabBarLabelStyle: {
          fontSize: 14,
          textAlign: "center",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Exam"
        component={ExamStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="book-open-page-variant" size={36} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account" size={36} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isUserDetailsAvalable, setIsUserDetailsAvalable] = useState(null);

  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    const getNameAndAvatarUri = async () => {
      if (await MMKV.getStringAsync("name")) {
        setIsUserDetailsAvalable(true);
      } else setIsUserDetailsAvalable(false);
    };
    getNameAndAvatarUri();
  }, []);

  if (isUserDetailsAvalable === null) {
    return <LoadingScreen />;
  }

  return (
    <LongPressedContextProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            !isUserDetailsAvalable ? "User Details" : "Edutrack"
          }
        >
          <Stack.Screen
            name="User Details"
            component={UserDetailsInput}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Edutrack"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LongPressedContextProvider>
  );
};

export default App;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    lightBg: { backgroundColor: "white" },
    darkBg: { backgroundColor: "black" },
    lightText: { color: "white" },
    darkText: { color: "black" },
  });
