import React, {useEffect, useState} from 'react';
import axios from "axios";
import {View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Text, Platform, Alert} from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { RAPIDAPI_KEY } from '../Utils/config';
import  positionStyle from '../Styles/positionStyle'
import  * as Location from "expo-location"
import {Button} from "react-native-paper";
import MapPicker from "./MapPicker";
import {LOCAL_SERVER_URL} from "../Utils/Constants";

const FillPositionScreen = ({route}) => {
    const [region, setRegion] = useState(null);
    const [savedLocations, setSavedLocations] = useState([]);
    const [address, setAddress] = useState(null);
    const [currentLatitude, setCurrentLatitude] = useState(null);
    const [currentLongitude, setCurrentLongitude] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const { id } = route.params || {};
    const axiosInstance = axios.create({ baseURL: LOCAL_SERVER_URL });



    useEffect(() => {
        (async () => {
            //return a user's Permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Allow location access to use this feature.');
                return;
            }

            //return an object with coordination
            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude, //w
                longitude: location.coords.longitude,// h
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            setCurrentLatitude(location.coords.latitude)
            setCurrentLongitude(location.coords.longitude)
            // get address
            let reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (reverseGeocode.length > 0) {
                const { city, street, streetNumber, region, country } = reverseGeocode[0];
                setAddress(`${street} ${streetNumber}, ${city}, ${region}, ${country}`);
            }
        })();
    }, []);

    useEffect(()=>{
        getUserLocations().then()
    },[refresh])



    const addPosition = async () => {
        if (address){
            try {
               const dataToSend={
                 address,
                 latitude:currentLatitude,
                 longitude:currentLongitude,
                 userId:id
                }
                console.log(dataToSend)
                const res = await axiosInstance.post('/location/add_user_location', dataToSend, {
                    headers: {"Content-Type": "application/json"}
                });
                if (res.data.errorCode=='200'){
                    alert("Add successfully")
                    setRefresh(prev => !prev);
                }else {
                    alert(res.data.message)
                }
                console.log(res.data);
             } catch (error) {
                console.error("Request error:", error.response?.data || error.message);
            }
        }

    }
const getUserLocations = async () => {
     try{
    const res = await axiosInstance.get('location/get_user_location', {
        params:{userId:id}
    })
    if (res.data.errorCode == '200') {
        setSavedLocations(res.data.user_location)
    } else {
        alert(res.data.message)
    }

} catch (error) {
        console.error("Request error:", error.response?.data || error.message);
    }
}

const deleteLocation = async (currentLocation) => {
    try {
        const res = await axiosInstance.post('/location/delete_location', {locationId:currentLocation.id}, {
            headers: { "Content-Type": "application/json" }
        });
        alert(res.data.message)
        setRefresh(prev => !prev);
    } catch (error) {
        console.error("Request error:", error.response?.data || error.message);
    }
}


    return (
         <View style={positionStyle.container}>
             {
                 savedLocations.length>0?
                     <View>
                         <Text>saved places: </Text>
                         {
                             savedLocations.map((currentLocation,index)=>{
                                return(
                                    <TouchableOpacity onPress={()=>deleteLocation(currentLocation)} >
                                    <Text>{currentLocation.address}</Text>
                                    </TouchableOpacity>
                                )
                             })
                         }
                     </View>
                     :
                     address && (
                     <>
                         <Button onPress={()=>addPosition()}> ➕ Add another Location</Button>
                         <Text style={positionStyle.addressText}> Current Location: {address}</Text>
                         <Button disable={!!address} onPress={()=>addPosition()}>Save new Location</Button>
                     </>





             )}

         </View>
    )
};

export default FillPositionScreen;
