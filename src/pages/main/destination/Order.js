import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRecoilState } from 'recoil'

import { orderInfo } from 'hooks/Atoms'
import { ActiveButton, InactiveButton } from 'components/CustomButton'
import { createPOSTObject } from 'api/API'
import { Font } from 'api/Font'

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
            console.log(data)
            if (data.result !== false) {
                setContainerStatus(data.result)
                setNext(true)
            }
            else {
                setContainerStatus("존재하지 않는 컨테이너 입니다.")
                setNext(false)
            }
        })
        .catch((e) => {
            console.error(e)
        })
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.text}>컨테이너 번호</Text>
                    <View style={styles.containerNum}>
                        <TextInput
                            style={styles.input}
                            placeholder='컨테이너 번호를 입력해주세요'
                            placeholderTextColor="#E0E0E0"
                            onChangeText={onChangeContainerNum}
                            value={containerNum}
                        />
                    </View>
                    <Text style={styles.redText}>{containerStatus}</Text>
                    <View style={styles.conatinerButton}>
                    {
                        (containerNum != '')
                        ? <ActiveButton onpress={inquireContainer} text='조회하기' />
                        : <InactiveButton text='조회하기' />
                    }
                    </View>
                    <Text style={styles.text}>차량번호</Text>
                    <View style={styles.carNum}>
                        <TextInput
                            style={styles.input}
                            placeholder='차량번호를 입력해주세요'
                            onChangeText={onChangeCarNum}
                            value={carNum}
                        />
                    </View>
                    <View style={styles.button}>
                        {
                            (next && carNum != '')
                            ? <ActiveButton onpress={() => onClickButton()} text='다음' />
                            : <InactiveButton text='다음' />
                        }
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    info: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    containerNum: {
        alignItems: 'center'
    },
    carNum: {
        alignItems: 'center'
    },
    conatinerButton: {
        
    },
    button: {
        flex:1,
        justifyContent: 'flex-end'
    },
    input: {
        width: "90%",
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DCDEE6',
        marginVertical: "1%",
        padding:'3%'
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes20,
        color: '#000000',
        marginLeft: "5%",
        marginTop: "5%",
        marginBottom: "1%",
    },
    redText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes16,
        color: '#FF4D4D',
        marginLeft: "5%"
    },
})

export default Order