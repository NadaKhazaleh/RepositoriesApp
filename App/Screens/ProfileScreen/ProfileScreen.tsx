import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, Linking, Alert, Platform } from 'react-native';
import ImagePicker, { Options } from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet from 'react-native-actionsheet';

import styles from './ProfileScreen.style';

const ProfileScreen: React.FC = () => {

  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const cameraOptions: Options = {
    multiple: false,
    includeBase64: true,
    compressImageMaxWidth: 1000,
    compressImageMaxHeight: 1000,
    mediaType: 'photo',
    cropping: true,
  };

  const galleryAccessMessage = Platform.OS === 'android'
    ? 'You should allow access to gallery'
    : '';

  let ActionSheetVal: ActionSheet | null;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
        setUserImage(parsedUserData.photo)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectFile = (index: number) => {
    if (index === 0) {
      ImagePicker.openCamera(cameraOptions)
        .then((image: any) => {
          const updatedUser = { ...user, photo: image.data };
          setUserImage(image.data)
          AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        })
        .catch((error) => {
          if (
            error.message === 'User did not grant camera permission.' ||
            error.message === 'User did not grant library permission.'
          ) {
            Alert.alert(
              'You should allow access to camera',
              galleryAccessMessage,
              [
                {
                  text: 'Allow',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: "Don't Allow",
                },
              ],
              {
                cancelable: true,
              }
            );
          }
        });
    } else if (index === 1) {
      ImagePicker.openPicker({
        ...cameraOptions,
        maxFiles: 1,
      })
        .then((image: any) => {
       
          setUserImage(image.sourceURL)
        })
        .catch((error) => {
          if (error.message === 'User did not grant library permission.') {
            Alert.alert(
              'you should allow access to gallery',
              '',
              [
                {
                  text: 'Allow',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: "Don't Allow",
                },
              ],
              {
                cancelable: true,
              }
            );
          }
        });
    }
  };
  
  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.profileContainer}>
            <View style={styles.imageView}>
              <Image source={{uri:userImage}}
                style={styles.profilePicture} resizeMode='contain' />
            </View>

            {/* <Image source={require('./profile-picture.jpg')} style={styles.profilePicture} /> */}
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.info}>{user.phoneNumber}</Text>
            <Text style={styles.info}>{user.location}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => ActionSheetVal?.show()}>
            <Text style={styles.editButtonText}>Change Photo</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text >User data not found</Text>
      )}
      <ActionSheet
        ref={(o) => (ActionSheetVal = o)}
        options={[
          'Take Photo', 'Choose Photo', 'Cancel']}
        cancelButtonIndex={2}
        onPress={(index) => selectFile(index)}
      />
    </View>
  );
};




export default ProfileScreen;