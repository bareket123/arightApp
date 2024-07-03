import React, { useState, useEffect } from 'react';
import { View, Text, Button,ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';
import contactStyle from '../Styles/contactsStyle';
import { DataTable, TextInput } from 'react-native-paper';



export default function AddContactsScreen() {
  const [userContacts, setUserContacts] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [searchContact, setSearchContact] = useState("");
  const [filterArray,setFilterArray]=useState([]);
 
  useEffect(() => {
  getPremition();
  if (hasPermission){
     fetchContacts();
  }
 
  }, [hasPermission]);


  const getPremition= async()=>{
   const { status } = await Contacts.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      
  }

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
    setFilterArray(
      userContacts.filter((contact) => 
        contact && contact.name && 
        (contact.name.includes(searchContact) || contact.name.toLowerCase().startsWith(searchContact.toLowerCase()))
      )
    );
  } else {
    // Handle cases where userContacts is not an array or searchContact is not a valid string
    setFilterArray([]);
  }
};


  return (
    <View style={contactStyle.mainView}>
     {userContacts.length > 0 && (
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
                {phone.number ? phone.number : "no number"}
              </DataTable.Cell> 
            ))
          ) : (
            <DataTable.Cell style={contactStyle.tableCell} key={`${index}-no-number`}>no number</DataTable.Cell>
          )}
          <DataTable.Cell style={contactStyle.tableCell} onPress={() => alert("added")}>
            Add
          </DataTable.Cell>
        </DataTable.Row>)
     
      ))}
    </DataTable>
  </ScrollView>
)}

        
      
    </View>
  );
}
