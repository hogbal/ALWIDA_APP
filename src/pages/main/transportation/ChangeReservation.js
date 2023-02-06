import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { createPOSTObject } from 'api/API'
import { ActiveButton } from 'components/CustomButton'
import { TimePicker } from 'components/CustomTimePicker'

const LocalPicker = ({ local }) => {
    return (
        <View style={styles.pickerContainer}>
            <Text style={styles.pickerText}>{local}</Text>
        </View>
    )
}

const TerminalPicker = ({ terminal }) => {
    return (
        <View style={styles.pickerContainer}>
            <Image
                style={styles.markerImg}
                source={require('assets/img/picker_marker.png')}
            />
            <Text style={styles.pickerText}>{terminal}</Text>
        </View>
    )
}

const ChangeReservation = ({ navigation }) => {
    const [location, setLocation] = useState('지역')
    const [terminal, setTerminal] = useState('터미널')
    const [ampm, setAMPM] = useState('오전')
    const [hour, setHour] = useState(1)
    const [min, setMin] = useState(0)

    // ID 불러오기
    const getID = async (onpress) => {
        try {
            const value = await AsyncStorage.getItem('id')
            if (value !== null) {
                return onpress(value)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getID(loadingData)
    }, [])

    // POST 요청 (데이터 로딩)
    const loadingData = async (id) => {
        let formdata = new FormData()
        formdata.append("id", id)
        console.log(formdata)
        await createPOSTObject('msg/resInfo', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            setLocation(data.location)
            setTerminal(data.terminal)
        })
        .catch((err) => console.error(err))
    }
    
    const postData = async (id) => {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('ampm', ampm)
        formdata.append('hour', hour)
        formdata.append('min', min)
        console.log(formdata)
        await createPOSTObject('msg/reservation', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.result === true) {
                navigation.navigate('ChangeLoading')
            }
        })
        .catch((err) => console.error(err))
    }

    return (
        <SafeAreaView style={styles.container}>
            <LocalPicker local={location} />
            <TerminalPicker terminal={terminal} />
            
            {/* 시간 */}
            <View style={styles.selectTimeContainer}>
                <View style={styles.timeContainer}>
                        <TimePicker setAMPM={setAMPM} hour={hour} setHour={setHour} minute={min} setMinute={setMin} />
                </View>
            </View>
        
            <ActiveButton onpress={() => getID(postData)} text='확인' />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    pickerContainer: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E3E6ED',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
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
    selectTimeContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    timeContainer: {
        alignItems: 'center',
        marginVertical: 25,
    },
    time: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        borderWidth: 2,
        borderColor: '#E3E6ED',
        borderRadius: 15,
        padding: 20,
    },
    selectedTime: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        borderWidth: 2,
        borderColor: '#00A8FF',
        borderRadius: 15,
        padding: 20,
    },
    ampmText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
        color: '#1A1A1A',
        marginRight: 50,
    },
    timeText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 60,
        color: '#1A1A1A',
    }
})

export default ChangeReservation