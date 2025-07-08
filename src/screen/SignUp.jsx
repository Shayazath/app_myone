import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import { fonts } from '../../Utils/fonts'
import { getRegistrationProgress, saveRegistrationProgress } from '../../rejistrationUtils'
import axios, { Axios } from 'axios'
import Profilepic from './Profilepic'
import Profilescreen from './Profilescreen'
import { eventNames } from '../../api/models/File'
import Config from '../../Config'

const SignUp = () => {
  const [email, setemail] = useState("")
  const [name, setUsername] = useState("")
  const [Password, setPassword] = useState("")
  const navigation = useNavigation();
  



  const handleback = () => {
    navigation.navigate("Loadscreen");
  }
  const profilepic = async () => {
    if (email && name && Password) {
      console.log(email)
      axios.post(`${Config.Base_Url}/otp`,{email : email}).then((response) => {
        console.log(response)
      })
      navigation.navigate('otp',{email: email, password: Password , username : name})

    }
    else {
      Alert.alert('Please fill the required fields')
    }

    if (email.trim() !== '') {
      saveRegistrationProgress('signup', { email, name })
    }
    
      setemail('')
      setUsername('')
      setPassword('')

  }
  useEffect(() => {

    getRegistrationProgress('signup').then(progressData => {
      if (progressData) {
        setemail(progressData.email || "")
        setUsername(progressData.name || "")
      }
    })

  }, [])

 



  return (
    <View style={styles.conatainer}>
      <ImageBackground source={require("../assets/bg.png")} style={styles.bgconatainer}>

        <TouchableOpacity onPress={handleback}>
          <MaterialIcons name={"arrow-back-ios-new"} color={colors.black}
            size={30} style={styles.iconcontainer} />
        </TouchableOpacity>

        <View style={styles.holacontainer}>

          <Text style={styles.textconatainer}>   Welcome &#128512;  </Text>

          <View style={styles.viewcontainer}>

            <Text style={styles.text2conatainer}>Sign in  </Text>

            <View style={[styles.emailcontainer, { borderWidth: 1, }]}>
              <TextInput onChangeText={(text => setemail(text))} value={email} style={styles.emailtxtcontainer}
                placeholder='Email' autoFocus={true} placeholderTextColor={"black"}
                keyboardType="email-address" />
            </View>

            <View style={[styles.emailcontainer, { borderWidth: 1, }]}>
              <TextInput style={styles.emailtxtcontainer}
                placeholder='Username' placeholderTextColor={"black"} keyboardType="default"
                onChangeText={(text => setUsername(text))} value={name} />
            </View>


            <View style={[styles.emailcontainer, { borderWidth: 1, }]}>
              <TextInput style={styles.emailtxtcontainer}
                placeholder='******' placeholderTextColor={"black"} secureTextEntry={true}
                onChangeText={(text => setPassword(text))} value={Password} />
            </View>

            <View style={[styles.emailcontainer, { backgroundColor: colors.three, }]}>
              <TouchableOpacity onPress={profilepic}>
                <Text style={styles.Logconatainer}>Create an account</Text>

              </TouchableOpacity>
            </View>

          </View>
        </View>


      </ImageBackground>
    </View>


  )
}

export default SignUp

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

    marginLeft: -150,

    height: "60%",
    width: "50%",
    padding: 25,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    borderRadius: 50,
    marginBottom: 50,
  },
  loconatainer: {
    height: 270,
    width: 300,
    alignItems: "center",
    justifyContent: "center",

  },
  textconatainer: {
    fontFamily: fonts.gothalic,
    color: "#00000",
    fontSize: 40,
    marginBottom: 20,
  },
  emailcontainer: {

    backgroundColor: colors.primary,
    borderColor: colors.black,
    width: 400,
    marginLeft: -20,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
    elevation: 20,

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
    marginBottom: 5,
    fontSize: 40,

  },
  Logconatainer: {
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
    marginTop: -8,
    width: 310,
    marginBottom: 10,
  },

})