import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./Screens/StackNav";
import LoginPage from "./Screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoadingScreen from "./Screens/LoadingScreen";


export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [userID, setUserID] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        const checkLoginStatus = async () => {
            const username_parameter = await AsyncStorage.getItem("username");
            const userId_parameter = await AsyncStorage.getItem("userId");
            console.log("COOKIES: username is "+username_parameter)
            console.log("COOKIES: id is "+userId_parameter)

            setUsername(username_parameter)
            setUserID(userId_parameter)
        };
        checkLoginStatus();
    });

    useEffect(() => {
        console.log("Updated Username: ", username);
        setIsLoggedIn(!!username);
    });


    const handleLogin = () => {

        setTimeout(() => {
            setIsLoading(false);
            setIsLoggedIn(true);
        }, 2000);
        setIsLoading(true);
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("username");
        setIsLoggedIn(false);
        console.log("inside the logout function")
    };

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {isLoading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <StackNav id={userID} username={username} onLogout={handleLogout} />
                ) : (
                    <LoginPage setIsLoggedIn={handleLogin} />
                )}
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
