import HomePage from "./HomeScreen";
import LoginPage from "./LoginScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import ProfileSettingScreen from "./ProfileSettingScreen";
import FillPositionScreen from "./FillPositionScreen";
import AddContactScreen from "./AddContactScreen";
// import ProfileSettingScreen from "./ProfileSettingScreen";
// import FillPositionScreen from "./FillPositionScreen";
// import AddContactScreen from "./AddContactScreen";

const Tab = createMaterialBottomTabNavigator();

const StackNav = () => {
    return (
       <Tab.Navigator
            initialRouteName="Home"
            activeColor="white"
            theme={{ colors: { onSurface: 'white', onSurfaceVariant: 'lightblue',fontsize:14 }}}

            barStyle={{ backgroundColor: 'rgba(165, 0, 0, 0.5)',color:"white"}}

        >
            <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" color={"darkred"}  size={26} />
                    ),
                    tabBarLabelStyle: {
                        color: 'darkred', // Change label color here
                    },
                }}
            />
            <Tab.Screen
                name="Login"
                component={LoginPage}
                options={{
                    tabBarLabel: 'Login',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="login" color={"#FF007F"} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name='Setting'
                component={ProfileSettingScreen}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="tools" color={"grey"} size={26} />
                    ),
                }}/>
            <Tab.Screen
                name="My Position"
                component={FillPositionScreen}
                options={{
                    tabBarLabel: 'My Position',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="google-maps" color={"green"} size={26} />
                    ),
                }}
                />
             <Tab.Screen
                name="Add Contacts"
                component={AddContactScreen}
                options={{
                    tabBarLabel: 'Add Contacts',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="contacts" color={"#00acdf"} size={26} />
                    ),
                }}
            />


        </Tab.Navigator>


    );
};

export default StackNav;
