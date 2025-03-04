import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import loginStyle from '../Styles/loginStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_SERVER_URL, PASSWORD_LENGTH } from "../Utils/Constants";
import LoadingScreen from "./LoadingScreen";

export default function Login({ setIsLoggedIn }) {
    const [usernameInput, setUsernameInput] = useState("bareket");
    const [phone, setPhone] = useState("0549638852");
    const [password, setPassword] = useState("111111");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState('login');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [toMinimize, setToMinimize] = useState(false);
    const [showSplash, setShowSplash] = useState(false);


    const checkStoredData = async () => {
        const username = await AsyncStorage.getItem('username');
        const userId = await AsyncStorage.getItem('userId');

        if (username && userId) {
            console.log(`Data exists: Username - ${username}, UserId - ${userId}`);
        } else {
            console.log("No data found");
        }
    };


const handleButtonPressed = () => {
            if (checked==='login')
                setChecked('signUp')
            else {
                setChecked('login')
            }
    }


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
                console.log("data from server: "+res.data);
                await AsyncStorage.setItem('username', usernameInput);
                await AsyncStorage.setItem('userId',  String(res.data.id));
                setIsLoggedIn(true);
                setShowSplash(true);
                   checkStoredData()
                 } catch (error) {
                console.log("Error response:", error.response?.data);

                if (error.response?.data?.error_code === "1000") {
                    alert("Invalid username or password");
                } else if (error.response?.data?.message) {
                    alert(error.response.data.message);
                } else {
                    alert("An error occurred: " + JSON.stringify(error.response?.data));
                }
        }
    }

    }




    return (
        <ImageBackground source={require('../Images/arightapplogin.gif')} resizeMode='contain' style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={loginStyle.containerVideo}>
                <Button mode='contained-tonal' dark={true} textColor={"#1C2D3C"} labelStyle={{ fontWeight: "bold" }}
                        rippleColor={"white"} onPress={() => { setToMinimize(!toMinimize) }}>
                    {toMinimize ? "Close login Window" : "Press To Login"}
                </Button>

                <View style={{ alignItems: "center" }}>
                    {/*{(checked !== '' && toMinimize) &&*/}
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
                                {
                                    checked === 'signUp' &&
                                    <View>
                                        <View style={loginStyle.viewStyle}>
                                            <TextInput
                                                placeholder="Confirm Password"
                                                mode={"outlined"}
                                                textColor={'white'}
                                                backgroundColor={password.length < PASSWORD_LENGTH ? "rgba(128, 0, 128, 0.4)" : "#9CE675"}
                                                placeholderTextColor={'white'}
                                                value={confirmPassword}
                                                onChangeText={setConfirmPassword}
                                                // style={[loginStyle.textInput, ((password !== confirmPassword) && (password.length !== 0&& confirmPassword.length!==0)) && { backgroundColor: '#8B0000'}] }
                                                secureTextEntry={true}
                                            />
                                        </View>
                                        <View style={loginStyle.viewStyle}>
                                            <TextInput
                                                placeholder="Phone"
                                                placeholderTextColor={'white'}
                                                value={phone}
                                                textColor={'white'}
                                                onChangeText={setPhone}
                                                backgroundColor={phone.length === 0 ? "rgba(128, 0, 128, 0.4)" : "#9CE675"}
                                                style={loginStyle.textInput}
                                            />
                                        </View>
                                    </View>
                                }
                                <Button textColor={"darkred"} rippleColor={"white"} style={loginStyle.loginLineButton} onPress={handleAddUser}>
                                    Submit
                                </Button>
                                <View style={{ flexDirection: "row", alignItems: "center"}}>
                                    <TouchableOpacity onPress={handleButtonPressed}>
                                        <Text style={loginStyle.loginLineText}>{checked==='signUp'?'Already have an account ?':"Don't have an account ?"}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>

                </View>
            </View>

        </ImageBackground>
    );
}

