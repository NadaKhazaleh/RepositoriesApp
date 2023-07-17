import React from 'react';
import { View, Text } from 'react-native';
import { GoogleSignin, statusCodes,GoogleSigninButton } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import { loginAction } from '../../Redux/actions/loginAction';

import styles from './LoginScreen.style';

const LoginScreen = ({ navigation }:any) => {

  const dispatch = useDispatch();


  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.configure({
        webClientId:'1055163824607-srkmal9u9bohqnpn1i8mnfgug3k4e5dt.apps.googleusercontent.com',
        offlineAccess:true,
        forceCodeForRefreshToken:true
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        const userData = {
          name: userInfo.user.name,
          email: userInfo.user.email,
          photo: userInfo.user.photo,
          provider: 'google',
          idToken: userInfo.idToken,
        };

        await AsyncStorage.setItem('user', JSON.stringify(userData));
        navigation.navigate('Main');
        dispatch(loginAction());
      }
    } catch (error) {
      console.log("error",error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google login cancelled');
      } else {
        console.log('Error with Google login:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>

<GoogleSigninButton
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Light}
  onPress={handleGoogleLogin}
  disabled={false}
/>
    </View>
  );
};

export default LoginScreen;
