import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigator from './Navigation/StackNavigation'
import { AuthContext, AuthProvider } from './AuthContext'
import 'react-native-get-random-values'
import Toast from 'react-native-toast-message';




const App = () => {
  return (
    <AuthProvider>
      <StackNavigator/>
      <Toast position="bottom" visibilityTime={3000} autoHide={true}   />
    </AuthProvider>
   
  )
}


export default App

const styles = StyleSheet.create({})