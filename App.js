import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./Screens/StackNav";
import LoginPage from "./Screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");


    useEffect(() => {
        const checkLoginStatus = async () => {
            const username_parameter = await AsyncStorage.getItem("username");
            setUsername(username_parameter)
            setIsLoggedIn(!!username);
        };
        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem("username");
        setIsLoggedIn(false);
    };

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {isLoggedIn ? (
                    <StackNav username={username} onLogout={handleLogout} />
                ) : (
                    <LoginPage setIsLoggedIn={setIsLoggedIn} />
                )}
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
