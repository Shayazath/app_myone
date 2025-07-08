import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../Utils/colors'
import { AuthContext } from '../../AuthContext'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { fonts } from '../../Utils/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Profilescreen = () => {
  const [profile_pic, setprofile_pic] = useState('');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [filteredPDFs, setFilteredPDFs] = useState([]);
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext); // ✅ Moved to top-level

  // Fetch user data from AsyncStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedusername = await AsyncStorage.getItem('username');
        const storedprofile_pic = await AsyncStorage.getItem('profilepic');
        const storedemail = await AsyncStorage.getItem('email');

        setusername(storedusername);
        setprofile_pic(storedprofile_pic);
        setemail(storedemail);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Fetch filtered PDFs when username changes
  useEffect(() => {
    const fetchFilteredPDFs = async () => {
      try {
        const response = await axios.get(`${Config.Base_Url}/countpdfs`, {
          params: { username: username },
        });
        setFilteredPDFs(response.data.count);
      } catch (err) {
        console.log('Error fetching PDFs:', err);
      }
    };

    if (username) fetchFilteredPDFs();
  }, [username]);

  // Logout handler
  const authLogout = () => {
    logout();
    Toast.show({
      type: 'info',
      text1: 'Logout Successfully',
      text2: 'Come back again',
    });
  };



  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={{
          borderRadius: 100,
          height: 200,
          width: 200
        }} source={{ uri: profile_pic }} />
        <View style={{
          fontSize: 20,
          borderWidth: 2, width: 150,
          alignItems: "center",
          borderRadius: 20,
          margin: 10
        }}>
          <Text style={{
            fontSize: 20, color: colors.black2gray,
            fontFamily: fonts.semibold,
          }}>{username}</Text>
        </View>

      </View>
      <View style={styles.ViewCon}>
        <Ionicons name="mail" size={24} color={colors.black2gray} style={{ marginRight: 10 }} />

        <Text style={styles.txtCon}>{email}</Text>

      </View>
      <View style={styles.ViewCon}>

        <Text style={styles.txtCon}>PDF Uploads :  {filteredPDFs.length}</Text>

      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Userupload', username)}>
        <View style={styles.ViewCon}>

          <Text style={styles.txtCon}>Your uploads</Text>

        </View>
      </TouchableOpacity>
      <View style={styles.ViewCon}>

        <Text style={styles.txtCon}>Updates</Text>

      </View>
      <View style={{
        marginTop: 10,
        height: 50,
        width: 150,
        marginLeft: 130,
        elevation: 5,
        borderWidth: 2,
        alignItems: "center",
        borderColor: "white",
        justifyContent: "center",
        backgroundColor: "#6b0382",
        borderRadius: 150,

      }}>

        <Text style={[styles.txtCon, { color: colors.white }]} onPress={authLogout}>Logout</Text>

      </View>




    </ScrollView>
  )
}

export default Profilescreen

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: "100%",
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: -40
  },
  ViewCon: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    backgroundColor: colors.three,
    width: 400,
    borderRadius: 200,
    elevation: 5,
    borderWidth: 2,
    marginLeft: 6,
    borderColor: colors.four,
    alignItems: "center",
    justifyContent: "center",
  },
  txtCon: {
    fontSize: 18,
    color: colors.black2gray,
    fontFamily: fonts.semibold,

  }
})