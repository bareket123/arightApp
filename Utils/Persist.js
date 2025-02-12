import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchUsername = async () => {
    let username="";
    try {
        username= await AsyncStorage.getItem("username");
    } catch (error) {
        console.error("Failed to load username", error);
    }
    return username
};

export default  fetchUsername();
