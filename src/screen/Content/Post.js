import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../Utils/colors'
import { fonts } from '../../../Utils/fonts'
import Octicons from 'react-native-vector-icons/Octicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import ViewShot from 'react-native-view-shot'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'


const Post = (
  {
    UserName,
    postthumbnail,
    Posturl,
    Likes,
    Comments,
    namefile,
    profilepic,
    filesize }
) => {

  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [pdfUri, setPdfUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()
  const pdfThumbnail = "file:///data/user/0/com.myone/cache/ReactNative-snapshot-image8101105506023101265.jpg"

  


  return (
    <View style={{ height: 280, flexDirection: "column", width: "100%", backgroundColor: colors.three, marginVertical: 10, borderRadius: 20 }}>
      <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
        <Image style={{ height: 35, margin: 10, width: 35, borderRadius: 50, borderColor: colors.black }} source={{ uri: profilepic }} />
        <Text style={{ color: "black", fontSize: 17, fontFamily: fonts.semibold, margin: 10 }}>{UserName}</Text>
      </View>
      <View style={{ padding: 10, height: "100%", width: "100%", }}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
          <TouchableOpacity
            style={styles.previewContainer}
            onPress={() => navigation.navigate('PDFViewer', { pdfUrl: Posturl, isLocal: true , pdfName : namefile })}
          >
            <Image source={{ uri: postthumbnail }} style={styles.thumbnail} />
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{namefile}</Text>
              <Text style={styles.fileSize}>📄 {filesize} • PDF</Text>
            </View>
          </TouchableOpacity>

        </View>
        <View >

          <View style={{ flexDirection: "row" }}>
            {
              isLiked ?
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => { setIsLiked(false) }} style={{ flexDirection: "row" }}>
                    <Octicons style={{ margin: 10, color: "#a200ff", borderColor: "black" }} name="heart-fill" size={26} color="black" />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 17, marginTop: 10, color: "#a200ff", fontStyle: "bold", fontFamily: fonts.sfbold }}>{Likes.length + 1}</Text>
                </View>
                :
                <View style={{ flexDirection: "row" }} >
                  <TouchableOpacity onPress={() => { setIsLiked(true) }} style={{ flexDirection: "row" }}>
                    <Octicons style={{ margin: 10 }} name="heart" size={26} color="black" />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 17, marginTop: 10, color: "black", fontStyle: "bold" }}>{Likes.length}</Text>
                </View>

            }
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { setShowComments(!showComments) }}>
                <Octicons style={{ margin: 10 }} name="comment" size={26} color="black" />
                <Text style={{ fontSize: 17, marginTop: 10, color: "black", fontStyle: "bold" }}>{Comments.length}</Text>
              </TouchableOpacity>
            </View>


          </View>


        </View>

      </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({

  s1: {
    padding: 10,
    width: "100%",
    backgroundColor: colors.three
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
    width: 200,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  fileSize: {
    fontSize: 14,
    color: '#bbb',
  },
})