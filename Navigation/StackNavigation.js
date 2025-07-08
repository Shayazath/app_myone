import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Homescreen from '../src/screen/Homescreen'
import Searchscreen from '../src/screen/Searchscreen'
import Profile from '../src/screen/Profilescreen'
import { colors } from '../Utils/colors'
import { NavigationContainer } from '@react-navigation/native'
import Loadscreen from '../src/screen/Loadscreen'
import LoginScreen from '../src/screen/LoginScreen'
import SignUp from '../src/screen/SignUp'
import register from '../src/screen/Rejisterfinalscreen'
import { AuthContext } from '../AuthContext'
import chatscreen from '../src/screen/chatscreen'
import PeopleScreen from '../src/screen/PeopleScreen'
import PdfUpload from '../src/screen/Content/PdfUpload'
import PDFViewer from '../src/screen/PDFViewer'
import Profilepic from '../src/screen/Profilepic'
import Otp from '../src/screen/Otp'
import Useruploads from '../src/screen/Useruploads'
import Rejisterfinalscreen from '../src/screen/Rejisterfinalscreen'


const StackNavigator = () => {

    const Stack = createNativeStackNavigator();
    const tab = createBottomTabNavigator();
    const { token, settoken } = useContext(AuthContext)

    function Bottomtab() {
        return (
            <tab.Navigator >
                <tab.Screen name='Home' component={Homescreen} options={{
                    tabBarActiveTintColor: colors.four,
                    tabBarIcon: ({ focused }) => focused ? (
                        <AntDesign name='profile' size={25} color={colors.four} />
                    ) : (
                        <AntDesign name='profile' size={25} color={colors.black} />
                    )
                }}
                />

                <tab.Screen name='Search' component={Searchscreen} options={{
                    animation: "shift",
                    tabBarActiveTintColor: colors.four,
                    tabBarIcon: ({ focused }) => focused ? (
                        <MaterialCommunityIcons name='file-search' size={25} color={colors.four} />
                    ) : (
                        <MaterialCommunityIcons name='file-search' size={25} color={colors.black} />
                    )
                }}
                />

                <tab.Screen name='Profile' component={Profile} options={{
                    tabBarIcon: ({ focused }) => focused ? (
                        <FontAwesome5 name='user-secret' size={25} color={colors.four} />
                    ) : (
                        <FontAwesome5 name='user-secret' size={25} color={colors.black} />
                    )
                }}
                />

            </tab.Navigator>
        )

    }
    const AuthStack = () => {

        return (
            <Stack.Navigator>

                <Stack.Screen name='Loadscreen' component={Loadscreen} options={{ headerShown: false }} />
                <Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='signup' component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name='register' component={register} options={{ headerShown: false }} />
                <Stack.Screen name='registerfinal' component={Rejisterfinalscreen} options={{ headerShown: false }} />
                <Stack.Screen name='profilepic' component={Profilepic} options={{ headerShown: false }} />
                <Stack.Screen name='otp' component={Otp} options={{ headerShown: false }} />

            </Stack.Navigator>
        )
    }

    function Mainstacks() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Bottomtab} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={chatscreen} options={{ animation: "slide_from_bottom", headerShown: false }} />
                <Stack.Screen name="People" component={PeopleScreen} options={{ headerShown: false, animation: "ios_from_right" }} />
                <Stack.Screen name="UploadPdf" component={PdfUpload} options={{ headerShown: false, animation: "ios_from_right" }} />
                <Stack.Screen name="PDFViewer" component={PDFViewer} options={{ headerShown: false, animation: "ios_from_right" }} />
                <Stack.Screen name="Userupload" component={Useruploads} options={{ headerShown: false, animation: "ios_from_right" }} />
           
           </Stack.Navigator>
        )
    }
    return (
        <NavigationContainer>
            {token === null || token === "" ? <AuthStack /> : <Mainstacks />}
        </NavigationContainer>
    )
}

export default  StackNavigator 

const styles = StyleSheet.create({})