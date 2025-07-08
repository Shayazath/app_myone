import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import Config from '../../../Config';

const FollowersRandomPost = () => {
  const [data, setData] = useState([]); // ✅ State for posts
  const [loading, setLoading] = useState(true); // ✅ State for loading indicator

  useEffect(() => {
    fetchPosts(); // Fetch posts when the component mounts
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${Config.Base_Url}/files`);

      setData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : data.length > 0 ? (
        data.map((item) => (
          <Post
            key={item._id}
            UserName={item.username}
            Posturl={item.data} 
            postthumbnail={item.thumbnail}
            profilepic={item.profilepic}
            namefile={item.filename} 
            Likes={item.Likes || []} 
            Comments={item.Comments || []} 
            filesize={item.filesize}
           
          />
        ))
      ) : (
        <Text style={styles.noPosts}>No posts available</Text>
      )}
    </ScrollView>
  );
};

export default FollowersRandomPost;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'column',
    padding: 10,
  },
  noPosts: {
    textAlign: 'center',
    padding: 20,
  },
});
