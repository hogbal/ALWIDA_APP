import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRecoilState } from 'recoil'

import { orderInfo } from 'hooks/Atoms'
import { createPOSTObject } from 'api/API'
import { ActiveButton, InactiveButton } from 'components/CustomButton'

const RecommendedTime = ({ navigation }) => {
    const [selectedTime, setSelectedTime] = useState(-1)
    const [data, setData] = useState([{"ampm": "-", "hour": "00", "minute": "00"}, {"ampm": "-", "hour": "00", "minute": "00"}, {"ampm": "-", "hour": "00", "minute": "00"}])
    const [orderData, setOrderData] = useRecoilState(orderInfo)

    // ID 불러오기
    const getID = async () => {
        try {
            const value = await AsyncStorage.getItem('id')
            if (value !== null) {
                return loadingData(value)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getID()
    }, [])

    useEffect(() => {
        console.log(selectedTime)
    },[selectedTime])

    // POST 요청 (데이터 로딩)
    const loadingData = async (id) => {
        let formdata = new FormData()
        formdata.append("id", id)

        await createPOSTObject('dest/recommend', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.result !== false && data.result !== "error") {
                setData(data)
            }
        })
        .catch((e) => console.error(e))
    }

    const postTime = async () => {
        let formdata = new FormData()
        formdata.append('id', orderData['id'])
        formdata.append('ampm', data[selectedTime].ampm)
        formdata.append('hour', data[selectedTime].hour)
        formdata.append('minute', data[selectedTime].minute)
        
        await createPOSTObject('dest/accept', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.result == true) {
                Alert.alert("예약이 확정되었습니다.")
                navigation.navigate('Destination')
            }
        })
        .catch((e) => console.error(e))

    }

    const onClickButton = () => {
        postTime()
    }

    const TerminalPicker = ({ terminal }) => {
        return (
            <View
                style={styles.pickerContainer}
            >
                <Image
                    style={styles.markerImg}
                    source={require('assets/img/picker_marker.png')}
                />
                <Text style={styles.pickerText}>{terminal}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.info}>
                <TerminalPicker terminal={orderData.terminal} />
                <View style={styles.timeContainer}>
                    <TouchableOpacity
                        style={
                            (selectedTime == 0)
                            ? styles.selectedTime
                            : styles.time
                        }
                        onPress={() => setSelectedTime(0)}
                    >
                        <Text style={styles.ampmText}>{data[0].ampm}</Text>
                        <Text style={styles.timeText}>{data[0].hour}:{data[0].minute}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={
                            (selectedTime == 1)
                            ? styles.selectedTime
                            : styles.time
                        }
                        onPress={() => setSelectedTime(1)}
                    >
                        <Text style={styles.ampmText}>{data[1].ampm}</Text>
                        <Text style={styles.timeText}>{data[1].hour}:{data[1].minute}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={
                            (selectedTime == 2)
                            ? styles.selectedTime
                            : styles.time
                        }
                        onPress={() => setSelectedTime(2)}
                    >
                        <Text style={styles.ampmText}>{data[2].ampm}</Text>
                        <Text style={styles.timeText}>{data[2].hour}:{data[2].minute}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.button}>
                {
                    (selectedTime == -1)
                    ? <InactiveButton text='수락' />
                    : <ActiveButton onpress={() => onClickButton()} text='수락' />
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    info: {
        flex: 9,
        justifyContent: 'flex-start'
    },
    timeContainer: {
        alignItems: 'center',
    },
    button: {
        flex:1,
        justifyContent: 'flex-end',
    },
    pickerContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E3E6ED',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7%',
        margin: '3%',
        backgroundColor: '#FFFFFF',
    },
    markerImg: {
        position: 'absolute',
        left: '10%',
    },
    pickerText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
        color: '#1A1A1A',
    },
    selectedTime: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        borderWidth: 2,
        borderColor: '#00A8FF',
        borderRadius: 15,
        padding: "5%",
        margin: "5%",
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        borderWidth: 2,
        borderColor: '#E3E6ED',
        borderRadius: 15,
        padding: "5%",
        margin: "5%",
    },
    ampmText: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
        color: '#1A1A1A',
    },
    timeText: {
        flex: 2,
        textAlign: 'center',
        fontFamily: 'Pretendard-Medium',
        fontSize: 60,
        color: '#1A1A1A',
    }
})

export default RecommendedTime