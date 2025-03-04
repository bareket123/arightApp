import React, { useState, useEffect } from 'react';
import { View, Button, Alert,Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import positionStyle from "../Styles/positionStyle";

const MapPicker = () => {
     const [region, setRegion] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    // const [address, setAddress] = useState(null);
    //
    // useEffect(() => {
    //     (async () => {
    //         //return a user's Permission
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             Alert.alert('Permission denied', 'Allow location access to use this feature.');
    //             return;
    //         }
    //
    //         //return an object with coordination
    //         let location = await Location.getCurrentPositionAsync({});
    //         setRegion({
    //             latitude: location.coords.latitude, //w
    //             longitude: location.coords.longitude,// h
    //             latitudeDelta: 0.01,
    //             longitudeDelta: 0.01,
    //         });
    //
    //         // get address
    //         let reverseGeocode = await Location.reverseGeocodeAsync({
    //             latitude: location.coords.latitude,
    //             longitude: location.coords.longitude,
    //         });
    //
    //         if (reverseGeocode.length > 0) {
    //             const { city, street, streetNumber, region, country } = reverseGeocode[0];
    //             setAddress(`${street} ${streetNumber}, ${city}, ${region}, ${country}`);
    //         }
    //     })();
    // }, []);
    //
    const handleMapPress = (event) => {
        setSelectedLocation(event.nativeEvent.coordinate);
    };

    return (
        <View style={{ flex: 1,margin:"300px" }}>
            <MapView
                style={{ flex: 1 }}
                onPress={handleMapPress}
                showsUserLocation
            >
                {
                    selectedLocation &&
                    <Marker coordinate={selectedLocation} title="Selected Location" />}
            </MapView>
            {/*<Button title="Use My Location" onPress={()=>{getUserLocation()}} />*/}
            <View>
                {region && (
                    <Text>Latitude: {region.latitude}, Longitude: {region.longitude}</Text>
                )}

            </View>
        </View>
    );
};

export default MapPicker;
