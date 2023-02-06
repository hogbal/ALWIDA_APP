import React, { useEffect, useState } from 'react'
import {
    ImageBackground,
    Image,
    Text,
    StyleSheet,
} from 'react-native'

import * as Progress from 'react-native-progress'

const DestLoading = ({ navigation }) => {
    const [loading, setLoading] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setLoading(loading + 1)
        }, 500)

        if(loading >= 10){
            clearInterval(interval)
            navigation.navigate('RecommendedTime')
        }
        return () => {
            clearInterval(interval)
        }
    }, [loading])

    return (
        <ImageBackground
            source={require('assets/img/loading_background.png')}
            resizeMode='cover'
            style={styles.container}
        >
            <Image
                source={require('assets/img/loading_img.png')}
                resizeMode='contain'
                style={styles.img}
            />
            <Progress.Bar
                style={styles.processBar}
                progress= {loading / 10}
                color='white'
                unfilledColor='#1F7DD8'
                width={null}
                height={10}
                borderRadius={5}
                borderWidth={0}
                animationType='timing'
            />
            <Text style={styles.text}>정보를 제공 받고 있는 중 입니다.</Text>
            <Text style={styles.text}>잠시만 기다려주십시오.</Text>
        </ImageBackground>
    )
}

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
        marginVertical: 50,
    }
})

export default DestLoading