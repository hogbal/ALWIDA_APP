import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Linking
} from 'react-native'

import { PERMISSIONS, RESULTS, request, check } from "react-native-permissions"

import AsyncStorage from '@react-native-async-storage/async-storage'
import { launchCamera } from 'react-native-image-picker'

import { ActiveButton } from 'components/CustomButton'
import { createImagePOSTObject } from 'api/API'

const Examination = ({ navigation }) => {
    const [imageSource, setImageSource] = useState('')
    const [image, setImage] = useState({
        uri: '',
        type: '',
        name: '',
    })

    const permissionCheck = async () => {
        if(Platform.OS !== "ios" && Platform.OS !== "android") return
        const platformPermissions = Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA

        request(platformPermissions).then((statuses) => {
            console.log('Camera', statuses)
            if(statuses == RESULTS.GRANTED) {
                return true
            }
            else {
                Linking.openSettings()
                return false
            }
        })
    }

    const options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    }
    
    const showCamera = () => {
        permissionCheck()
        .then(() => {
            launchCamera(options, (res) => {
                if(res.error) {
                    console.log('LaunchCamera Error: ', res.error)
                }
                else if(res.didCancel) {
                    console.log('Camera Cancel')
                }
                else {
                    console.log(res)
                    const localUri = res.assets[0].uri;
                    const uriPath = localUri.split("//").pop();
                    const imageName = localUri.split("/").pop();
                    
                    data = {
                        name:imageName,
                        type:"image/jpg",
                        uri:uriPath
                        
                    }
                    
                    setImage(data)
                    setImageSource("file://"+uriPath);
                }
            })
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
        console.log(image)
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

    useEffect(()=>{
        showCamera()
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.info}>
                <Image
                    style={styles.img}
                    source={{uri: imageSource ? imageSource : require('assets/img/camera.png')}}
                />
                <TouchableOpacity
                    style={styles.inactiveButton}
                    onPress={() => showCamera()}
                >
                    <Text style={styles.inactiveText}>다시 촬영</Text>
                </TouchableOpacity>
            </View>
            <ActiveButton onpress={() => onClickButton()} text='검사 요청' />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    info: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    img: {
        flex: 1,
        borderRadius: 25,
        margin: '5%'
    },
    inactiveButton: {
        backgroundColor: '#E9EBEC',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3%',
    },
    inactiveText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#ACACA9',
        margin: '4%',
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end'
    }
})

export default Examination