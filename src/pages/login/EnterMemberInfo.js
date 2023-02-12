import React, { useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { useRecoilState } from 'recoil'

import { signUpInfo } from 'hooks/Atoms'
import { ActiveButton, InactiveButton } from 'components/CustomButton'
import { Font } from 'api/Font'

const EnterMemberInfo = ({ navigation }) => {
    const [name, onChangeName] = useState("")
    const [phoneNum, onChangePhoneNum] = useState("")
    const [address, onChangeAddress] = useState("")
    const [carNum, onChangeCarNum] = useState("")
    const [userInfo, setUserInfo] = useRecoilState(signUpInfo)

    const userInfoSubmit = () => {
        let userInfoTemp = {...userInfo}
        userInfoTemp["name"] = name
        userInfoTemp["phoneNum"] = phoneNum
        userInfoTemp["address"] = address
        userInfoTemp["carNum"] = carNum
        setUserInfo(userInfoTemp)
    }
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.text}>기본 정보</Text>
                    <View style={styles.infoText}>
                        <TextInput
                            style={styles.input}
                            placeholder='이름을 입력해주세요'
                            placeholderTextColor="#E0E0E0"
                            onChangeText={text => onChangeName(text)}
                            value={name}
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                this.phoneNumInput.focus()
                            }}
                            bulrOnSubmit={false}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='휴대폰 번호를 입력해주세요'
                            placeholderTextColor="#E0E0E0"
                            onChangeText={text => onChangePhoneNum(text)}
                            value={phoneNum}
                            keyboardType='numeric'
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                this.addressInput.focus()
                            }}
                            bulrOnSubmit={false}
                            ref={(input) => {
                                this.phoneNumInput = input
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='주소를 입력해주세요'
                            placeholderTextColor="#E0E0E0"
                            onChangeText={text => onChangeAddress(text)}
                            value={address}
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                this.carNumInput.focus()
                            }}
                            bulrOnSubmit={false}
                            ref={(input) => {
                                this.addressInput = input
                            }}
                        />
                    </View>
                    <Text style={styles.text}>차량번호</Text>
                    <View style={styles.memberText}>
                        <TextInput
                            style={styles.input}
                            placeholder='차량번호를 입력해주세요'
                            placeholderTextColor="#E0E0E0"
                            onChangeText={text => onChangeCarNum(text)}
                            value={carNum}
                            ref={(input) => {
                                this.carNumInput = input
                            }}
                        />
                    </View>
                    <View style={styles.button}>
                        {
                            name != "" && phoneNum != "" && address != "" && carNum != ""
                            ?
                            <ActiveButton
                                onpress={() => {
                                    userInfoSubmit()
                                    navigation.navigate('SignUp')}
                                }
                                text='확인'
                            />
                            : <InactiveButton text='확인' />
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
        justifyContent: 'flex-start',
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes20,
        marginLeft: "5%",
        marginTop: "10%",
        marginBottom: "1%",
        color: '#000000',
    },
    infoText: {
        alignItems: 'center',
    },
    memberText: {
        alignItems: 'center',
    },
    input: {
        width: "90%",
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DCDEE6',
        margin: '1%',
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end'
    }
})
export default EnterMemberInfo