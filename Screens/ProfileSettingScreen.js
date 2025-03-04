import {Text, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import loginStyle from "../Styles/loginStyle";
import React, {useState} from "react";
import { SafeAreaView, Platform, StatusBar } from "react-native";
import axios from "axios";
import {LOCAL_SERVER_URL, ERROR_ALERT, PASSWORD_LENGTH, ERROR_PASSWORD_LENGTH_INVALID} from "../Utils/Constants";

const ProfileSettingScreen = ({route}) => {
   const [newUsername,setNewUsername]= useState("");
   const [newPassword,setNewPassword]= useState("");
   const [newPhone,setNewPhone]= useState("");
   const axiosInstance = axios.create({ baseURL: LOCAL_SERVER_URL });
    const { username,id } = route.params || {};


    const saveNewUsername = async () => {
        if (id) {
            try {
                const res = await axiosInstance.post('/users/change_username', {usernameInput: newUsername,userId:id}, {
                    headers: {"Content-Type": "application/json"}
                });
                console.log("response: " + res.data.message);
                if (res.data.errorCode == 200) {
                    alert(res.data.message)
                }
            } catch (error) {
                console.error("Request error:", error.response?.data || error.message);
                console.log(error.message)
            }
        } else {
            alert(ERROR_ALERT)
        }
        setNewUsername("")
    }

    const saveNewPassword = async () => {
    if (id){
    try {
        if (newPassword.length>=PASSWORD_LENGTH){
        const res = await axiosInstance.post('/users/change_password', {password: newPassword,username,userId:id}, {
            headers: {"Content-Type": "application/json"}
        });
        console.log("response: " + res.data.message);
        if (res.data.errorCode == 200) {
            alert(res.data.message)
        }
        }else {
            alert("")
        }
    } catch (error) {
        console.error("Request error:", error.response?.data || error.message);
        console.log(error.message)
    }
    }else {
        alert(ERROR_ALERT)
    }

    setNewPassword("")
}
    const saveNewPhone = async () => {
       if (id){
        try {
            const res = await axiosInstance.post('/users/change_phone', {phone: newPhone,userId:id}, {
                headers: {"Content-Type": "application/json"}
            });
            console.log("response: " + res.data.message);
            if (res.data.errorCode == 200) {
                alert(res.data.message)
            }
        } catch (error) {
            console.error("Request error:", error.response?.data || error.message);
            console.log(error.message)
        }
       }else {
           alert(ERROR_ALERT)
       }
        setNewPhone("")
    }


    return(
        <View  style={{ flex: 1,alignContent: "center",padding:10 }}>
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
            <Text style={{paddingBottom:20,alignSelf:"center"}}>Profile Settings</Text>
            <View>
                <TextInput
                    placeholder="change username"
                    placeholderTextColor={'black'}
                    value={newUsername}
                    textColor={'black'}
                    onChangeText={(text) => {
                        setNewUsername(text);

                    }}
                />
                <Button onPress={saveNewUsername} disabled={newUsername===""} labelStyle={{ color:'black',fontWeight:'bold', textShadowOffset: {width: -1, height:-1},textShadowRadius: 10}} >
                    Save new username
                </Button>
                <TextInput
                    placeholder="change password"
                    placeholderTextColor={'black'}
                    value={newPassword}
                    textColor={'black'}
                    onChangeText={(text) => {
                        setNewPassword(text);

                    }}
                />
                <Button onPress={saveNewPassword} disable={newPassword==="" || newPassword.length < PASSWORD_LENGTH} labelStyle={{ color:'black',fontWeight:'bold', textShadowOffset: {width: -1, height:-1},textShadowRadius: 10}} >
                    Save new Password
                </Button>
                <TextInput
                    placeholder="change phone"
                    placeholderTextColor={'black'}
                    value={newPhone}
                    textColor={'black'}
                    onChangeText={(text) => {
                        setNewPhone(text);

                    }}
                />

            </View>

            <Button disable={newPhone===""} onPress={saveNewPhone} labelStyle={{ color:'black',fontWeight:'bold', textShadowOffset: {width: -1, height:-1},textShadowRadius: 10}} >
                Save new phone
            </Button>
            </SafeAreaView>
        </View>

    )




}
export default ProfileSettingScreen;
