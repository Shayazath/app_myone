import { Alert, Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import { fonts } from '../../Utils/fonts'
import { AuthContext } from '../../AuthContext'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Config from '../../Config'

export default function Otp({route}) {

  const {email,username,password}=route.params

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const navigation = useNavigation()
  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    console.log(newOtp)
    setOtp(newOtp);
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
   
  };
  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  const handleback = ()=>{
    navigation.navigate('signup')
  }
  const handlecheck =  async() => {
    const response = await axios.post(`${Config.Base_Url}/otpverify`,{email:email,otp:otp.join('')})
      
      
      console.log(response)
      if(response.status === 200){
        navigation.navigate('profilepic',{email: email,username:username,password:password})
      }else{
        Alert.alert('Incorrect OTP')
      }
    
    
  }

  return (
    <View style={styles.conatainer}>
      <ImageBackground source={require("../assets/bg.png")} style={styles.bgconatainer}>
        <TouchableOpacity onPress={handleback} >
          <MaterialIcons name={"arrow-back-ios-new"} color={colors.black}
            size={30} style={styles.iconcontainer} />
        </TouchableOpacity>
        <View style={styles.holacontainer}>
          <Text style={styles.textconatainer}>Hola back &#128512;  </Text>
          <View style={styles.viewcontainer}>
            <Text style={styles.text2conatainer}>  Enter your</Text>
            <Text style={[styles.text2conatainer, { color: colors.four, fontSize: 40 }]}>  OTP</Text>
            <View>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(el) => (inputs.current[index] = el)}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={styles.otpInput}
                  />
                ))}
              </View>
              <TouchableOpacity onPress={handlecheck}>
                <View style={{ elevation: 2, height: 50, borderRadius: 100, width: 150, backgroundColor: "black", margin: 10, marginLeft: 63, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontFamily: fonts.bold, color: colors.primary, fontSize: 28 }}>CHECK</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

        </View>


      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    height: "100%",
    width: "100%",

  },

  bgconatainer: {
    height: "100%",
    width: "100%",

  },
  iconcontainer:
  {
    marginTop: 20,

  },
  holacontainer: {

    height: "90%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

  },
  viewcontainer: {
    backgroundColor: colors.secondary,
    flexDirection: "column",
    height: "50%",
    width: "90%",
    padding: 40,
    borderRadius: 50,
    marginBottom: 50,
    alignItems: "center",
  },
  loconatainer: {
    height: 270,
    width: 300,
    alignItems: "center",
    justifyContent: "center",

  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 80,
    width: 280,
    borderRadius: 60,
    borderWidth: 2,
  },
  otpInput: {
    height: 60,
    width: 50,
    borderRadius: 100,
    backgroundColor: colors.three,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 32,
    paddingBottom:2,
  },
  textconatainer: {
    fontFamily: fonts.gothalic,
    color: "#00000",
    fontSize: 40,
    marginBottom: 20,
  },
  emailcontainer: {

    backgroundColor: colors.secondary,
    borderColor: colors.three,
    width: 50,
    marginLeft: -20,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
    elevation: 10,

  },
  emailtxtcontainer: {

    fontFamily: fonts.bold,
    fontStyle: "bold",
    width: "100%",
    fontSize: 18,
    paddingTop: 5,

  },
  text2conatainer: {
    fontFamily: fonts.bold,
    color: "black",
    marginTop: -20,
    marginBottom: 20,
    fontSize: 30,
    marginRight: 30,

  },
  Logconatainer: {

    marginHorizontal: 110,
    borderRadius: 30,
    justifyContent: "center",
    padding: 1,
    paddingTop: 6,
    fontFamily: fonts.bold,
    color: "#00000",
    fontSize: 20,
    elevation: 50,


  },
  forgotPasswordText: {
    textAlign: "right",
    fontFamily: fonts.sfsemibold,
    marginTop: -1,
    width: 310,

    marginBottom: 10,
  },
})