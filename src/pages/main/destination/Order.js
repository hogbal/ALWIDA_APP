import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRecoilState } from 'recoil'

import { orderInfo } from 'hooks/Atoms'
import { ActiveButton, InactiveButton } from 'components/CustomButton'
import { createPOSTObject } from 'api/API'

const Order = ({ navigation }) => {
    const [containerNum, onChangeContainerNum] = useState('')
    const [containerStatus, setContainerStatus] = useState('')
    const [carNum, onChangeCarNum] = useState('')
    const [ID, setID] = useState('')
    const [next, setNext] = useState(false)
	const [orderData, setOrderData] = useRecoilState(orderInfo)

    const onClickButton = async () => {
		let orderDataTemp = {...orderData}
        orderDataTemp["id"] = ID
		orderDataTemp["containerNum"] = containerNum
		setOrderData(orderDataTemp)
		navigation.navigate("OrderTime")
    }

    // 페이지 실행 시 id 및 차량번호 불러오기
    useEffect(() => {
        getID()
    }, [])

    // id 불러오기
    const getID = async () => {
        try {
            const value = await AsyncStorage.getItem('id')
            if (value !== null) {
                setID(value)
                return loadCarNum(value)
            }
        } catch (e) {
            console.error(e)
        }
    }

    /** 차량번호 불러오기 */
    const loadCarNum = async (id) => {
        let formdata = new FormData()
        formdata.append("id", id)
        await createPOSTObject('dest/car', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.result != false && data.result !== 'error') {
                onChangeCarNum(data.result)
            }
        })
        .catch((e) => {
            console.error(e)
        })
    }

    /** 조회하기 버튼 클릭 함수 */
    const inquireContainer = async () => {
        let formdata = new FormData()
        formdata.append("containerNum", containerNum)
        await createPOSTObject('dest/container_state', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.result !== "False") {
                setContainerStatus(data.result)
                setNext(true)
            }
        })
        .catch((e) => {
            console.error(e)
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>컨테이너 번호</Text>
                <TextInput
                    style={styles.input}
                    placeholder='컨테이너 번호를 입력해주세요'
                    onChangeText={onChangeContainerNum}
                    value={containerNum}
                />
                <Text style={styles.redText}>{containerStatus}</Text>
                {
                    (containerNum != '')
                    ? <ActiveButton onpress={inquireContainer} text='조회하기' />
                    : <InactiveButton text='조회하기' />
                }
            </View>
            <View>
                <Text style={styles.text}>차량번호</Text>
                <TextInput
                    style={styles.input}
                    placeholder='차량번호를 입력해주세요'
                    onChangeText={onChangeCarNum}
                    value={carNum}
                />
            </View>
            <View style={{flex: 1,}}></View>
            {
                (next && carNum != '')
                ? <ActiveButton onpress={() => onClickButton()} text='다음' />
                : <InactiveButton text='다음' />
            }
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
    redText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#FF4D4D',
        marginVertical: 3,
    },
    input: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DCDEE6',
        marginTop: 3,
        paddingHorizontal: 15,
    },
    inputContainer: {
        marginBottom: 50,
    },
})

export default Order