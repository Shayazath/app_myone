import { SafeAreaView, Image, TextInput, TouchableOpacity, View, FlatList, ActivityIndicator, Text, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useLayoutEffect, useState, memo, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { fonts } from '../../Utils/fonts';
import { colors } from '../../Utils/colors';
import Config from '../../Config';
import axios from 'axios';

const PDFItem = React.memo(({ item, navigation, isLiked, setIsLiked, showComments, setShowComments }) => (
    <View style={styles.pdfContainer}>
        <View style={styles.userInfo}>
            <Image style={styles.profilePic} source={{ uri: item.profilepic }} />
            <Text style={styles.username}>{item.username}</Text>
        </View>
        <TouchableOpacity
            style={styles.previewContainer}
            onPress={() => navigation.navigate('PDFViewer', { pdfUrl: item.data, isLocal: true, pdfName: item.namefile })}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.fileInfo}>
                <Text style={styles.fileName}>{item.filename}</Text>
                <Text style={styles.fileSize}>📄 {item.filesize} • PDF</Text>
            </View>
        </TouchableOpacity>
        
    </View>
));

const Searchscreen = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [filteredPDFs, setFilteredPDFs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;

    const fetchFilteredPDFs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${Config.Base_Url}/search`, { params: { query } });
            setFilteredPDFs(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching PDFs');
            setLoading(false);
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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "MENU",
            headerStyle: { backgroundColor: colors.black2gray, elevation: 5 },
            headerTitleStyle: { fontWeight: 'bold' },
            headerTintColor: colors.black2gray,
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 16 }}>
                    <AntDesign name="menufold" size={24} color={colors.black2gray} />
                </TouchableOpacity>
            ),
        });
    }, []);
    const searchBarTranslateY = scrollY.interpolate({
        inputRange: [0, 100], // Adjust based on how soon you want to hide the search bar
        outputRange: [0, -80], // Move up by 80px
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={{height : 900,paddingBottom:120}}>
            <Animated.View style={[styles.searchBar, { transform: [{ translateY: searchBarTranslateY }] }]}>
                <MaterialCommunityIcons name="magnify" size={24} color={colors.four} />
                <TextInput
                    placeholder="Search for docs..."
                    onChangeText={setQuery}
                    style={styles.searchInput}
                />
            </Animated.View>
            {loading ? (
                <ActivityIndicator size="large" color={colors.four} style={styles.loader} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : filteredPDFs.length === 0 && query.length > 1 ? (
                <Text style={styles.noDataText}>No PDFs found for "{query}"</Text>
            ) : (
                <Animated.FlatList
                    data={filteredPDFs}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <PDFItem
                            item={item}
                            navigation={navigation}
                            isLiked={isLiked}
                            setIsLiked={setIsLiked}
                            showComments={showComments}
                            setShowComments={setShowComments}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                { useNativeDriver: true }
                            )}
                        />
                    )}
                />
            )}
        </SafeAreaView>
    );
};

export default Searchscreen;

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        backgroundColor: colors.black,
        borderRadius: 25,
        elevation: 10,
        margin: 16,
        alignItems: 'center'
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: colors.black2gray,
    },
    loader: {
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
});
