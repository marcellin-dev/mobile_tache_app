import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import Todo from "../screens/Todos";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getData } from "../Util";
import DisplayWalk from "../screens/DisplayWalk";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const [numberTask, setNumberTask] = useState(0);

  async function getDatas() {
    let todos = await getData("todos");

    setNumberTask(todos.length);
  }
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else {
              iconName = focused ? "list" : "list";
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="todo"
          component={Todo}
          options={{ tabBarBadge: numberTask }}
        />
        <Tab.Screen name="Pas" component={DisplayWalk} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
