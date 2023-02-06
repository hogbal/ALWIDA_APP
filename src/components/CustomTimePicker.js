import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native'

const TimePicker = ({ setAMPM, hour, setHour, minute, setMinute }) => {
    const [_hour, _setHour] = useState('01')
    const [_minute, _setMinute] = useState('00')

    const [isAM, setIsAM] = useState(true)

    const changeHour = (isUp) => {
        if (isUp) {
            if (hour === 12) {
                setHour(1)
            } else {
                setHour(hour+1)
            }
        } else {
            if (hour === 1) {
                setHour(12)
            } else {
                setHour(hour-1)
            }
        }

        if (hour < 10) {
            _setHour('0' + hour)
        } else {
            _setHour(hour)
        }
    }

    const changeMinute = (isUp) => {
        if (isUp) {
            if (minute === 55) {
                setMinute(0)
            } else {
                setMinute(minute+=5)
            }
        } else {
            if (minute ===  0) {
                setMinute(55)
            } else {
                setMinute(minute-=5)
            }
        }

        if (minute < 10) {
            _setMinute('0' + minute)
        } else {
            _setMinute(minute)
        }
    }

    const clickedAM = () => {
        setIsAM(true)
        setAMPM('오전')
    }

    const clickedPM = () => {
        setIsAM(false)
        setAMPM('오후')
    }
    return (
        <View style={styles.container}>
            {/* 오전, 오후 */}
            <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => clickedAM()}>
                    <Text style={ isAM ? styles.ampmText : styles.noneAmpmText }>오전</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => clickedPM()}>
                    <Text style={ isAM ? styles.noneAmpmText : styles.ampmText }>오후</Text>
                </TouchableOpacity>
            </View>

            {/* 시간 */}
            <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => changeHour(true)}>
                    <Image style={styles.icon} source={require('assets/img/up.png')} />
                </TouchableOpacity>

                <Text style={styles.timeText}>{hour}</Text>

                <TouchableOpacity onPress={() => changeHour(false)}>
                    <Image style={styles.icon} source={require('assets/img/down.png')} />
                </TouchableOpacity>
            </View>

            <Text style={styles.timeText}>:</Text>

            {/* 분 */}
            <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => changeMinute(true)}>
                    <Image style={styles.icon} source={require('assets/img/up.png')} />
                </TouchableOpacity>

                <Text style={styles.timeText}>{minute}</Text>
                
                <TouchableOpacity onPress={() => changeMinute(false)}>
                    <Image style={styles.icon} source={require('assets/img/down.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const NoneSelected = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.noneAmpmText}>오전</Text>
                <Text style={styles.noneAmpmText}>오후</Text>
            </View>
            <Text style={styles.noneTimeText}>00:00</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#F6F6F6',
        borderWidth: 2,
        borderColor: '#F6F6F6',
        borderRadius: 15,
        padding: 25,
    },
    itemContainer: {
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 50,
        height: 50,
    },
    ampmText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
        color: '#1A1A1A',
        marginVertical: 10,
    },
    noneAmpmText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
        color: '#ACACA9',
        marginVertical: 10,
    },
    timeText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 60,
        color: '#1A1A1A',
    },
    noneTimeText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 60,
        color: '#ACACA9',
        marginLeft: 50,
    },
})

export { TimePicker, NoneSelected }