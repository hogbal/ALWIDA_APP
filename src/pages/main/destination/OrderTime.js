import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    StyleSheet,
    Alert
} from 'react-native'

import { useRecoilState } from 'recoil'

import { orderInfo } from 'hooks/Atoms'
import { createPOSTObject } from 'api/API'
import { LocalPicker, TerminalPicker } from 'components/CustomPicker'
import { ActiveButton, InactiveButton } from 'components/CustomButton'
import { TimePicker, NoneSelected } from 'components/CustomTimePicker'
import { Font } from 'api/Font'

const OrderTime = ({ navigation }) => {
    const [DATA, setData] = useState('')
    const [selectedLocal, setSelectedLocal] = useState('지역')
    const [selectedTerminal, setSelectedTerminal] = useState('터미널')
    const [localVisible, setLocalVisible] = useState(false)
    const [terminalVisible, setTerminalVisible] = useState(false)
    const [ampm, setAMPM] = useState('오전')
    const [hour, setHour] = useState(1)
    const [minute, setMinute] = useState(0)
	const [orderData, setOrderData] = useRecoilState(orderInfo)

    useEffect(() => {
        let orderDataTemp = {...orderData}
            orderDataTemp["local"] = selectedLocal
            orderDataTemp["terminal"] = selectedTerminal
            setOrderData(orderDataTemp)
    }, [selectedTerminal])

    /** 지역 및 터미널 피커 데이터 로딩 */
    const dataLoading = async () => {
        await createPOSTObject('dest')
        .then((response) => {
            return response.json()
        })
        .then((info) => {
            setData(info)
        })
        .catch((err) => console.log(err))
    }

    // POST 요청
    const onClickButton = async () => {
        let formdata = new FormData()
        formdata.append("id", orderData["id"])
        formdata.append("containerNum", orderData["containerNum"])
        formdata.append("location", selectedLocal)
        formdata.append("terminal", selectedTerminal)
        formdata.append("ampm", ampm)
        formdata.append("hour", hour)
        formdata.append("minute", minute)
        console.log(formdata)
        await createPOSTObject('dest/reservation', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.result === true) {
                console.log(data)
                navigation.navigate("DestLoading")
            }
            else {
                Alert.alert("예약된 운송작업이 있습니다.")
            }
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        dataLoading()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.info}>
                <LocalPicker 
                    DATA={DATA} 
                    localVisible={localVisible} 
                    setLocalVisible={setLocalVisible} 
                    selectedLocal={selectedLocal} 
                    setSelectedLocal={setSelectedLocal} 
                    setSelectedTerminal={setSelectedTerminal}
                />
                <TerminalPicker 
                    DATA={DATA} 
                    terminalVisible={terminalVisible} 
                    setTerminalVisible={setTerminalVisible} 
                    selectedTerminal={selectedTerminal} 
                    setSelectedTerminal={setSelectedTerminal} 
                    selectedLocal={selectedLocal}
                />
                <View style={styles.timeContainer}>
                    {
                        selectedTerminal == '터미널'
                        ? <NoneSelected />
                        : <TimePicker setAMPM={setAMPM} hour={hour} setHour={setHour} minute={minute} setMinute={setMinute} />
                    }
                </View>
                <View style={styles.button}>
                    {
                        selectedTerminal == '터미널'
                        ? <InactiveButton text='출발' />
                        : <ActiveButton onpress={() => onClickButton()} text='출발' />
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    info: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    timeContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        margin: '5%'
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
    }
})

export default OrderTime