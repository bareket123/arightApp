import React, {useEffect, useState} from 'react';
import { View,Text,Image, TouchableOpacity,ImageBackground,SafeAreaView } from 'react-native';
import homeStyle from "../Styles/HomeStyle";
import { Video} from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";




const HomeScreen = ({navigation}) => {
    const [username,setUsername]=useState("guest");

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                let name = await AsyncStorage.getItem("username");
                setUsername(name ? name : "guest");
            } catch (error) {
                console.error("Failed to load username", error);
            }
        };

        fetchUsername();
    }, [username]);



    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={require('../Images/homeBackground.jpg')} style={homeStyle.background}>
           <Text style={homeStyle.userWelcomeText}>HELLO {username}</Text>
            <View style={homeStyle.mainView}>
                <Text style={homeStyle.header}>What Would You Like To Do ?</Text>
                <View style={{flexDirection: 'row'}}>

                    <TouchableOpacity onPress={()=>{ navigation.navigate("My Position")}} style={homeStyle.touchNavigate}>
                        <Image source={require('../Images/mapsIcon.gif')} style={homeStyle.imageStyle}
                        />
                        <Text  style={homeStyle.navigateText}>Define your position </Text>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>{ navigation.navigate("Add Contacts")}} style={homeStyle.touchNavigate}>
                        <Image source={require('../Images/contactIcon.gif')} style={homeStyle.imageStyle}
                        />
                        <Text style={homeStyle.navigateText}>Add Contacts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{ navigation.navigate("Setting")}} style={homeStyle.touchNavigate}>
                        <Image source={require("../Images/settingIcon.gif")} style={homeStyle.imageStyle}
                        />
                        <Text style={homeStyle.navigateText}>Profile Setting</Text>
                    </TouchableOpacity>

                </View>
                <View >
                    {/*<Video*/}
                    {/*    ref={require("../Video/a opening video.mp4")}*/}
                    {/*    style={{width:200,height:200}}*/}
                    {/*    useNativeControls*/}
                    {/*    isLooping*/}
                    {/*/>*/}

                </View>





            </View>
        </ImageBackground>
        </SafeAreaView>
    );
}



export default HomeScreen;
