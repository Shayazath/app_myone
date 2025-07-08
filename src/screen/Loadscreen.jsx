import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../Utils/colors'
import { fonts } from '../../Utils/fonts'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const navigation = useNavigation();
  const handlelogin = () => {
    navigation.navigate("login");
  }
  const handlesignup = () => {
    navigation.navigate("signup");
  }
   
  
  return (
    <View>
        <ImageBackground source={require("../assets/bg.png")} style={styles.conatainer}>
       
        <Image source={require("../assets/lo.png")}/>

        <Text style={styles.textconatainer}> YOUR MATERIALS ON YOUR WAY </Text>

        <View style={styles.buttoncontainer}>
          
          <TouchableOpacity style=
          {[styles.buttonwrapper ,{ backgroundColor : colors.primary ,borderWidth : .1,}]}
          onPress={handlelogin}>
            <Text style={styles.buttontext}>LOGIN</Text>
            
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonwrapper]} onPress={handlesignup}>
          <Text style={styles.logintext}>SIGN-UP</Text>
          </TouchableOpacity>

        </View>
        </ImageBackground>
    </View>
    


  )
}

export default LoginScreen

const styles = StyleSheet.create({

    conatainer:{
        flex : "2",
        height: "100%",
        width: "100%",
        alignItems : "center",
        justifyContent : "center",
    },
    textconatainer:{
        textAlign : "center",
        fontFamily : fonts.semibold,
        color : "#00000",
        marginVertical: 30,
        fontSize : 20,
        fontStyle : fonts.semibold,
    },
    buttoncontainer:{
      flexDirection : "row",
      borderWidth : 2,
      width : "55%",
      height : "8%",
      borderRadius : 100,

    },
    buttonwrapper:
    {
     
      justifyContent : "center",
      alignItems : "center",
      height : "100%",
      width : "50%",
      borderRadius : 100,

    },
    buttontext : {
      alignItems : "center",
      justifyContent : "center",
      color : "00000",
      fontSize : 17,
      fontFamily : fonts.bold,
    },
    logintext :
    {
      alignItems : "center",
      color : colors.primary,
      justifyContent : "center",
      fontFamily : fonts.bold,
      fontSize : 17,
    }
   
})