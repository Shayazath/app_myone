import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../Utils/colors'
import { fonts } from '../../Utils/fonts'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Router } from 'express';
import Config from '../../Config';
const PDFItem = React.memo(({ item, navigation }) => (
    <View style={styles.pdfContainer}>
        <View style={styles.userInfo}>
            <Image style={styles.profilePic} source={{ uri: item.profilepic }} />
            <Text style={styles.username}>{item.username}</Text>
        </View>
        <TouchableOpacity
            style={styles.previewContainer}
            onPress={() => navigation.navigate('PDFViewer', { pdfUrl: item.data, isLocal: true, pdfName: item.namefile })}>


            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.fileInfo}>
                <Text style={styles.fileName}>{item.filename}</Text>
                <Text style={styles.fileSize}>📄 {item.filesize} • PDF</Text>
            </View>
        </TouchableOpacity>

    </View>
));
const Useruploads = ({ route }) => {
    const navigation = useNavigation();
    const username = route.params
    const [profilepic, setProfilepic] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const storedPic = await AsyncStorage.getItem('profilepic');
            const storedName = await AsyncStorage.getItem('username');
            setProfilepic(storedPic || profile_pic); // Default to profile_pic if null
            setName(storedName || 'No Username');
        };

        fetchUserData();
    }, []);
    console.log(username)
    const query = username;
    const [filteredPDFs, setFilteredPDFs] = useState([]);
    const profile_pic = "https://lh3.googleusercontent.com/a/ACg8ocKRU7A6nkIx2XAlb-tIkeNX4We2D2mg_ejwuSe2tOXpavDA8Rg=s360-c-no"
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fetchFilteredPDFs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${Config.Base_Url}/searchuploads`, { params: { username: username } });

            setFilteredPDFs(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching PDFs');
            setLoading(false);
            console.error(err)
        }
    };
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.length > 1) {
                fetchFilteredPDFs();
            } else {
                setFilteredPDFs([]);
            }
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [query]);
    return (
        <View style={styles.container}>

            <View style={styles.profile}>
                <Image style={{
                    borderRadius: 100,
                    height: 60,
                    width: 60,
                    marginLeft: 5,
                }} source={{ uri: profilepic }} />
                <Text style={{ fontSize: 30, fontFamily: fonts.bold, color: "black", margin: 6, marginLeft: 80 }}>{name}</Text>
            </View>
            <View style={{justifyContent:"center",alignItems:'center'}}>
            <View style={{height : 40 , width : 130 ,marginTop:10,borderRadius : 100 , backgroundColor: "black"}}>
                <Text style={{ fontSize: 20, fontFamily: fonts.bold, color: "white", margin: 10, marginLeft: 20, marginTop: 5 }}>UPLOADS</Text>
            </View>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color={colors.four} style={styles.loader} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <FlatList
                    data={filteredPDFs}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <PDFItem
                            item={item}
                            navigation={navigation}
                        />
                    )}
                />
            )}

        </View>
    )
}
export default Useruploads
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        paddingVertical: 10,
        backgroundColor: "#F8F9FA",
        flexDirection: "column",
        padding: 10
    },
    head: {
        height: 50,
        backgroundColor: "#7D7D7D",
        alignItems: "center",
        justifyContent: "center",
    },
    profile: {
        height: 80,
        width: "100%",
        borderRadius: 50,
        overflow: "hidden",
        backgroundColor: colors.three,
        flexDirection: "row",
        padding: 10,
        marginTop: 10,
        flexDirection: "row"
    }, loader: {
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
    },
    pdfContainer: {
        backgroundColor: colors.three,
        padding: 10,
        marginVertical: 10,
        borderRadius: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        height: 35,
        width: 35,
        borderRadius: 50,
    },
    username: {
        marginLeft: 10,
        fontSize: 17,
        fontFamily: fonts.semibold,
    },
    previewContainer: {
        flexDirection: 'row',
        backgroundColor: '#025159',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    thumbnail: {
        width: 100,
        height: 70,
        borderRadius: 5,
    },
    fileInfo: {
        marginLeft: 10,
    },
    fileName: {
        width : 200,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    fileSize: {
        fontSize: 14,
        color: '#bbb',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        marginLeft: 5,
        fontSize: 17,
    },
})