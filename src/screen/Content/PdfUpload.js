import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { colors } from '../../../Utils/colors'
import { fonts } from '../../../Utils/fonts'
import DocumentPicker from 'react-native-document-picker'
import axios, { Axios } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Pdf from 'react-native-pdf'
import { PermissionsAndroid } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ViewShot from 'react-native-view-shot'
import { useNavigation } from '@react-navigation/native'
import Config from '../../../Config'
import Toast from 'react-native-toast-message'






const PdfUpload = () => {



    const [profilepic, setprofilepic] = useState('')
    const [selectedFile, setSelectedFile] = useState('');
    const [fileUri, setfileUri] = useState('');
    const [filename, setfilename] = useState('');
    const [filesize, setfilesize] = useState('');
    const [pdfThumbnail, setPdfThumbnail] = useState('');
    const [filetype, setfiletype] = useState('');
    const userId = AsyncStorage.getItem('userId');
    const username = AsyncStorage.getItem('username');
    const viewshot = useRef(null)
    const navigation = useNavigation('')



    const storagepermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const apiLevel = parseInt(Platform.Version, 10);

                let permissions = [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];

                if (apiLevel >= 33) {
                    permissions = [
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
                    ];
                }

                const granted = await PermissionsAndroid.requestMultiple(permissions);

                const allGranted = Object.values(granted).every(
                    (status) => status === PermissionsAndroid.RESULTS.GRANTED
                );

                if (allGranted) {
                    console.log('✅ Storage Permission Granted');
                    return true;
                } else {
                    console.log('❌ Storage Permission Denied');
                    return false;
                }
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const filepass = async () => {

        const path = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.pdf],
            copyTo: 'cachesDirectory', // Ensures file is accessible
        });
        return path
    }




    const HandleUpload = async () => {
        try {
            const doc = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf],
                copyTo: 'cachesDirectory', // Ensures file is accessible
            });
            if (!doc) {
                console.log('No document selected');
                return;
            }

            console.log('Selected Document:', doc);
            setSelectedFile(doc);
            setfileUri(doc.fileCopyUri || doc.uri);
            setfilename(doc.name)
            const fileSizeInMB = (doc.size / (1024 * 1024)).toFixed(2);
            setfilesize(`${fileSizeInMB} MB`);
            setfiletype(doc.type)
            console.log(`File Size: ${fileSizeInMB} MB`);
            console.log("uri", doc.uri);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('🚫 User canceled document picker');
            } else {
                console.error('❌ Error picking document:', err);
            }
        }
    };
    const upload = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const username = await AsyncStorage.getItem('username');
        const profilepic = await AsyncStorage.getItem('profilepic')

        console.log('User ID:', userId);
        const sanitizedFilename = filename.replace(/[()]/g, '').replace(/\s+/g, '_');
        console.log('thumnail:', pdfThumbnail);
        const formData = new FormData();
        formData.append('file', {
            name: sanitizedFilename,
            type: filetype,
            uri: fileUri,
        });
        formData.append('thumbnail', {
            uri: pdfThumbnail,
            name: `thumbnail_${Date.now()}.jpg`,
            type: 'image/jpeg',
        });
        formData.append('profilepic', {
            uri: profilepic,
            name: 'profile_pic.jpg',
            type: 'image/jpeg',

        })

        formData.append('userId', userId);
        formData.append('username', username);
        formData.append('filesize', filesize);

        console.log('FormData:', formData);
        

        const response = await axios.post(`${Config.Base_Url}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('✅ Upload successful:', response.data);
        Toast.show({
            type: 'success',
            text1: 'Uploaded Successfully',
            text2: `your file ${sanitizedFilename} was successfully uploaded}`,
        });
        navigation.navigate('Main');
    }

    const generatethumbnail = async () => {
        if (viewshot.current) {
            try {
                const uri = await viewshot.current.capture();
                console.log('Thumbnail captured:', uri);
                setPdfThumbnail(uri);
                console.log(pdfThumbnail)
            } catch (err) {
                console.error('Error capturing thumbnail:', err);
            }
        }

    }

    useEffect(() => {
        const pic = async () => {
            const propic = await AsyncStorage.getItem('profilepic')
            setprofilepic(propic)
            setTimeout(() => {
                generatethumbnail()
            },3000)
                
           
                await AsyncStorage.setItem('filesize',filesize)
    
        }
        
        pic()
    })


    return (

        <View style={{ height: "100%", width: "100%", backgroundColor: colors.white }}>
            {!selectedFile ? <View>
                <View style={{ height: "93%", width: "100%", backgroundColor: colors.white, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 30, fontFamily: fonts.bold }}>Upload your files here</Text>
                </View>
                <TouchableOpacity onPress={HandleUpload}>
                    <View style={{ height: 60, width: "100%", backgroundColor: colors.three, justifyContent: "center", alignContent: "center" }}>
                        <Text style={{ fontSize: 30, fontFamily: fonts.semibold, justifyContent: "center", marginLeft: 135 }} >UPLOAD</Text>
                    </View>
                </TouchableOpacity>
            </View>
                :
                <View style={{ height: "100%", width: "100%", backgroundColor: colors.white, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'column', height: "50%", width: "90%", margin: 20, borderRadius: 50, borderColor: colors.four, backgroundColor: colors.three, borderWidth: 2 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={{ height: 50, margin: 10, width: 50, borderRadius: 50, borderWidth: 2, borderColor: colors.four, margin: 30 }} source={{ uri: profilepic }}></Image>
                            <Text style={{ fontSize: 20, fontFamily: fonts.bold, margin: 35, marginLeft: -10 }}>{username}</Text>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

                            <View style={styles.previewContainer}>
                                {pdfThumbnail ? (
                                    <Image source={{ uri: pdfThumbnail }} style={styles.thumbnail} />
                                ) : (
                                    <TouchableOpacity onPress={() => { navigation.navigate('PDFViewer', { pdfUrl: fileUri }) }}>
                                        <ViewShot ref={viewshot} options={{ format: 'jpg', quality: 1.0 }}>
                                            <Pdf
                                                source={{ uri: fileUri }}
                                                style={styles.pdfView}
                                            />
                                        </ViewShot>
                                    </TouchableOpacity>
                                )}
                                <View style={styles.fileInfo}>
                                    <Text style={styles.fileName}>{filename}</Text>
                                    <Text style={styles.fileSize}>📄 {filesize} • PDF</Text>
                                </View>

                            </View>
                            <TouchableOpacity onPress={upload}>
                                <View style={{ margin: 50, height: 40, width: 200, borderColor: colors.primary, borderWidth: 1, backgroundColor: colors.four, borderRadius: 10, padding: 5, justifyContent: "center", alignContent: "center", alignItems: 'center' }}>
                                    <Text style={{ color: "white", fontSize: 20, fontFamily: fonts.semibold, justifyContent: "center", }} >UPLOAD</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            }

        </View>

    )
}

export default PdfUpload

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    uploadButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
    },
    uploadText: {
        color: '#fff',
        fontSize: 18,
    },
    previewContainer: {
        flexDirection: 'row',
        backgroundColor: '#025159',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
    },
    thumbnail: {
        width: 100,
        height: 70,
        borderRadius: 5,
    },
    pdfView: {
        width: 100,
        height: 70,
        backgroundColor: '#fff',
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
})