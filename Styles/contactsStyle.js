import { StyleSheet } from 'react-native';
const contactStyle=StyleSheet.create({

mainView:{
 flexDirection: 'row',
  paddingTop: 100, 
  justifyContent: 'center',
  alignItems:"center"
    
},
 container: { 
    padding: 15, 
  }, 
  tableHeader: { 
    backgroundColor: '#DCDCDC', 

  },
  tableCell:{
      textAlign:'center',
       justifyContent: 'center',
      alignItems: 'center',
  } ,
  searchTextInput:{
        backgroundColor: 'lightblue',
        borderRadius: 10,
        width: 200,
        alignSelf:"center"
     
  }



})
export default contactStyle;