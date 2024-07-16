import {Animated, StyleSheet} from 'react-native';
import { shadow } from 'react-native-paper';
const glowValue = new Animated.Value(0);

const loginStyle = StyleSheet.create({

    container: {
        flex: 1,
    },

    viewStyle:{
        
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:100,
        
       
    },

    textInput:{
        width:300,
        paddingBottom:5,
        borderRadius:100,
        backgroundColor:'transparent',
        
              
        
    },

    warningText:{
        color:'#8B0000',
    },

    headerText: {
        alignSelf: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop:10,
        color: "white",
        textShadowColor: 'rgba(0, 0,0, 0.7)',
        textShadowOffset: {width: -1, height:-1},
        textShadowRadius: 10,
        fontWeight:'bold',
        shadowColor:'red'
    },

    background: {
        width: '100%',
        height: '100%',
        alignItems:"center"
    },

    button:{
        marginTop:50,
        marginBottom: 10,
        alignItems:'center',
        backgroundColor: 'rgb(0,0,0,0.8)',
        borderRadius:50,
        marginLeft:5,
    },

    fuzzyFrame: {
        marginTop:40,
        marginLeft:20,
        marginRight:20,
        marginBottom:20,
        paddingTop:20,
        paddingRight:20,
        paddingLeft:20,
        paddingBottom:40,
        alignItems:'center',
        backgroundColor: 'rgba(128, 0, 128, 0.1)',
        borderRadius:50,
        shadowColor: 'darkred', // Glowing effect color
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 15, // Android shadow elevation
    },


    underlineStyle:{
        backgroundColor:'white',
        height:2
    },

    buttonLabel:{
        color:'white',
        fontSize:21,
        fontWeight: 'bold'
    },

    glow:{
        backgroundColor: glowValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['rgba(0, 0, 128, 0.7)', 'rgba(0, 0, 128, 0.9)', 'rgba(0, 0, 128, 0.7)'],
        }),
    },

    radioButtonLabel:{
        color: 'white',
        fontWeight: 'bold',
        fontSize:20
    },

    radioButton:{
        shadowColor:'white',
        flexDirection:'row'
    },

    imageLogo:{
        height: 120,
        width: 120
    },

    warningView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },

    addImageIcon:{
        marginRight:5,
        marginBottom:20
    },
    loginLineButton:{
        textColor:"white",
        fontWeight:"bold",
        fontSize:16,
        paddingTop:20,
        textShadowColor: 'rgba(0, 0,0, 0.7)',
        textShadowOffset: {width: -1, height:-1},
        textShadowRadius: 10,
    },
    loginLineText:{
        fontWeight:"bold",
        fontSize:16,
        paddingTop:20,
        color:"white",
        textShadowColor: 'rgba(0, 0,0, 0.7)',
        textShadowOffset: {width: -1, height:-1},
        textShadowRadius: 10,


    },
    containerVideo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentVideo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton:{
        color:"darkred"
    },
  


});



export default loginStyle;
