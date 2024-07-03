import { StyleSheet } from 'react-native';

const HomeStyle=StyleSheet.create({

    userWelcomeText:{
        color:"#D03632",
        fontWeight:"bold",
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20
    },
    mainView:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    header:{
     color:"#D03632",
      alignItems: 'center',
     fontWeight:"bold",
        paddingBottom:20,
    },
    imageStyle:{
        width:100,
        height:100,
        borderRadius:50,
        borderWidth:10,
        borderColor:"#782624",

    },
    navigateText:{
      paddingTop:10,
      fontWeight:"bold",
      color:"#922724",
      textShadowColor: 'pink',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 0.5,
    },
    touchNavigate:{
       margin:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    video:{
        width: 200,
        height: 200,
        resizeMode:"stretch"
    }

})

export default HomeStyle;
