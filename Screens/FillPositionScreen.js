import React, { useState } from 'react';
import axios from "axios";
import {View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Text, Platform} from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { RAPIDAPI_KEY } from '../Utils/config';
import  positionStyle from '../Styles/positionStyle'

const FillPositionScreen = ({navigation}) => {
    const [userAddress, setUserAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);

/*
נשאר להוסיף לשרת מיקום 
לעשות בקשה שתחזיר תמונה של המקום
*/


    //
    // const handleSearch = async () => {
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': RAPIDAPI_KEY,
    //             'X-RapidAPI-Host':'geocoder4.p.rapidapi.com',
    //         }
    //     };
    //     fetch('https://geocoder4.p.rapidapi.com/search?format=json&q='+userAddress, options)
    //         .then(response => response.json())
    //         .then(response =>console.log(response))
    //         .catch(err => console.log("from genre "+ err));
    // }
    //


    return (
        <View style={positionStyle.container}>
        <View style={positionStyle.inputView}>
         <TextInput
           style={positionStyle.input}
           placeholder="example: Tel Aviv,Dizengoff 5"
            value={userAddress}
            onChangeText={(text) => { setUserAddress(text) }}
        />
  <TouchableOpacity>
    <Text style={positionStyle.searchButton}>search🔎</Text>
  </TouchableOpacity>
</View>

          

            <MapView
                provider={PROVIDER_DEFAULT}
                style={positionStyle.map }
                initialRegion={{
                    latitude: 31.0461,
                    longitude: 34.8516,
                    latitudeDelta: 5,
                    longitudeDelta: 5,
                }}
            >
             

            </MapView>

        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor:"black"
       
//     },
//     map: {
//        width:Dimensions.get('window').width,
//         height:Dimensions.get('window').height - 200,
//     },
//     inputView:{
//     flexDirection: 'row',
//      paddingTop: 100, 
//      justifyContent: 'center',
//     },
//     input: {
//         padding: 10,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         marginBottom: 10,
//         borderWidth:1,
//         borderColor:"black",
//         paddingTop:"50px"

//     },
//     searchButton:{
//         fontSize:20,
//         padding: 10,
//         borderRadius: 10,
//         color:"#007fff",

//     }, 

// });
export default FillPositionScreen;
