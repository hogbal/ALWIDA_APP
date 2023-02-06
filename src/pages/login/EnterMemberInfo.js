import React, { useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native'
import { useRecoilState } from 'recoil'

import { signUpInfo } from 'hooks/Atoms'
import { ActiveButton, InactiveButton } from 'components/CustomButton'

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
        <SafeAreaView style={styles.container}>
            {/* 기본 정보 */}
            <View>
                <Text style={styles.text}>기본 정보</Text>
                <TextInput
                    style={styles.input}
                    placeholder='이름을 입력해주세요'
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

            {/* 회원 구분 */}
            <View>
                <Text style={styles.text}>차량번호</Text>
                <TextInput
                    style={styles.input}
                    placeholder='차량번호를 입력해주세요'
                    onChangeText={text => onChangeCarNum(text)}
                    value={carNum}
                    ref={(input) => {
                        this.carNumInput = input
                    }}
                />
            </View>

            {/* blank view */}
            <View style={{ flex: 1, }}></View>

            {/* 버튼 */}
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        marginTop: 20,
        marginBottom: 5,
        color: '#000000',
    },
    input: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DCDEE6',
        marginVertical: 5,
        paddingHorizontal: 15,
    },
})

export default EnterMemberInfo