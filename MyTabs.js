import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Dashboard from "./Dashboard";
import Photo from "./Photo";
import Icon from "react-native-vector-icons/FontAwesome";

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
        name="Photo"
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
    </Tab.Navigator>
  );
}
