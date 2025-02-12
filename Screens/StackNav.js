import React from "react";
import HomePage from "./HomeScreen";
import ProfileSettingScreen from "./ProfileSettingScreen";
import FillPositionScreen from "./FillPositionScreen";
import AddContactScreen from "./AddContactScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { TouchableOpacity } from "react-native";

const StackNav = ({ onLogout }) => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="white"
            theme={{ colors: { onSurface: "white", onSurfaceVariant: "lightblue", fontsize: 14 } }}
            barStyle={{ backgroundColor: "rgba(165, 0, 0, 0.5)", color: "white" }}
        >
            <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: () => <MaterialCommunityIcons name="home" color="darkred" size={26} />,
                }}
            />
            <Tab.Screen
                name="Setting"
                component={ProfileSettingScreen}
                options={{
                    tabBarLabel: "Setting",
                    tabBarIcon: () => <MaterialCommunityIcons name="tools" color="grey" size={26} />,
                }}
            />
            <Tab.Screen
                name="My Position"
                component={FillPositionScreen}
                options={{
                    tabBarLabel: "My Position",
                    tabBarIcon: () => <MaterialCommunityIcons name="google-maps" color="green" size={26} />,
                }}
            />
            <Tab.Screen
                name="Add Contacts"
                component={AddContactScreen}
                options={{
                    tabBarLabel: "Add Contacts",
                    tabBarIcon: () => <MaterialCommunityIcons name="contacts" color="#00acdf" size={26} />,
                }}
            />

            {/* Custom Logout Button */}
            <Tab.Screen
                name="Logout"
                component={HomePage} // Dummy component
                options={{
                    tabBarLabel: "Logout",
                    tabBarIcon: () => (
                        <TouchableOpacity onPress={onLogout}>
                            <MaterialCommunityIcons name="logout" color="red" size={26} />
                        </TouchableOpacity>
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault(); // Prevent tab from navigating
                        onLogout();
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default StackNav;
