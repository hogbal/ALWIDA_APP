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
    Keyboard,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ActiveButton, InactiveButton } from 'components/CustomButton'
import { createPOSTObject } from 'api/API'
import { Font } from 'api/Font'

const Login = ({ navigation , props }) => {
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

    /** 아이디 저장 AsyncStorage */
    const storeID = async (value) => {
        try {
            await AsyncStorage.setItem('id', value)
        } catch (e) {
            console.error(e)
        }
    }

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
                props.onChangeLoginCheck(true)
            } else {
                setLoginCheck(true)
            }
        })
        .catch(err => console.error(err))
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.login}>
                    <View style={styles.logoId}>
                        <Image source={require('assets/img/logo.png')} />
                        <View style={styles.input}>
                            <Image source={require('assets/img/login_id.png')} />
                            <TextInput
                                style={styles.inputText}
                                placeholder="아이디"
                                placeholderTextColor="#E0E0E0"
                                onChangeText={onChangeId}
                                value={id}
                                returnKeyType='next'
                                onSubmitEditing={() => {
                                    this.pwInput.focus()
                                }}
                                bulrOnSubmit={false}
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={styles.input}>
                            <Image source={require('assets/img/login_pw.png')} />
                            <TextInput
                                style={styles.inputText}
                                placeholder="비밀번호"
                                placeholderTextColor="#E0E0E0"
                                onChangeText={onChangePw}
                                value={pw}
                                secureTextEntry={true}
                                ref={(input) => {
                                    this.pwInput = input
                                }}
                                autoCapitalize='none'
                            />
                        </View>
                        {
                            id !== '' && pw !== '' && loginCheck &&
                            <Text style={styles.redInputText}>아이디 또는 비밀번호가 일치하지않습니다.</Text>
                        }
                    </View>
                    <TouchableOpacity
                        style={styles.check}
                        onPress={() => setChecked(!checked)}    
                    >
                        <Image
                            style={styles.checkImg}
                            source={
                                checked
                                ? require('assets/img/login_check.png')
                                : require('assets/img/login_none_check.png')}
                        />
                        <Text style={styles.text}>로그인 유지하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    {
                        (id !== '' && pw !== '')
                        ?
                        <ActiveButton
                            onpress={() => 
                                loginOnClick()
                            }
                            text="로그인"
                        />
                        : <InactiveButton text='로그인' />
                    }
                </View>
                <View style={styles.etc}>
                    <TouchableOpacity
                        style={styles.touchableEtc}
                        onPress={() => null}
                    >
                    <Text style={styles.text}>아이디 찾기</Text>
                    </TouchableOpacity>
                    <Text style={styles.barText}> | </Text>
                    <TouchableOpacity
                        style={styles.touchableEtc}
                        onPress={() => null}
                    >
                        <Text style={styles.text}>비밀번호 찾기</Text>
                    </TouchableOpacity>
                    <Text style={styles.barText}> | </Text>
                    <TouchableOpacity
                        style={styles.touchableEtc}
                        onPress={() => navigation.navigation.navigate('EnterMemberInfo')}
                    >
                        <Text style={styles.text}>회원가입</Text>
                    </TouchableOpacity>
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
    logoId: {
        alignItems: 'center',
    },
    check: {
        flexDirection: 'row',
        paddingVertical: "1%",
        alignItems: 'center'
    },
    button: {
        paddingTop: "5%"
    },
    etc: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        width: "90%",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginTop: "3%",
        paddingLeft: "3%"
    },
    inputText: {
        width: '90%',
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes20,
    },
    redInputText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes10,
        color: '#F63232',
    },
    checkImg: {
        marginLeft:"5%",
        marginRight: "2%",
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes12,
        color: '#000000',
    },
    barText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes16,
        color: '#EAEAEA',
        marginHorizontal: "3%",
    }
})

export default Login