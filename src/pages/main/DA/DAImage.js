import React, {useEffect} from 'react';
import {SafeAreaView, Image} from 'react-native';

const DAImage = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Image
        source={require('assets/img/da_img.png')}
        style={{resizeMode: 'stretch'}}
      />
    </SafeAreaView>
  );
};

export default DAImage;
