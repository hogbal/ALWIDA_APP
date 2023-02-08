import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ActiveButton, InactiveButton } from 'components/CustomButton'
import { createPOSTObject } from 'api/API'

const Login = ({ navigation }) => {
    const [pw, onChangePw] = useState("")
    const [id, onChangeId] = useState("")
    const [checked, setChecked] = useState(false)
    const [loginCheck, setLoginCheck] = useState(false)

    /** 로그인 유지하기 AsyncStorage */
    const storeKeep = async (value) => {
        const strCheck = value.toString()
        try {
            await AsyncStorage.setItem('loginKeep', strCheck)
        } catch (e) {
            console.error(e)
        }
    }

    const getKeep = async () => {
        try {
            const keep = await AsyncStorage.getItem('loginKeep')
            if (keep !== null) {
                setChecked(keep)
                return keep
            }
        } catch (e) {
            console.log(e)
        }
    }

    /** 아이디 저장 AsyncStorage */
    const storeID = async (value) => {
        try {
            await AsyncStorage.setItem('id', value)
        } catch (e) {
            console.error(e)
        }
    }

    const getID = async () => {
        try {
            const id = await AsyncStorage.getItem('id')
            if (id !== null) {
                return id
            }
        } catch (e) {
            console.error(e)
        }
    }

    /** 앱 실행 시 로그인 유지하기에 체크를 했을 경우 */
    useEffect(() => {
        console.log("App Start")
        const keep = getKeep()
        if (keep == 'true') {
            navigation.navigate("DrawerNav")
        }
    }, [])

    /** 로그인 버튼 클릭 함수 */
    const loginOnClick = async () => {
        let formdata = new FormData()
        formdata.append("id", id)
        formdata.append("pw", pw)
        await createPOSTObject('signin/', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.result) {
                storeID(id)
                storeKeep(checked)
                setLoginCheck(false)
                navigation.navigate("DrawerNav")
            } else {
                setLoginCheck(true)
            }
        })
        .catch(err => console.error(err))
    }

    // return (
    //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //         <SafeAreaView style={styles.container}>
    //             {/* 로고 이미지 */}
                // <View style={styles.imgContainer}>
                //     <Image source={require('assets/img/logo.png')} />
                // </View>
    //             {/* 아이디&비밀번호 입력 */}
    //             <View style={styles.inputContainer}>
    //                 <View style={styles.input}>
    //                     <Image source={require('assets/img/login_id.png')} />
    //                     <TextInput
    //                         style={styles.inputText}
    //                         placeholder="아이디"
    //                         placeholderTextColor="#E0E0E0"
    //                         onChangeText={onChangeId}
    //                         value={id}
    //                         returnKeyType='next'
    //                         onSubmitEditing={() => {
    //                             this.pwInput.focus()
    //                         }}
    //                         bulrOnSubmit={false}
    //                         autoCapitalize='none'
    //                     />
    //                 </View>
    //                 <View style={styles.input}>
    //                     <Image source={require('assets/img/login_pw.png')} />
    //                     <TextInput
    //                         style={styles.inputText}
    //                         placeholder="비밀번호"
    //                         placeholderTextColor="#E0E0E0"
    //                         onChangeText={onChangePw}
    //                         value={pw}
    //                         secureTextEntry={true}
    //                         ref={(input) => {
    //                             this.pwInput = input
    //                         }}
    //                         autoCapitalize='none'
    //                     />
    //                 </View>
    //                 {
    //                     id !== '' && pw !== '' && loginCheck &&
    //                     <Text style={styles.redInputText}>아이디 또는 비밀번호가 일치하지않습니다.</Text>
    //                 }
    //             </View>

    //             {/* 로그인 유지 체크박스 */}
    //             <TouchableOpacity
    //                 style={styles.checkContainer}
    //                 onPress={() => setChecked(!checked)}    
    //             >
    //                 <Image
    //                     style={styles.checkImg}
    //                     source={
    //                         checked
    //                         ? require('assets/img/login_check.png')
    //                         : require('assets/img/login_none_check.png')}
    //                 />
    //                 <Text style={styles.text}>로그인 유지하기</Text>
    //             </TouchableOpacity>

    //             {/* 로그인 버튼 */}
    //             {
    //                 (id !== '' && pw !== '')
    //                 ?
    //                 <ActiveButton
    //                     onpress={() => loginOnClick()}
    //                     text="로그인"
    //                 />
    //                 : <InactiveButton text='로그인' />
    //             }
    //             {/* 아이디&비밀번호 찾기 및 회원가입 */}
    //             <View style={styles.etcContainer}>
    //                     <TouchableOpacity
    //                         style={styles.touchableEtc}
    //                         onPress={() => null}
    //                     >
    //                         <Text style={styles.text}>아이디 찾기</Text>
    //                     </TouchableOpacity>
    //                     <Text style={styles.barText}> | </Text>
    //                     <TouchableOpacity
    //                         style={styles.touchableEtc}
    //                         onPress={() => null}
    //                     >
    //                         <Text style={styles.text}>비밀번호 찾기</Text>
    //                     </TouchableOpacity>
    //                     <Text style={styles.barText}> | </Text>
    //                     <TouchableOpacity
    //                         style={styles.touchableEtc}
    //                         onPress={() => navigation.navigate('EnterMemberInfo')}
    //                     >
    //                         <Text style={styles.text}>회원가입</Text>
    //                     </TouchableOpacity>
    //                 </View>
    //         </SafeAreaView>
    //     </TouchableWithoutFeedback>
    // )
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image source={require('assets/img/logo.png')} />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        marginVertical: "3%",
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    checkContainer: {
        flex:0.2,
        flexDirection: 'row',
        marginTop: "1%",
        marginBottom: "5%",
        alignItems: 'flex-start',
    },
    etcContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: "5%",
    },
    input: {
        width: "90%",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginTop: "3%",
        paddingHorizontal: "3%",
        paddingVertical: "3%",
    },
    inputText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
    },
    redInputText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 10,
        color: '#F63232',
    },
    checkImg: {
        marginLeft:"10%",
        marginRight: "2%",
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#000000',
    },
    barText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#EAEAEA',
        marginHorizontal: "3%",
    }
})

export default Login