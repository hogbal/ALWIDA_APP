import React, {useEffect, useState} from 'react';
import {ImageBackground, Image, Text, StyleSheet} from 'react-native';

import {createPOSTObject} from 'api/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Progress from 'react-native-progress';

const DestLoading = ({navigation}) => {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(0);
  const [check, setCheck] = useState(false);
  const [data, setData] = useState([
    {ampm: '-', hour: '00', minute: '00'},
    {ampm: '-', hour: '00', minute: '00'},
    {ampm: '-', hour: '00', minute: '00'},
  ]);

  const storeState = async value => {
    const strCheck = value.toString();
    try {
      await AsyncStorage.setItem('state', strCheck);
    } catch (e) {
      console.error(e);
    }
  };

  const getID = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        setId(value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const recommandState = async () => {
    let formdata = new FormData();
    formdata.append('id', id);

    await createPOSTObject('dest/recommend', formdata)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.result !== false && data.result !== 'error') {
          setData(data);
          setCheck(true);
        }
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    storeState('loading');
    getID();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(loading + 1);
      recommandState();
    }, 500);

    if (check) {
      clearInterval(interval);
      navigation.navigate('RecommendedTime');
    }

    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  return (
    <ImageBackground
      source={require('assets/img/loading_background.png')}
      resizeMode="cover"
      style={styles.container}>
      <Image
        source={require('assets/img/loading_img.png')}
        resizeMode="contain"
        style={styles.img}
      />
      <Progress.Bar
        style={styles.processBar}
        progress={loading / 10}
        color="white"
        unfilledColor="#1F7DD8"
        width={null}
        height={10}
        borderRadius={5}
        borderWidth={0}
        animationType="timing"
      />
      <Text style={styles.text}>정보를 제공 받고 있는 중 입니다.</Text>
      <Text style={styles.text}>잠시만 기다려주십시오.</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    color: '#FFFFFF',
    fontSize: 15,
  },
  processBar: {
    width: '85%',
    marginVertical: '5%',
  },
});

export default DestLoading;
