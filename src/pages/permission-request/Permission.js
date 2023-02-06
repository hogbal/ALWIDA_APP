import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'

import { ActiveButton } from 'components/CustomButton'
import PermissionModal from 'pages/permission-request/PermissionModal'

const Permission = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
        console.log(modalVisible)
    }

    return (
        <View style={styles.container}>

            {/* 로고 이미지 및 접근 권한 허용 텍스트 */}
            <View style={styles.imgContainer}>
                <View style={{flex: 3, justifyContent: 'flex-end', marginBottom: 20}}>
                    <Image
                        style={styles.img}
                        source={require('assets/img/logo.png')}
                    />
                </View>
                <View style={{flex: 1, alignItems: 'center', margin: 20}}>
                    <Text style={styles.imgText}>어플리케이션 사용을 위해</Text>
                    <Text style={styles.imgText}>다음 접근 권한을 허용해주세요.</Text>
                </View>
            </View>

            {/* 필요한 접근 권한 텍스트 */}
            <View style={styles.textContainer}>
                <View>
                    <View style={{ margin: 40, }}>
                        <Text style={styles.titleText}>위치 (선택)</Text>
                        <Text style={styles.descriptionText}>이 앱은 앱이 종료되었거나 사용 중이 아닐 때도 위치 데이터를 수집</Text>
                        <Text style={styles.descriptionText}>하여 다음 기능을 사용 설정합니다.</Text>
                        <Text style={styles.descriptionText}>• 운송 구간 통과 확인</Text>
                        <Text style={styles.descriptionText}>• 목적까지 남은 거리 및 시간 계산</Text>
                    </View>
                    <View style={{ margin: 40, marginTop: 20 }}>
                        <Text style={styles.titleText}>알림 (선택)</Text>
                        <Text style={styles.descriptionText}>푸시 알람 서비스를 제공하기 위해서 사용됩니다.</Text>
                    </View>
                </View>
            </View>

            {/* 확인 버튼 */}
            <View style={styles.buttonContainer}>
                <ActiveButton onpress={() => toggleModal()} text='확인' />
            </View>

            <PermissionModal navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    imgContainer: {
        flex: 6,
        borderBottomWidth: 1,
        borderColor: '#707070',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
        color: '#000000',
    },
    textContainer: {
        flex: 5,
        alignItems: 'center',
    },
    titleText: {
        fontFamily: 'Pretendard-Medium',
        color: '#000000',
        fontSize: 8,
        marginBottom: 5
    },
    descriptionText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 10,
        color: '#9D9D9D',
    },
    buttonContainer: {
        padding: 20,
    }
})

export default Permission