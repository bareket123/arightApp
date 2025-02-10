import {Text, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import loginStyle from "../Styles/loginStyle";
import React, {useState} from "react";
import { SafeAreaView, Platform, StatusBar } from "react-native";

const ProfileSettingScreen = ({navigation}) => {
   const [newUsername,setNewUsername]= useState("");
   const [newPassword,setNewPassword]= useState("");
   const [newPhone,setNewPhone]= useState("");


   /*
   מתודה שקוראת לשרת לשינוי
    */

    return(
        <View  style={{ flex: 1,alignContent: "center",padding:10 }}>
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
            <Text style={{paddingBottom:20,alignSelf:"center"}}>Profile Settings</Text>
            <View style={{backgroundColor:"green"}}>
                <Text> change username</Text>
                <TextInput
                    placeholder="change username"
                    placeholderTextColor={'black'}
                    value={newUsername}
                    textColor={'black'}
                    onChangeText={(text) => {
                        setNewUsername(text);

                    }}
                />
                <Text> change password</Text>
                <TextInput
                    placeholder="change passoword"
                    placeholderTextColor={'black'}
                    value={newPassword}
                    textColor={'black'}
                    onChangeText={(text) => {
                        setNewPassword(text);

                    }}
                />
                <Text> change phone</Text>
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

            <Button labelStyle={{ color:'black',fontWeight:'bold', textShadowOffset: {width: -1, height:-1},textShadowRadius: 10}} >
                Save Changes
            </Button>
            </SafeAreaView>
        </View>

    )




}
export default ProfileSettingScreen;
