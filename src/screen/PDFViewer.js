import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';



const PDFViewer = ({ route }) => {
  const { pdfUrl, pdfName } = route.params;

  const pdfSource = pdfUrl
  const pdfname = pdfName

  console.log(pdfSource)


  const [loading, setLoading] = useState(false);
  const [pdfUri, setPdfUri] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const downloapdf = async () => {
    try {
      setLoading(true);
      const downloadDest = `${RNFS.DownloadDirectoryPath}/${pdfname}`;

      const base64Data = pdfSource.split('base64,')[1];
      if (!base64Data) {
        throw new Error('Invalid base64 data.');
      }

      // Write the base64 data to the file system
      await RNFS.writeFile(downloadDest, base64Data, 'base64');
      setPdfUri(downloadDest);
      
      Alert.alert('Download Successful', `PDF saved to ${downloadDest}`)
      ;
    } catch (e) {
      console.log("This error",e)
    }finally {
      setLoading(false);
    }
    


  }

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: pdfSource, cache: true }}
        style={styles.pdf}
        onLoadComplete={(numberOfPages , filepath) => {
          console.log(`Total Pages: ${numberOfPages}, File Path: ${filepath}`);
          setTotalPages(numberOfPages);
        }}
        onPageChanged={(page) => {
          setCurrentPage(page);
        }}
        enablePaging={true}
      />
      <View style={styles.pageInfo}>
        <Text style={{color : 'white'}}>{`Page ${currentPage} of ${totalPages}`}</Text>
      </View>
      <Button title={loading ? 'Downloading' : 'Click here to download'} onPress={downloapdf} disabled={loading}/>
    </View>
  );
};

export default PDFViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color : 'black',
  },
  pdf: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  pageInfo: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
