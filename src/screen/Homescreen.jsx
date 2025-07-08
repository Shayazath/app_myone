import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { colors } from '../../Utils/colors'
import { fonts } from '../../Utils/fonts'
import FollowersRandomPost from './Content/FollowersRandomPost'

const Homescreen = () => {
    const navigation = useNavigation()
    const handlelogout = () => {
        navigation.replace('AuthStack', { screen :'login'})
    }

    const handlechat = () => {
        navigation.navigate('Chat')
    }
    const handleUpload = () => {
        navigation.navigate('UploadPdf')
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "MENU",
            headerStyle: {
                backgroundColor: colors.black2gray,
                shadowColor: colors.black,
                shadowOpacity: 0.5,
                shadowRadius: 16,
                elevation: 5,
                borderBottomWidth: 2,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTintColor: colors.black2gray,
            headerBackTitle: "Back",
            headerLeft: () => (
                <View style={{ marginLeft: 16 }}>
                    <AntDesign name="menufold" size={24} color={colors.black2gray} />
                </View>
            ),
            headerRight: () => (
                <View style={{ marginRight: 10, flexDirection: "row" }}>
                    <TouchableOpacity>
                        <Ionicons name="add-circle-sharp" style={{ marginRight: 16, }} size={26} color={colors.four} onPress={handleUpload}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <MaterialCommunityIcons style={{ marginRight: 16, }} name="bell-ring-outline" size={24} color={colors.black2gray} />
                     </TouchableOpacity>
                     <TouchableOpacity onPress={handlechat}>
                    <MaterialCommunityIcons   style={{ marginRight: 0, }} name="wechat" size={26} color={colors.black2gray} />
                    <Image></Image>
                    </TouchableOpacity>
                    
                </View>
            )

        })
    }, [])
    
    return (
        <View style={{height:"100%",width:"100%",paddingVertical:0}}>
        <FollowersRandomPost/>
        </View>
    )
}

export default Homescreen

const styles = StyleSheet.create({})