import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Homescreen from '../src/screen/Homescreen'
import searchscreen from '../src/screen/searchscreen'
import Profile from '../src/screen/Profilescreen'
import { colors } from '../Utils/colors'
import { NavigationContainer } from '@react-navigation/native'
import Post from './Content/Post'
const mainscreen = () => {
    const tab = createBottomTabNavigator();
    let data = [
        {
            id: 1,
            UserName: "Shayaz",
            PostImage: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
            ProfileImage: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            Likes: [
                "kadhanayagan"
            ],
            Comments: [
                {
                    id: 2,
                    UserName: "Shayaz",
                    Comment: "Nice post",
                    Time: "12:30 PM",
                },
                {
                    id: 3,
                    UserName: "Kadhanayagan",
                    Comment: "Nice post",
                    Time: "12:30 PM",
                }]
        },
        {
            id: 1,
            UserName: "Shayaz",
            PostImage: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
            ProfileImage: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            Likes: [
                "kadhanayagan"
            ],
            Comments: [
                {
                    id: 2,
                    UserName: "Shayaz",
                    Comment: "Nice post",
                    Time: "12:30 PM",
                },
                {
                    id: 3,
                    UserName: "Kadhanayagan",
                    Comment: "Nice post",
                    Time: "12:30 PM",
                }]
        },
        {
            id: 1,
            UserName: "Shayaz",
            PostImage: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
            ProfileImage: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            Likes: [
                "kadhanayagan"
            ],
            Comments: [
                {
                    id: 2,
                    UserName: "Shayaz",
                    Comment: "Nice post",
                    Time: "12:30 PM",
                },
                {
                    id: 3,
                    UserName: "Kadhanayagan",
                    Comment: "Nice post",
                    Time: "12:30 PM",
                }]
        }
    ]
    console.log(data[0].UserName)
    return (
        <tab.Navigator >
            <tab.Screen name='Home' component={Homescreen} options={{
                tabBarActiveTintColor: colors.secondary,
                tabBarIcon: ({ focused }) => focused ? (
                    <AntDesign name='profile' size={25} color={colors.secondary} />
                ) : (
                    <AntDesign name='profile' size={25} color={colors.black} />
                )
            }}
            />

            <tab.Screen name='Search' component={searchscreen} options={{
                tabBarActiveTintColor: colors.secondary,
                tabBarIcon: ({ focused }) => focused ? (
                    <MaterialCommunityIcons name='home-outline' size={25} color={colors.secondary} />
                ) : (
                    <MaterialCommunityIcons name='home-outline' size={25} color={colors.black} />
                )
            }}
            />

            <tab.Screen name='Profile' component={Profile} options={{
                tabBarActiveTintColor: colors.secondary,
                tabBarIcon: ({ focused }) => focused ? (
                    <FontAwesome5 name='user-secret' size={25} color={colors.secondary} />
                ) : (
                    <FontAwesome5 name='user-secret' size={25} color={colors.black} />
                )
            }}
            />

        </tab.Navigator >

    )
}

export default mainscreen

const styles = StyleSheet.create({})