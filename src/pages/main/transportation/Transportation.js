import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
    SafeAreaView,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import BottomSheet from '@gorhom/bottom-sheet'

import { createPOSTObject } from 'api/API'
import CustomModal from 'components/CustomModal'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Geolocation from 'react-native-geolocation-service';
import { err } from 'react-native-svg/lib/typescript/xml'

const Transportation = ({ navigation }) => {
    const [info, setInfo] = useState('')
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [day, setDay] = useState()
    const [reservationModalVisible, setReservationModalVisible] = useState(false)
    const [departModalVisible, setDepartModalVisible] = useState(false)
    const [gateModalVisible, setGateModalVisible] = useState(false)
    const [bubbles, setBubbles] = useState([])

    const [distance, setDistance] = useState(0)
    const [userLocation, setUserLocation] = useState({'latitude':0,'longitude':0})
    const [terminalLatitude, setTerminalLatitude] = useState(0)
    const [terminalLongitude, setTerminalLongitude] = useState(0)

    let _watchId

    useEffect(() => {
        let date = new Date()
        setYear(date.getFullYear())
        setMonth(date.getMonth() + 1)
        setDay(date.getDate())

        getID(loadData)
        getID(coordinate)
        getID(loadChat)

        return () => {
            if (_watchId) {
                console.log("clearWatch")
                Geolocation.clearWatch(_watchId);
            }
          };
    }, [])

    useEffect(() => {
        if(userLocation.latitude != 0 && userLocation.longitude != 0 && terminalLatitude != 0 && terminalLongitude != 0) {
            getDistance(userLocation.latitude, userLocation.longitude)
            .then((dist) => {
                console.log('Distance : ',dist)
                setDistance(dist)
        })
        }
    }, [userLocation])

    useEffect(() => {
        if(distance != 0) {
            if(distance <= 15000) {
                console.log(distance)
            }
            else if(distance <= 10000) {
                console.log(distance)
            }
            else if(distance <= 5000) {
                console.log(distance)
            }
        }
    }, [distance])

    const getDistance = async (userLatitude, userLongitude) => {
        if ((userLatitude == terminalLatitude) && (userLongitude == terminalLongitude))
            return 0;
    
        var raduserLatitude = Math.PI * userLatitude / 180;
        var radterminalLatitude = Math.PI * terminalLatitude / 180;
        var theta = userLongitude - terminalLongitude;
        var radTheta = Math.PI * theta / 180;
        var dist = Math.sin(raduserLatitude) * Math.sin(radterminalLatitude) + Math.cos(raduserLatitude) * Math.cos(radterminalLatitude) * Math.cos(radTheta);
        if (dist > 1)
            dist = 1;
    
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515 * 1.609344 * 1000;
        if (dist < 100) dist = Math.round(dist / 10) * 10;
        else dist = Math.round(dist / 100) * 100;
    
        return dist
    }

    // id 불러오기
    const getID = async ( func ) => {
        try {
            const value = await AsyncStorage.getItem('id')
            if (value !== null) {
                return func(value)
            }
        } catch (e) {
            console.error(e)
        }
    }

    // 터미널 기본 정보 불러오기
    const loadData = async (id) => {
        let formdata = new FormData()
        formdata.append('id', id)
        await createPOSTObject('msg/info', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setInfo(data)
        })
        .catch((err) => console.log(err))
    }

    const loadChat = async (id) => {
        let formdata = new FormData()
        formdata.append('id', id)
        await createPOSTObject('msg/all', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setBubbles(data)
        })
    }
    
    // 목적지 혼잡도 불러오기
    const loadCongestion = async (id) => {
        let date = new Date()
        let hour = date.getHours()
        let min = date.getMinutes()
        let formdata = new FormData()
        formdata.append('id', id)
        await createPOSTObject('msg/congestion', formdata)
        .then((response) => {
            addBubble('right', '목적지 혼잡도를 알려주세요.', hour, min)
            return response.json()
        })
        .then((data) => {
            addBubble('left', data.description, data.hour, data.min)
        })
        .catch((err) => console.log(err))
    }

    // 부두 내 차량 대수 불러오기
    const loadNumOfCar = async (id) => {
        let date = new Date()
        let hour = date.getHours()
        let min = date.getMinutes()
        let formdata = new FormData()
        formdata.append('id', id)
        await createPOSTObject('msg/numOfCar', formdata)
        .then((response) => {
            addBubble('right', '부두 내 차량 대수를 알려주세요.', hour, min)
            return response.json()
        })
        .then((data) => {
            addBubble('left', data.description, data.hour, data.min)
        })
        .catch((err) => console.log(err))
    }

    // 예약 변경
    const resChange = async (id) => {
        let date = new Date()
        let hour = date.getHours()
        let min = date.getMinutes()
        let formdata = new FormData()
        formdata.append('id', id)
        await createPOSTObject('msg/resChange', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            navigation.navigate('ChangeReservation')
        })
        .catch((err) => console.error(err))
    }

    // 출발 취소
    const departCancle = async (id) => {
        let date = new Date()
        let hour = date.getHours()
        let min = date.getMinutes()
        let formdata = new FormData()
        formdata.append('id', id)
        await createPOSTObject('msg/departCancle', formdata)
        .then((response) => {
            addBubble('right', '출발취소 요청', hour, min)
            return response.json()
        })
        .then((data) => {
            if (data.result === true) {
                addBubble('left', '출발취소 승인완료', hour, min)
            }
        })
        .catch((err) => console.error(err))
    }

    // 게이트 진입요청
    const entryRequest = async (id) => {
        let date = new Date()
        let hour = date.getHours()
        let min = date.getMinutes()
        let formdata = new FormData()
        formdata.append('id', id)
        await createPOSTObject('msg/entryRequest', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if(_watchId) {
                console.log("clearWatch")
                Geolocation.clearWatch(_watchId);
            }
            addBubble('right', '게이트 진입요청', hour, min)
            if (data.result === true) {
                addBubble('left', '게이트 진입 요청 완료', hour, min)
            }
        })
        .catch((err) => console.error(err))
    }

    // 경도위도
    const coordinate = async (id) => {
        let formdata = new FormData()
        formdata.append('id', id)
        await createPOSTObject('msg/coordinate', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setTerminalLatitude(data.latitude)
            setTerminalLongitude(data.longitude)
            _watchId = Geolocation.watchPosition(position => {
                setUserLocation({'latitude':position.coords.latitude, 'longitude':position.coords.longitude})
            })
        })
    }

    const addBubble = (position, text, hour, min) => {
        let newBubble = {
            "position": position,
            "text": text,
            "hour": hour,
            "min": min,
        }

        setBubbles(bubbles => [...bubbles, newBubble])
    }

    const LeftBubble = ({text, hour, min}) => {
        return (
            <View style={styles.leftBubbleContainer}>
                <View style={styles.answerContainer}>
                    <Text style={styles.talkText}>{text}</Text>
                </View>
                <Text style={styles.timeText}>{hour}:{min}</Text>
            </View>
        )
    }

    const RightBubble = ({text, hour, min}) => {
        return (
            <View style={styles.rightBubbleContainer}>
                <Text style={styles.timeText}>{hour}:{min}</Text>
                <View style={styles.answerContainer}>
                    <Text style={styles.talkText}>{text}</Text>
                </View>
            </View>
        )
    }
    
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['3%', '15%', '35%'], []);
  
    // // callbacks
    // const handleSheetChanges = useCallback((index) => {
    //   console.log('handleSheetChanges', index);
    // }, []);

    return (
        <GestureHandlerRootView style={{flex:1}}>
            <SafeAreaView style={styles.container}>
                <View style={styles.info}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.back}
                            onPress={() => navigation.navigate('Main')}
                        >
                            <Image
                                source={require('assets/img/back_icon.png')}
                            />
                        </TouchableOpacity>
                        <View style={styles.box}>
                            <Image
                                    source={require('assets/img/transportation_header_box.png')}
                            />
                        </View>
                        <View style={styles.headerText}>
                            <Text style={styles.headerTitleText}>{info.terminalName}</Text>
                            <Text style={styles.headerDescriptionText}>[{info.terminalAbb}] {info.scale} {info.deviceLocation}</Text>
                        </View>
                    </View>
                    <View style={styles.subHeader}>
                        <Image
                            style={styles.icon}
                            source={require('assets/img/transportation_icon.png')}
                        />
                        <Text style={styles.subHeaderText}>{info.containerNum}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setReservationModalVisible(!reservationModalVisible)}
                        >
                            <Text style={styles.buttonText}>예약변경</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setDepartModalVisible(!departModalVisible)}
                        >
                            <Text style={styles.buttonText}>출발취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setGateModalVisible(!gateModalVisible)}
                        >
                            <Text style={styles.buttonText}>게이트 진입요청</Text>
                        </TouchableOpacity>
                        <CustomModal title='예약변경' description='예약변경을 하시겠습니까?' modalVisible={reservationModalVisible} setModalVisible={setReservationModalVisible} onpress={resChange}/>
                        <CustomModal title='출발취소' description='출발취소를 하시겠습니까?' modalVisible={departModalVisible} setModalVisible={setDepartModalVisible} onpress={departCancle} />
                        <CustomModal title='게이트 진입요청' description='게이트 진입요청을 하시겠습니까?' modalVisible={gateModalVisible} setModalVisible={setGateModalVisible} onpress={entryRequest} />
                    </View>
                    <View style={styles.possibleContainer}>
                        <Text style={styles.possibleText}>반출입 가능</Text>
                    </View>
                    <ScrollView style={styles.talkContainer}>
                        <View style={styles.talkText}>
                            <Text style={styles.dateText}>{year}년 {month}월 {day}일</Text>
                        </View>
                        <View style={styles.chat}>
                            {
                                bubbles.map((bubble, index) => {
                                    if(bubble.position == "left"){
                                        return (
                                            <LeftBubble key={index} text={bubble.text} hour={bubble.hour} min={bubble.min} />
                                        )
                                    }
                                    else {
                                        return (
                                            <RightBubble key={index} text={bubble.text} hour={bubble.hour} min={bubble.min} />
                                        )
                                    }
                                })
                            }
                        </View>
                    </ScrollView>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={1}
                        snapPoints={snapPoints}
                        // onChange={handleSheetChanges}
                        detached
                        enableOverDrag
                        backgroundStyle={styles.bottomBackground}
                    >
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity
                                style={styles.bottomItemContainer}
                                onPress={() => getID(loadCongestion)}
                            >
                                <Text style={styles.bottomText}>목적지 혼잡도를 알려주세요.</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.bottomItemContainer}
                                onPress={() => getID(loadNumOfCar)}
                            >
                                <Text style={styles.bottomText}>부두 내 차량 대수를 알려주세요.</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheet>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#E9EBEC',
    },
    back: {
        paddingLeft: '3%'
    },
    box: {
        paddingLeft: '2%'
    },
    subHeader: {
        marginTop: '3%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    possibleContainer: {
        marginLeft: '2%'
    },
    talkContainer: {
        flex: 1,
        backgroundColor: '#ACACA9',
    },
    headerText: {
        flexDirection: 'column',
        paddingLeft: '3%'
    },
    boxText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
        color: '#FFFFFF',
    },
    headerTitleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
        color: '#000000',
    },
    headerDescriptionText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 13,
        color: '#000000',
    },
    subHeaderText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
        color: '#000000',
    },
    icon: {
        marginLeft: '15%',
        marginRight: '3%'
    },
    button: {
        flex: 1,
        margin: "2%",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#707070',
        borderRadius: 8,
        padding : '4%'
    },
    possibleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#000000',
    },
    talkText: {
        alignItems: 'center'
    },
    chat: {
        flexDirection: 'column'
    },
    timeText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 10,
        color: '#000000',
        marginHorizontal: '2%',
    },
    dateText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 10,
        color: '#000000',
        marginTop: '2%'
    },
    answerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
    },
    questionContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
    },
    leftBubbleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: '2%',
    },
    rightBubbleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: '2%',
        alignSelf: 'flex-end'
    },
    talkContainer: {
        flex: 1,
        backgroundColor: '#ACACA9',
    },
    bottomBackground: {
        backgroundColor: '#E9EBEC',
    },
    bottomContainer: {
        flex: 1,
    },
    bottomItemContainer: {
        marginLeft: '5%',
        marginVertical: '2%'
    },
})

export default Transportation