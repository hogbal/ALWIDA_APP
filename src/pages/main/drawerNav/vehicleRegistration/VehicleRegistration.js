import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native'

import { createPOSTObject } from 'api/API'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActiveButton, InactiveButton } from 'components/CustomButton'
import { ToastMessage } from 'components/ToastMessage'

const VehicleRegistration = ({ navigation }) => {
    const [info, setInfo] = useState({})
    const [name, onChangeName] = useState('')
    const [phoneNum, onChangePhoneNum] = useState('')
    const [address, onChangeAddress] = useState('')
    const [carNum, onChangeCarNum] = useState('')

    // id 불러오기
    const getInfoID = async () => {
        try {
            const value = await AsyncStorage.getItem('id')
            if (value !== null) {
                return getInfo(value)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const getPostID = async () => {
        try {
            const value = await AsyncStorage.getItem('id')
            if (value !== null) {
                return onClickButton(value)
            }
        } catch (e) {
            console.error(e)
        }
    }

    // 차량정보 불러오기
    const getInfo = async (id) => {
        let formdata = new FormData()
        formdata.append("id", id)
        await createPOSTObject('main/info', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setInfo(data)
        })
        .catch((err) => console.error(err))
    }

    // 페이지 실행 시 id 및 차량정보 불러오기
    useEffect(() => {
        getInfoID()
    }, [])

    // info 변경 시 리렌더링
    useEffect(() => {
        onChangeName(info.name)
        onChangePhoneNum(info.phoneNum)
        onChangeAddress(info.address)
        onChangeCarNum(info.carNum)
    }, [info])

    const onClickButton = async (id) => {
        let formdata = new FormData()
        formdata.append("id", id)
        formdata.append("phoneNum", phoneNum)
        formdata.append("address", address)
        formdata.append("carNum", carNum)
        console.log(formdata)
        await createPOSTObject('main/carmod', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.result === true) {
                Alert.alert('변경이 완료되었습니다.')
            } else if (data.result === false) {
                Alert.alert('변경이 되지 않았습니다.{"\n"}잠시후 다시 시도해주세요.')
            }
        })
        .catch((err) => console.error(err))
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* 기본 정보 */}
            <View>
                <Text style={styles.text}>기본 정보</Text>
                <TextInput
                    style={styles.input}
                    placeholder='이름'
                    onChangeText={onChangeName}
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="번호 ('-' 제외)"
                    onChangeText={onChangePhoneNum}
                    value={phoneNum}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    placeholder='주소'
                    onChangeText={onChangeAddress}
                    value={address}
                />
            </View>

            {/* 차량번호 */}
            <View style={{marginTop: 20,}}>
                <Text style={styles.text}>차량번호</Text>
                <TextInput
                    style={styles.input}
                    placeholder='차량번호를 입력해주세요'
                    onChangeText={onChangeCarNum}
                    value={carNum}
                />
            </View>

            {/* blank view */}
            <View style={{flex: 1,}}></View>

            {/* 등록하기 버튼 */}
            {
                (name != null && phoneNum != null && address != null && carNum != null)
                ? <ActiveButton onpress={() => getPostID()} text='변경하기' />
                : <InactiveButton text='변경하기' />
            }
            {/* <ToastMessage description='변경이 완료되었습니다' /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        marginTop: 20,
        marginBottom: 5,
        color: '#000000',
    },
    input: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DCDEE6',
        marginVertical: 5,
        paddingHorizontal: 15,
    },
})

export default VehicleRegistration