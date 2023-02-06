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

const Reservation = ({ navigation }) => {
    const [data, setData] = useState({"location": "-", "terminal": "-", "ampm": "-", "time": "00:00"})

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

    // POST 요청 (데이터 로딩)
    const loadingData = async (id) => {
        let formdata = new FormData()
        formdata.append("id", id)
        console.log(formdata)
        await createPOSTObject('dest/reservation_state', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setData(data)
            console.log(data)
        })
        .catch((e) => console.error(e))
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <LocalPicker local={data.location} />
            <TerminalPicker terminal={data.terminal} />
            
            <View style={styles.selectTimeContainer}>
                <View style={styles.timeContainer}>
                    <View style={styles.selectedTime}>
                        <Text style={styles.ampmText}>{data.ampm}</Text>
                        <Text style={styles.timeText}>{data.time}</Text>
                    </View>
                </View>
            </View>
        
        <ActiveButton onpress={() => navigation.navigate('Destination')} text='확인' />

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

export default Reservation