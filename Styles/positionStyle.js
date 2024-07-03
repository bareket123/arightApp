import { StyleSheet,Dimensions } from 'react-native';

const positionStyle = StyleSheet.create({
 
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"black"
       
    },
    inputView:{
    flexDirection: 'row',
     paddingTop: 100, 
     justifyContent: 'center',
    },
     map: {
       width:Dimensions.get('window').width,
        height:Dimensions.get('window').height - 200,
    },
    
    input: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth:1,
        borderColor:"black",
        paddingTop:"50px"

    },
    searchButton:{
        fontSize:20,
        padding: 10,
        borderRadius: 10,
        color:"#007fff",



    }

})
export default positionStyle;