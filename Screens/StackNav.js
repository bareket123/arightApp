import React from "react";
import HomePage from "./HomeScreen";
import ProfileSettingScreen from "./ProfileSettingScreen";
import FillPositionScreen from "./FillPositionScreen";
import AddContactScreen from "./AddContactScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { TouchableOpacity } from "react-native";
import {useNavigation} from "@react-navigation/native";
import LoadingScreen from "./LoadingScreen";
// import SendSmsScreen from "./SendSmsScreen";

const StackNav = ({ onLogout,username,id }) => {
    const Tab = createMaterialBottomTabNavigator();
    const navigation=useNavigation();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            initialParams={{ username}}
            activeColor="white"
            theme={{ colors: { onSurface: "white", onSurfaceVariant: "lightblue", fontsize: 14 } }}
            barStyle={{ backgroundColor: "rgba(165, 0, 0, 0.5)", color: "white" }}
        >
            <Tab.Screen
                name="Home"
                component={HomePage}
                initialParams={{ username,id}}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: () => <MaterialCommunityIcons name="home" color="darkred" size={26} />,
                }}
            />
            <Tab.Screen
                name="Setting"
                component={ProfileSettingScreen}
                initialParams={{ username,id }}
                options={{
                    tabBarLabel: "Setting",
                    tabBarIcon: () => <MaterialCommunityIcons name="tools" color="grey" size={26} />,
                }}
            />
            <Tab.Screen
                name="My Position"
                component={FillPositionScreen}
                initialParams={{ id }}
                options={{
                    tabBarLabel: "My Position",
                    tabBarIcon: () => <MaterialCommunityIcons name="google-maps" color="green" size={26} />,
                }}
            />
            <Tab.Screen
                name="Add Contacts"
                component={AddContactScreen}
                initialParams={{ username }}
                options={{
                    tabBarLabel: "Add Contacts",
                    tabBarIcon: () => <MaterialCommunityIcons name="contacts" color="#00acdf" size={26} />,
                }}
            />

            <Tab.Screen
                name="Logout"
                component={HomePage} // Dummy component
                options={{
                    tabBarLabel: "Logout",
                    tabBarIcon: () => <MaterialCommunityIcons name="logout" color="red" size={26} />,
                }}
                listeners={({ navigation }) => ({
                    tabPress: async (e) => {
                        await onLogout();
                        e.preventDefault(); // מונע מעבר למסך התנתקות
                        navigation.replace("Home"); // מחליף את המסך לבית בצורה חלקה
                    },
                })}
            />
            {/*<Tab.Screen*/}
            {/*    name="test"*/}
            {/*    component={LoadingScreen} // Dummy component*/}
            {/*    options={{*/}
            {/*        tabBarLabel: "test",*/}
            {/*        tabBarIcon: () => <MaterialCommunityIcons name="logout" color="red" size={26} />,*/}
            {/*    }}*/}
            {/*    listeners={({ navigation }) => ({*/}
            {/*        tabPress: async (e) => {*/}
            {/*            await onLogout();*/}
            {/*            e.preventDefault(); // מונע מעבר למסך התנתקות*/}
            {/*            navigation.replace("Home"); // מחליף את המסך לבית בצורה חלקה*/}
            {/*        },*/}
            {/*    })}*/}
            {/*/>*/}

            {/*<Tab.Screen*/}
            {/*    name="testSMS"*/}
            {/*    component={SendSmsScreen} // Dummy component*/}
            {/*    options={{*/}
            {/*        tabBarLabel: "testSMS",*/}
            {/*        tabBarIcon: () => <MaterialCommunityIcons name="message" color="red" size={26} />,*/}
            {/*    }}*/}
            {/*/>*/}

        </Tab.Navigator>
    );
};

export default StackNav;
