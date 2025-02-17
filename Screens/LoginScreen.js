import axios from 'axios';
import React, { useState } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, ImageBackground } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import loginStyle from '../Styles/loginStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_SERVER_URL, PASSWORD_LENGTH } from "../Utils/Constants";

export default function Login({ setIsLoggedIn }) {
    const [usernameInput, setUsernameInput] = useState("test");
    const [phone, setPhone] = useState("0549638852");
    const [password, setPassword] = useState("111111");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState('login');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [toMinimize, setToMinimize] = useState(false);

    const handleAddUser = async () => {
        console.log("submit pressed")
        const axiosInstance = axios.create({ baseURL: LOCAL_SERVER_URL });

        const data = {
            name: usernameInput,
            password: password,
            phone: phone
        };
        if (checked == 'signUp') {
            try {
                const res = await axiosInstance.post('/users/add_user', data, {
                    headers: { "Content-Type": "application/json" }
                });
                console.log(res.data);
                setChecked('login');
            } catch (error) {
                console.error("Request error:", error.response?.data || error.message);
            }
        } else {
            try {
                const res = await axiosInstance.post('/users/login', data, {
                    headers: { "Content-Type": "application/json" }
                });
                console.log(res.data);
                await AsyncStorage.setItem('username', usernameInput);
                setIsLoggedIn(true);  // ✅ Trigger re-render in App.js
            } catch (error) {
                console.log("Request error:", error.response?.data || error.message + " " + error.error_code);
                if (error.error_code == "1000"){
                    alert("Invalid username or password");
                    console.log("wwwww")

                }
                if (error.response){
                    alert("Something went wrong " + error.response.data);
                    console.log("ddddd")
                }

                console.log("out side")
            }
        }
    };

    return (
        <ImageBackground source={require('../Images/arightapplogin.gif')} resizeMode='contain' style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={loginStyle.containerVideo}>
                <Button mode='contained-tonal' dark={true} textColor={"#1C2D3C"} labelStyle={{ fontWeight: "bold" }}
                        rippleColor={"white"} onPress={() => { setToMinimize(!toMinimize) }}>
                    {toMinimize ? "Close login Window" : "Press To Login"}
                </Button>

                <View style={{ alignItems: "center" }}>
                    {(checked !== '' && toMinimize) &&
                        <View>
                            <View style={loginStyle.fuzzyFrame}>
                                <Image source={{ uri: 'https://www.ready.gov/sites/default/files/styles/large/public/2021-06/amber-alert-mobile-phone.png?itok=whBVFTyf' }}
                                       style={{ width: 100, height: 100, borderRadius: 50 }} />
                                <Text style={loginStyle.headerText}>
                                    Enter your {checked === 'login' ? 'username and password' : 'details to sign up'}
                                </Text>
                                <View style={loginStyle.viewStyle}>
                                    <TextInput
                                        placeholder="Username"
                                        placeholderTextColor={'white'}
                                        value={usernameInput}
                                        textColor={'white'}
                                        onChangeText={setUsernameInput}
                                        backgroundColor={usernameInput.length === 0 ? "rgba(128, 0, 128, 0.4)" : "#9CE675"}
                                        style={loginStyle.textInput}
                                    />
                                </View>
                                <View style={loginStyle.viewStyle}>
                                    <TextInput
                                        placeholder="Password"
                                        value={password}
                                        mode={"outlined"}
                                        backgroundColor={password.length < PASSWORD_LENGTH ? "rgba(128, 0, 128, 0.4)" : "#9CE675"}
                                        placeholderTextColor={'white'}
                                        onChangeText={setPassword}
                                        textColor={'white'}
                                        style={[loginStyle.textInput, checked === 'login' && { marginBottom: 20 }]}
                                        secureTextEntry={!isPasswordVisible}
                                    />
                                </View>

                                <Button textColor={"darkred"} rippleColor={"white"}
                                        style={loginStyle.loginLineButton}
                                        onPress={handleAddUser}>
                                    Submit
                                </Button>
                            </View>
                        </View>
                    }
                </View>
            </View>
        </ImageBackground>
    );
}
