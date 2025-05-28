import WelcomePage from "./pages/stackPages/WelcomePage";
import UserDetailsInput from "./pages/stackPages/UserDetailsInput";
// import TestingPage from "./pages/TestingPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExamPage from "./pages/bottomStackPage/ExamPage";
import { useEffect, useState } from "react";
import { MMKVLoader } from "react-native-mmkv-storage";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountPage from "./pages/bottomStackPage/AccountPage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MMKV = new MMKVLoader().initialize();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    initialRouteName="Exam"
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: "#077a7d",
      tabBarInactiveTintColor: "#a6a9a2",
      // tabBarShowLabel: false,
      tabBarStyle: {
        height: 80,
        paddingHorizontal: 10,
        backgroundColor: "#051b25",
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // elevation: 5,
        // shadowColor: "#000",
        // shadowOpacity: 0.1,
        // shadowOffset: { width: 0, height: -2 },
        // shadowRadius: 5,
      },
      // tabBarItemStyle: {
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alignItems: "center",
      // },
      // tabBarIconStyle: {
      //   justifyContent: "center",
      //   alignItems: "center",
      // },
      tabBarLabelStyle: {
        fontSize: 14,
        textAlign: "center",
      },
      headerShown: false,
    })}
  >
    <Tab.Screen
      name="Exam"
      component={ExamPage}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="book-open-page-variant" size={36} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountPage}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="account" size={36} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  const [isUserDetailsAvalable, setIsUserDetailsAvalable] = useState(null);
  useEffect(() => {
    const getNameAndAvatarUri = async () => {
      if (await MMKV.getStringAsync("name")) {
        setIsUserDetailsAvalable(true);
      } else setIsUserDetailsAvalable(false);
    };
    getNameAndAvatarUri();
  }, []);

  if (isUserDetailsAvalable === null) {
    return <Text>Loading</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={!isUserDetailsAvalable ? "User Details" : "Edutrack"}
      >
        <Stack.Screen
          name="User Details"
          component={UserDetailsInput}
          options={{
            // title: "Let us know you",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{
            // title: "Welcome To Our App",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Edutrack"
          component={BottomTabs}
          options={{
            headerTitleStyle: {
              fontWeight: "700",
              fontSize: 25,
              color: "#f5eedd",
            },
            headerStyle: {
              backgroundColor: "#051b25",
              // elevation: 0, // Android
              // shadowOpacity: 0, // iOS
              // borderBottomWidth: 0,
            },
          }}
        />
        {/* <Stack.Screen
          name="Exams"
          component={EduTrack}
          options={{
            title: "Header",
            headerStyle: {
              backgroundColor: "yellow",
            },
            headerTintColor: "green",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            // headerShown: false,
            headerTransparent: true,
            headerTitleAlign: "center",
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
    // </>
  );
};

export default App;
