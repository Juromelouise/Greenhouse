import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Dashboard from "./Dashboard";
import Photo from "./Photo";
import Icon from "react-native-vector-icons/FontAwesome";
import Setting from "./Setting";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="dashboard"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Plant Identification"
        component={Photo}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="photo"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="edit"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
