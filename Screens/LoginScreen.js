import React, {useState} from 'react';
import { ScrollView, Text, View, Image, StyleSheet,ImageBackground} from 'react-native';
import {Button,  TextInput} from 'react-native-paper';
import  loginStyle from '../Styles/loginStyle'
import  homeStyle from '../Styles/HomeStyle'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



/*
נשאר לבנות שרת לצורך שמירת המשתמשים
* */


export default function Login () {
    const [usernameInput, setUsernameInput] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState('login');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    //const [hasStartedFillingFields, setHasStartedFillingFields] = useState(false);
     const [toMinimize, setToMinimize] = useState(false);


  const handleUpdateUser = async () => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usernameInput, password,phone }),
    });

    if (response.ok) {
      const result = await response.json();
      setMessage(result.message);
    } else {
      const error = await response.json();
      setMessage(error.error || 'Error updating user');
    }
  };


   const loginButton = () => {
     if (checked==='login')
         setChecked('signUp')
     else {
         setChecked('login')
     }
   }


    async function handleSubmitPressed() {
        let res;
        try {
         handleUpdateUser
        } catch (error) {

        }
        clearButton()
    }




    function checkValidation(){
        let validToPress=true;
        if ((usernameInput.length===0|| usernameInput==='')||(password.length===0 ||password==='' )){
            validToPress=false;
        }
        if ((checked==='signUp' )&&(password !== confirmPassword)||(password.length <12))
        {
            validToPress=false;
        }
        return validToPress;
    }

    function clearButton() {
        setUsernameInput("")
        setPassword("")
        setConfirmPassword("")
        setPhone("")
       
    }

function checkEmptyString(str){
 return str.length===0;
 
}


    return ( 
         <ImageBackground source={require('../Images/arightapplogin.gif')} resizeMode='contain'  style={{flex:1,justifyContent:"flex-end"}}>

            <View style={loginStyle.containerVideo}>
                <Button mode='contained-tonal' dark={true} textColor={"#1C2D3C"} labelStyle={{fontWeight:"bold"}} rippleColor={"white"} onPress={()=>{setToMinimize(!toMinimize)}}>{toMinimize?"Close login Window":"Press To Login"}</Button>

                    <View style={{alignItems:"center"}}>
                        {
                           (checked!==''&& toMinimize) &&
                            <View>
                                <View style={loginStyle.fuzzyFrame}>
                                    <Image source={{uri:'https://www.ready.gov/sites/default/files/styles/large/public/2021-06/amber-alert-mobile-phone.png?itok=whBVFTyf'}} style={{width:100,height:100,borderRadius:50}}/>
                                    <Text style={loginStyle.headerText}>Enter your {checked==='login' ? 'username and password' : 'details to sign up'}</Text>
                                    <View style={loginStyle.viewStyle}>
                                        <TextInput
                                            placeholder="Username"
                                            placeholderTextColor={'white'}
                                            value={usernameInput}
                                           
                                            textColor={'white'}
                                    
                                            //underlineStyle={loginStyle.underlineStyle}
                                            onChangeText={(text) => {
                                                setUsernameInput(text);
                                        
                                            }}
                                            
                                            backgroundColor={checkEmptyString(usernameInput)?"rgba(128, 0, 128, 0.4)":"#9CE675"}
                                            style={loginStyle.textInput}
                                        />
                                    </View>
                                    <View style={loginStyle.viewStyle}>
                                        <TextInput
                                            placeholder="Password"
                                            value={password}
                                            mode={"outlined"}
                                             backgroundColor={checkEmptyString(password)?"rgba(128, 0, 128, 0.4)":"#9CE675"}
                                            placeholderTextColor={'white'}
                                           // underlineStyle={loginStyle.underlineStyle}
                                            onChangeText={(text) => {
                                                setPassword(text);
                                               
                                            }}
                                            textColor={'white'}
                                            style={[loginStyle.textInput, checked==='login'&& {marginBottom: 20}]}
                                            secureTextEntry={!isPasswordVisible&&true}
                                        />
                                    </View>

                                    <View style={{flexDirection:'column'}}>
                                        {
                                            checked === 'signUp' &&
                                            <View>
                                                <View style={loginStyle.viewStyle}>
                                                    <TextInput
                                                        placeholder="Confirm Password"
                                                        mode={"outlined"}
                                                        backgroundColor={checkEmptyString(confirmPassword)?"rgba(128, 0, 128, 0.4)":"#9CE675"}
                                                        textColor={'white'}
                                                        placeholderTextColor={'white'}
                                                        //underlineStyle={loginStyle.underlineStyle}
                                                        value={confirmPassword}
                                                        onChangeText={(text) => {
                                                            setConfirmPassword(text);
                                                         
                                                        }}
                                                        style={[loginStyle.textInput, ((password !== confirmPassword) && (password.length !== 0&& confirmPassword.length!==0)) && { backgroundColor: '#8B0000'}] }
                                                        secureTextEntry={true}
                                                    />
                                                </View>
                                                <View style={loginStyle.viewStyle}>
                                                    <TextInput
                                                        placeholder="Phone number"
                                                        mode={"outlined"}                                            
                                                         backgroundColor={checkEmptyString(phone)?"rgba(128, 0, 128, 0.4)":"#9CE675"}
                                                        textColor={'white'}
                                                        placeholderTextColor={'white'}
                                                        //underlineStyle={loginStyle.underlineStyle}
                                                        value={phone}
                                                        onChangeText={(text) => {
                                                            setPhone(text);
                                                            
                                                        }}
                                                        style={[loginStyle.textInput, ((password !== confirmPassword) && (password.length !== 0&& confirmPassword.length!==0)) && { backgroundColor: '#8B0000'}] }
                                                        type="numeric"
                                                    />
                                                </View>
                                            </View>
                                        }
                                        <Button textColor={"darkred"} rippleColor={"white"}  style={loginStyle.loginLineButton} onPress={handleSubmitPressed}>Submit</Button>
                                        <View style={{ flexDirection: "row",  flexWrap: 'wrap', justifyContent: 'center',alignItems: "center"}}>
                                            <Text style={loginStyle.loginLineText}>{checked==='signUp'?'Already have an account ?':"Don't have an account ?"}</Text>
                                            <Button textColor={"white"} rippleColor={"white"} icon="account-edit" 
                                            labelStyle={{ fontWeight:'bold',textShadowColor: 'rgba(0, 0,0, 0.9)', textShadowOffset: {width: -1, height:-1},textShadowRadius: 10}}  style={loginStyle.loginLineButton} onPress={loginButton}>{checked==='signUp'?'Login':'Sign Up'}</Button>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row'}}>

                                    </View>
                                </View>
                            </View>
                        }

                    </View>
           
         
            </View>
</ImageBackground>



    );
};

