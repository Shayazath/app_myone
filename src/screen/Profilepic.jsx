import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../Utils/colors'
import { fonts } from '../../Utils/fonts'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from "react-native-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Config from '../../Config'

const Profilepic = ({ route }) => {
  const { email, username, password } = route.params
  console.log(email, username, password)
  const navigation = useNavigation();


  const [profile_pic, setprofile_pic] = useState('https://lh3.googleusercontent.com/a/ACg8ocKRU7A6nkIx2XAlb-tIkeNX4We2D2mg_ejwuSe2tOXpavDA8Rg=s360-c-no')
  const [base64Image, setBase64Image] = useState("")

  const UploadPic = async () => {
    let result = await ImagePicker.launchImageLibrary({ mediaType: "photo", includeBase64: true },);
    console.log("uri", result.assets[0].uri)
    const uri = result.assets[0].uri


    if (result) {
      setprofile_pic(result.assets[0].uri)
      await AsyncStorage.setItem('profilepic', uri)
    }
    else if (!result) {
      setprofile_pic(profile_pic)
    }
    else {
      Alert.alert("User cancelled image selection");
    }

  }

  const Upload = async () => {
    const formdata = new FormData()
    await AsyncStorage.setItem('profilepic', profile_pic)
    console.log("profilepic", profile_pic)

    formdata.append('profile_pic', {
      uri: profile_pic,
      name: 'profile_pic.jpg',
      type: 'image/jpeg',
    });
    formdata.append('email', email);
    formdata.append('name', username);
    formdata.append('password', password);

    axios.post(`${Config.Base_Url}/register`,formdata,{
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(response => {
      console.log(response)
      Alert.alert('register success')
      if (response) {
        navigation.navigate('registerfinal')
      }
      else {
        Alert.alert('Error in registering')
      }
    }).catch(error => {
      console.log(error)
      Alert.alert('Regitration error')
    })

  }
  return (
    <View>
      <ImageBackground source={require("../assets/bg.png")} style={styles.conatainer}>

        <Text style={styles.textconatainer}>Upload PIC</Text>
        <TouchableOpacity onPress={UploadPic}>

          <Image style={{
            borderRadius: 100,
            height: 200,
            width: 200
          }} source={{ uri: profile_pic }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttoncontainer} onPress={Upload}>
          <Text style={styles.buttontext}>Upload</Text>
        </TouchableOpacity>


      </ImageBackground>
    </View>
  )
}

export default Profilepic

const styles = StyleSheet.create({
  conatainer: {
    flex: "2",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textconatainer: {
    textAlign: "center",
    fontFamily: fonts.semibold,
    color: "#00000",
    marginVertical: 30,
    fontSize: 20,
    fontStyle: fonts.semibold,
  },
  buttoncontainer: {
    borderWidth: 2,
    width: "55%",
    height: "5%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.three,
    margin: 5,
    elevation: 10


  },
  buttonwrapper:
  {

    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "50%",
    borderRadius: 100,

  },
  buttontext: {
    alignItems: "center",
    justifyContent: "center",
    color: "00000",
    fontSize: 17,
    fontFamily: fonts.bold,
  },
  logintext:
  {
    alignItems: "center",
    color: colors.primary,
    justifyContent: "center",
    fontFamily: fonts.bold,
    fontSize: 17,
  }
})