import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import { fonts } from '../../Utils/fonts'
import { AuthContext } from '../../AuthContext'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Config from '../../Config'
import { response } from 'express'
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const { token, settoken } = useContext(AuthContext)
    const navigation = useNavigation();
    const [error, seterror] = useState(false)
    const [paserror, setpaserror] = useState(false)
    const handleback = () => {
        navigation.navigate("Loadscreen");
    }
    useEffect(() => {
        if (token) {
            navigation.replace('Mainstacks', { screen: 'Main' })
        }

    }, [token, navigation])



    const handleLogin = async () => {
        
        console.log(email, password)
        const user = {
            email: email,
            password: password

        };
        if (email.length === 0 || password.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: 'Please fill in all fields',
            });
            return;
        }

        axios.post(`${Config.Base_Url}/login`, user).then(response => {


            if (response.status === 200) {
                seterror(false)
            }

            const token = response.data.token
            const username = response.data.username
            const userId = response.data.userId
            const email = response.data.email

            console.log(token)
            console.log(username)
            console.log(userId)
            Toast.show({
                type: 'success',
                text1: 'Login Successfully',
                text2: `Welcome ${response.data.username}`,
            });
            
            AsyncStorage.setItem("authToken", token)
            AsyncStorage.setItem("username", username)
            AsyncStorage.setItem("userId", userId)
            AsyncStorage.setItem('email', email)
            settoken(token)

        }
        ).catch(err => {
            if (err.response) {
                if (err.response.status === 401) {
                    seterror(true)
                    Toast.show({
                        type: 'error',
                        text1: 'Login Failed',
                        text2: 'Invalid username or password',
                    });
                } else if (err.response.status === 402) {
                    setpaserror(true)
                    Toast.show({
                        type: 'error',
                        text1: 'Login Failed',
                        text2: 'Invalid username or password',
                    });
                } else if (err.response.status === 500) {
                    Alert.alert('Server error. Please try again later.');
                } else {
                    Alert.alert('An unexpected error occurred.');
                }
            } else {
                console.error('Login Error:', err);
                Alert.alert('Network error. Please check your connection.');
            }
        });


    }
    return (
        <View style={styles.conatainer}>
            <ImageBackground source={require("../assets/bg.png")} style={styles.bgconatainer}>
                <TouchableOpacity onPress={handleback}>
                    <MaterialIcons name={"arrow-back-ios-new"} color={colors.black}
                        size={30} style={styles.iconcontainer} />
                </TouchableOpacity>
                <View style={styles.holacontainer}>
                    <Text style={styles.textconatainer}>Hola back &#128512;  </Text>
                    <View style={styles.viewcontainer}>
                        <Text style={styles.text2conatainer}>Sign up  </Text>
                        {error === false ?
                            <View style={[styles.emailcontainer1]}>
                                <TextInput style={styles.emailtxtcontainer} value={email} onChangeText={(text => {setemail(text); seterror(false)})} 
                                    placeholder='Email' placeholderTextColor={colors.black} keyboardType="email-address"  />

                            </View> : <View style={[styles.emailcontainer2]}>
                                <TextInput style={styles.emailtxtcontainer} value={email} onChangeText={(text => {setemail(text); seterror(false)})}
                                    placeholder='Email' placeholderTextColor={colors.black} keyboardType="email-address" />

                            </View>
                        }
                        {error !== false && <Text style={{ color: "red" }}>Invalid email</Text>}
                        {paserror === false ? <View style={[styles.emailcontainer1]}>
                            <TextInput style={styles.emailtxtcontainer} value={password} onChangeText={(text => {setPassword(text),setpaserror(false)})}
                                placeholder='******'  placeholderTextColor={colors.black}  secureTextEntry={true} />
                        </View> : <View style={[styles.emailcontainer2]}>
                            <TextInput style={styles.emailtxtcontainer} value={password} onChangeText={(text => {setPassword(text),setpaserror(false)})}
                                placeholder='******' placeholderTextColor={colors.black} secureTextEntry={true} />          
                        </View>
                        }
                        {paserror !== false && <Text style={{ color: "red" }}>Invalid Password</Text>}
                       
                        <TouchableOpacity>
                            <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
                        </TouchableOpacity>

                        <View style={[styles.emailcontainer1, { backgroundColor: colors.three }]}>
                            <TouchableOpacity onPress={handleLogin} >
                                <Text style={styles.Logconatainer}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


            </ImageBackground>
        </View>



    )
}

export default LoginScreen

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
        height: "60%",
        width: "90%",
        padding: 40,
        borderRadius: 50,
        marginBottom: 50,
        flexDirection: "column",
        display: "flex",
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
    emailcontainer1: {

        backgroundColor: colors.secondary,
        width: 330,
        marginLeft: -20,
        borderRadius: 100,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        marginVertical: 10,
        elevation: 10,

    },
    emailcontainer2: {

        backgroundColor: colors.secondary,
        borderColor: 'red',
        width: 330,
        marginLeft: -20,
        borderRadius: 100,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        marginVertical: 10,
        elevation: 10,
        borderWidth: 0.5,
        


    },
    emailtxtcontainer: {

        fontFamily: fonts.bold,
        fontStyle: "bold",
        width: "100%",
        fontSize: 18,
        paddingTop: 5,
        color: 'black',
        opacity: 10


    },

    text2conatainer: {
        fontFamily: fonts.bold,
        color: "black",
        marginTop: -20,
        marginBottom: 20,
        fontSize: 40,

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
    /* hiconatainer : {
         fontWeight : "bold",
         color : "#00000",
         fontSize : 20,
        
     }*/

})