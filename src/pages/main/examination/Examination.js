import React, { useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { launchCamera } from 'react-native-image-picker'

import { ActiveButton } from 'components/CustomButton'
import { createImagePOSTObject } from 'api/API'

const Examination = ({ navigation }) => {
    const [imageSource, setImageSource] = useState('')
    const options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    }

    const image = {
        uri: '',
        type: '',
        name: '',
    };
    
    const showCamera = () => {
        launchCamera(options, (res) => {
            if (res.error) {
                console.log('LaunchCamera Error: ', res.error)
            }
            else if (res.didCancel == true) {
                console.log('None Img')
            }
            else {
                image.uri = Platform.OS === 'android' ? res.assets[0].uri : res.assets[0].uri.replace('file://', '')
                image.type = res.assets[0].type
                image.name = res.assets[0].fileName
                setImageSource(Platform.OS === 'android' ? res.assets[0].uri : res.assets[0].uri.replace('file://', ''))
            }
        })
    }

    // id 불러오기
    const onClickButton = async () => {
        try {
            const value = await AsyncStorage.getItem('id')
            if (value !== null) {
                return postData(value)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const postData = async (id) => {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('file', image)
        console.log(formdata)
        console.log(formdata['_parts'][1])
        await createImagePOSTObject('check', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.result === true) {
                console.log(data.result)
                navigation.navigate('InspectionHistory')
            }
        })
        .catch((err) => console.error(err))
    }

    if (!imageSource) {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={showCamera}>
                    <Image
                        style={styles.cameraImg}
                        source={require('assets/img/camera.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.img}
                source={{uri: imageSource}}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => setImageSource(null)}
            >
                <Text style={styles.buttonText}>다시 촬영</Text>
            </TouchableOpacity>
            <ActiveButton onpress={() => onClickButton()} text='검사 요청' />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraImg: {
        width: 120,
        height: 120,
    },
    img: {
        flex: 1,
        width: '100%',
        borderRadius: 25,
        marginVertical: 30,
    },
    button: {
        width: '100%',
        backgroundColor: '#E9EBEC',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },
    buttonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#ACACA9',
        margin: 15,
    },
})

export default Examination