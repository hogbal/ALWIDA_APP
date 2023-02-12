import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { useRecoilState } from 'recoil'

import { signUpInfo } from 'hooks/Atoms'
import { ActiveButton, InactiveButton } from 'components/CustomButton'
import { createPOSTObject } from 'api/API'
import { Font } from 'api/Font'

const SignUp = ({ navigation }) => {
    const [id, onChangeId] = useState("")
    const [idCheck, setIDCheck] = useState("")
    const [agreeCheck, setAgreeCheck] = useState(false)
    const [pw, onChangePw] = useState("")
    const [rePw, onChangeRePw] = useState("")
    const [phoneNum, onChangePhoneNum] = useState("")
    const [certificationNum, onChangeCertificationNum] = useState("")
    const [certificationChecked, setCertificationChecked] = useState(false)
    const [checked, setChecked] = useState(false)
    const [userInfo, setUserInfo] = useRecoilState(signUpInfo)

    const userInfoSubmit = () => {
        let userInfoTemp = {...userInfo}
        userInfoTemp["id"] = id
        userInfoTemp["pw"] = pw
        userInfoTemp["agreeCheck"] = 'True'
        setUserInfo(userInfoTemp)
    }

    useEffect(() => {
        userInfoSubmit()
        if (id === "") {
            setIDCheck("")
        }
    }, [id, pw])

    useEffect(() => {
        // 비밀번호 재입력 시 리렌더링
    }, [rePw])

    const isExistID = async () => {
        let formdata = new FormData()
        formdata.append("id", userInfo?.id)
        await createPOSTObject('signup/id', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.result === true) {
                setIDCheck('사용가능한 아이디입니다')
            } else if (data.result === false) {
                setIDCheck('이미 사용중인 아이디입니다.')
            }
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const signUpOnClick = async () => {
        let formdata = new FormData()
        formdata.append("address", userInfo?.address)
        formdata.append("agreeCheck", userInfo?.agreeCheck)
        formdata.append("carNum", userInfo?.carNum)
        formdata.append("id", userInfo?.id)
        formdata.append("name", userInfo?.name)
        formdata.append("phoneNum", userInfo?.phoneNum)
        formdata.append("pw", userInfo?.pw)
        await createPOSTObject('signup', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.result === true) {
                Alert.alert('회원가입이 완료되었습니다.')
                navigation.navigate('Login')
            } else if (data.result === false) {
                Alert.alert('회원가입에 실패하였습니다.')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.text}>기본 정보</Text>
                    <View style={styles.id}>
                        <TextInput
                            style={idCheck === '이미 사용중인 아이디입니다.' && id !== "" ? styles.redInput : styles.inputBtn}
                            placeholder='아이디를 입력해주세요'
                            placeholderTextColor="#E0E0E0"
                            onChangeText={text => onChangeId(text)}
                            value={id}
                            autoCapitalize='none'
                        />
                        {
                            (id != "")
                            ?
                            <TouchableOpacity
                                style={styles.smallButton}
                                onPress={() => isExistID()}
                            >
                                <Text style={styles.smallButtonText}>중복 확인</Text>
                            </TouchableOpacity>
                            :
                            <View
                                style={styles.inActiveSmallButton}
                            >
                                <Text style={styles.inActiveSmallText}>중복 확인</Text>
                            </View>
                        }
                    </View>
                    <Text style={idCheck === '사용가능한 아이디입니다' ? styles.inputText : styles.redInputText}>{idCheck}</Text>
                    <Text style={styles.text}>비밀번호</Text>
                    <View style={styles.pw}>
                        <TextInput
                            style={styles.pwInput}
                            placeholder='비밀번호 입력해주세요.'
                            placeholderTextColor="#E0E0E0"
                            onChangeText={onChangePw}
                            value={pw}
                            secureTextEntry
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                this.reInput.focus()
                            }}
                            bulrOnSubmit={false}
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={pw !== rePw && rePw !== "" ? styles.redPwInput : styles.pwInput}
                            placeholder='비밀번호 재입력해주세요.'
                            placeholderTextColor="#E0E0E0"
                            onChangeText={onChangeRePw}
                            secureTextEntry
                            value={rePw}
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                this.phoneNumInput.focus()
                            }}
                            bulrOnSubmit={false}
                            ref={(input) => {
                                this.reInput = input
                            }}
                            autoCapitalize='none'
                        />
                    </View>
                    {
                        pw !== rePw && rePw !== "" &&
                        <Text style={styles.redInputText}>비밀번호가 일치하지 않습니다.</Text>
                    }
                    <Text style={styles.text}>인증</Text>
                    <View style={styles.auth}>
                        <View style={styles.authPhone}>
                            <TextInput
                                style={styles.inputBtn}
                                placeholder='휴대폰 번호'
                                placeholderTextColor="#E0E0E0"
                                onChangeText={onChangePhoneNum}
                                value={phoneNum}
                                keyboardType='numeric'
                                ref={(input) => {
                                    this.phoneNumInput = input
                                }}
                            />
                            {
                                (phoneNum != "")
                                ?
                                <TouchableOpacity
                                    style={styles.smallButton}
                                    onPress={() => null}
                                >
                                <Text style={styles.smallButtonText}>전송</Text>
                                </TouchableOpacity>
                                :
                                <View
                                    style={styles.inActiveSmallButton}
                                >
                                    <Text style={styles.inActiveSmallText}>전송</Text>
                                </View>
                            }
                        </View>
                        <View style={styles.authNum}>
                            <TextInput
                                style={styles.inputBtn}
                                placeholder='인증 번호'
                                placeholderTextColor="#E0E0E0"
                                onChangeText={onChangeCertificationNum}
                                value={certificationNum}
                                keyboardType='numeric'
                            />
                            {
                                (certificationNum != "")
                                ?
                                <TouchableOpacity
                                    style={styles.smallButton}
                                    onPress={() => setCertificationChecked(!certificationChecked)}
                                >
                                    <Text style={styles.smallButtonText}>확인</Text>
                                </TouchableOpacity>
                                :
                                <View
                                    style={styles.inActiveSmallButton}
                                >
                                    <Text style={styles.inActiveSmallText}>확인</Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={styles.agree}>
                        <TouchableOpacity
                            style={{flexDirection: 'row', alignItems: 'center'}}
                            onPress={() => {
                                setAgreeCheck(!agreeCheck)
                            }}
                        >
                            <Image
                                source={
                                    agreeCheck
                                    ? require('assets/img/login_check.png')
                                    : require('assets/img/login_none_check.png')
                                }
                            />
                            <Text style={styles.agreeText}>가입약관에 동의합니다.</Text>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity
                                style={styles.touchableText}
                                onPress={() => null}
                            >
                            <Text style={styles.modalText}>내용보기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.button}>
                        {
                            // phoneNum != null && certificationNum != null &&
                            (idCheck === '사용가능한 아이디입니다' && pw != null && rePw != null && pw == rePw && agreeCheck)
                            ?
                            <ActiveButton
                                onpress={() => {
                                    userInfoSubmit()
                                    signUpOnClick()
                                }}
                                text='가입 완료'
                            />
                            : <InactiveButton text='가입 완료' />
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
    id: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pw: {
        alignItems: 'center'
    },
    auth: {
        alignItems: 'center'
    },
    authPhone: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authNum: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    agree: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: "3%",
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes20,
        marginLeft: "5%",
        marginTop: "5%",
        marginBottom: "1%",
        color: '#000000',
    },
    inputBtn: {
        width: "65%",
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DCDEE6',
        marginLeft: "5%",

    },
    redInput: {
        width: "65%",
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F63232',
        backgroundColor: '#FFF1F1',
        marginLeft: "5%",
    },
    inputText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes10,
        color: '#ABABA8',
        paddingLeft: '5%'
    },
    redInputText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes10,
        color: '#F63232',
        paddingLeft: '5%'
    },
    smallButton: {
        flex: 1,
        backgroundColor: '#00A8FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: '2%',
        padding: '3%'
    },
    smallButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes14,
        color: '#FFFFFF',
        padding: '3%',
    },
    inActiveSmallButton: {
        flex: 1,
        backgroundColor: '#E9EBEC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: '2%',
        padding: '3%'
    },
    inActiveSmallText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes14,
        color: '#ACACA9',
        padding: '3%'
    },
    pwInput: {
        width: '90%',
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DCDEE6',
        marginVertical: "1%",
    },
    redPwInput: {
        width: '90%',
        fontFamily: 'Pretendard-Medium',
        backgroundColor: '#FFF1F1',
        fontSize: Font.fontSizes.fontSizes14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F63232',
        marginVertical: "1%",
    },
    modalText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes12,
        color: '#00A8FF',
        textDecorationLine: 'underline'
    },
})

export default SignUp