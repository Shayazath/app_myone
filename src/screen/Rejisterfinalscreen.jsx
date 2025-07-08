import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import Loadscreen from '../screen/Loadscreen'
import { useNavigation } from '@react-navigation/native';
const Rejisterfinalscreen = () => {

  const navigation = useNavigation()
  const {token,settoken} = useContext(AuthContext)
      const [userData, setUserData] = useState("")
      useEffect(() => {
        getAllScreendata()
      }, [])
      const getAllScreendata = async () => {
        try {
          const screen = ['signup', 'login', 'Loadscreen']
        } catch (err) {
          console.log("error",err)
        }
      }
  const handlelog = () => {
    navigation.navigate('login')
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 80 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
          }}>
          All set to register
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
            marginTop: 10,
          }}>
          Setting up your profile for you
        </Text>
        <Image source={require("../assets/lo.png")} />
      </View>

      <TouchableOpacity onPress={handlelog}

        style={{ backgroundColor: '#8569d3', padding: 15, marginTop: 'auto', }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Finish Registering
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Rejisterfinalscreen

const styles = StyleSheet.create({})