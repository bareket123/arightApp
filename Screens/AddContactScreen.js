import React, { useState, useEffect } from 'react';
import { View, Text,ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';
import contactStyle from '../Styles/contactsStyle';
import { DataTable, TextInput } from 'react-native-paper';
import axios from "axios";
import {LOCAL_SERVER_URL} from "../Utils/Constants";
import LoadingScreen from "./LoadingScreen";



export default function AddContactsScreen({route}) {
  const [userContacts, setUserContacts] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [searchContact, setSearchContact] = useState("");
  const [filterArray,setFilterArray]=useState([]);
  const [addedContacts, setAddedContacts] = useState([]);

  const axiosInstance = axios.create({baseURL: LOCAL_SERVER_URL});


  const { username } = route.params || {};

  useEffect(() => {
  getPremition();
  if (hasPermission){
     fetchContacts();
  }

  }, [hasPermission]);

  useEffect(() => {
     getContacts()
    console.log(addedContacts)
  }, [username]);

  const getContacts = async () => {

    try {
      const res = await axiosInstance.get('/contacts/get_contacts', {
        params: { username: username }
      });

      console.log(res.data);
      const addedContactsMap = res.data.contacts.reduce((acc, contact) => {
        acc[contact.name] = true;
        return acc;
      }, {});
      setAddedContacts(addedContactsMap);

    } catch (error) {
      console.error("Request error:", error.response?.data || error.message);
      alert(error.message);
    }
  };



  const getPremition= async()=>{
   const { status } = await Contacts.requestPermissionsAsync();
      setHasPermission(status === 'granted');

  }

  const formatPhoneNumber = (phoneNumber) => {
    let correctFormat="";
    if (!phoneNumber) return "no number";
    if (phoneNumber.includes("-")){
       correctFormat=phoneNumber.replaceAll("-","")
    }


    if (phoneNumber.startsWith("+972")) {
      correctFormat= "0" + phoneNumber.slice(4); // מחזיר ל-05X
    }

    // console.log("correct format: "+ correctFormat)

    return correctFormat;
  };


  const fetchContacts = async () => {
    if (hasPermission) {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        setUserContacts(data);
      }
    }
  };
  const filterContactsArray = () => {
    if (Array.isArray(userContacts) && userContacts.length > 0 && typeof searchContact === 'string' && searchContact.length > 0) {
      const filtered = userContacts
          .filter((contact) =>
              contact?.name &&
              (contact.name.includes(searchContact) || contact.name.toLowerCase().startsWith(searchContact.toLowerCase()))
          )
          // Ensure case-insensitive sorting

      for (let i = 0; i < filtered.length; i++) {
        console.log(i+" - " +filtered[i])
      }
    } else {
      setFilterArray([]);
    }
  };


  const addContact = async (contactName, contactPhone) => {
    if (!addedContacts[contactName]){
    if (username){
    const dataToSend = {
      username: username,
      name: contactName,
      phone: contactPhone
    }
    try {
      const res = await axiosInstance.post('/contacts/add_contact', dataToSend, {
        headers: {"Content-Type": "application/json"}
      });
      console.log("response: "+res.data.message);
      if (res.data.errorCode==200) {
        alert("added")
        setAddedContacts(prev => ({
          ...prev,
          [contactName]: true
        }));
        }
    } catch (error) {
      console.error("Request error:", error.response?.data || error.message);
      console.log(error.message)
    }
    }
    }else
     deleteContact(contactName,contactPhone)
  }

  const deleteContact = async (name,phone,) => {
    try {
      const res = await axiosInstance.post('/contacts/delete_contact', {name,phone,username}, {
        headers: {"Content-Type": "application/json"}
      });
      console.log("response: " + res.data.message);
      if (res.data.errorCode == 200) {
        alert(res.data.message)
        setAddedContacts(prev => ({
          ...prev,
          [name]: false
        }));
      }

    } catch (error) {
      console.error("Request error:", error.response?.data || error.message);
      console.log(error.message)
    }
  }

  return (

        userContacts?
            <View style={contactStyle.mainView}>
          {userContacts.length > 0 ? (
                  <ScrollView>
                    <TextInput
                        placeholder='search contact'
                        mode='outlined'
                        outlineColor='white'
                        placeholderTextColor={'black'}
                        style={contactStyle.searchTextInput}
                        value={searchContact}
                        onChangeText={(text) => {
                          setSearchContact(text);
                          filterContactsArray()

                        }}/>

                    <DataTable style={contactStyle.container}>
                      <DataTable.Header style={contactStyle.tableHeader}>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Phone Number</DataTable.Title>
                        <DataTable.Title>Add to List</DataTable.Title>
                      </DataTable.Header>
                      { userContacts.length>0&&(
                          (searchContact == "" ? userContacts : filterArray).map((current, index) => (
                              <DataTable.Row key={index}>
                                <DataTable.Cell style={contactStyle.tableCell}>{current.name}</DataTable.Cell>
                                {current.phoneNumbers && current.phoneNumbers.length > 0 ? (
                                    current.phoneNumbers.map((phone, phoneIndex) => (
                                        <DataTable.Cell style={contactStyle.tableCell} key={`${index}-${phoneIndex}`}>
                                          {phone.number ? formatPhoneNumber(phone.number) : "no number"}
                                        </DataTable.Cell>
                                    ))
                                ) : (
                                    <DataTable.Cell style={contactStyle.tableCell} key={`${index}-no-number`}>no number</DataTable.Cell>
                                )}
                                <DataTable.Cell  style={contactStyle.tableCell}  onPress={() => addContact(current.name,formatPhoneNumber(current.phoneNumbers[0]?.number))}>
                                  {addedContacts[current.name] ? "Delete 🗑️" : "Add"}
                                </DataTable.Cell>
                              </DataTable.Row>)

                          ))}
                    </DataTable>
                  </ScrollView>
              ):
              <Text>
                no contacts!!
              </Text>
          }
        </View>
            :
            <LoadingScreen/>


  );
}
