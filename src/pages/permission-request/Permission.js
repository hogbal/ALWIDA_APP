import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView
} from 'react-native'

import { ActiveButton } from 'components/CustomButton'
import PermissionModal from 'pages/permission-request/PermissionModal'

const Permission = ({ navigation, props }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.info}>
                <Image
                    style={styles.img}
                    source={require('assets/img/logo.png')}
                />
                <View style={styles.imgContainer}>
                    <Text style={styles.imgText}>어플리케이션 사용을 위해</Text>
                    <Text style={[styles.imgText,{marginBottom:'5%'}]}>다음 접근 권한을 허용해주세요.</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>위치 (선택)</Text>
                    <Text style={styles.descriptionText}>이 앱은 앱이 종료되었거나 사용 중이 아닐 때도 위치 데이터를 수집</Text>
                    <Text style={styles.descriptionText}>하여 다음 기능을 사용 설정합니다.</Text>
                    <Text style={styles.descriptionText}>• 운송 구간 통과 확인</Text>
                    <Text style={styles.descriptionText}>• 목적까지 남은 거리 및 시간 계산</Text>

                    <Text style={styles.titleText}>알림 (선택)</Text>
                    <Text style={styles.descriptionText}>푸시 알람 서비스를 제공하기 위해서 사용됩니다.</Text>
                </View>
            </View>
            <View style={styles.button}>
                <ActiveButton onpress={() => toggleModal()} text='확인' />
                <PermissionModal navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} props={props} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    img: {
        alignSelf:'center'
    },
    button: {
        justifyContent: 'flex-end'
    },
    imgContainer: {
        marginTop:'10%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#707070',
    },
    textContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center'
    },
    imgText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
        color: '#000000',
    },
    titleText: {
        marginTop: '10%',
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
})

// const styles = StyleSheet.create({
//     container: {
//         height: '100%',
//         backgroundColor: '#FFFFFF',
//     },
//     imgContainer: {
//         flex: 6,
//         borderBottomWidth: 1,
//         borderColor: '#707070',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
    // imgText: {
    //     fontFamily: 'Pretendard-Medium',
    //     fontSize: 20,
    //     color: '#000000',
    // },
//     textContainer: {
//         flex: 5,
//         alignItems: 'center',
//     },
    // titleText: {
    //     fontFamily: 'Pretendard-Medium',
    //     color: '#000000',
    //     fontSize: 8,
    //     marginBottom: 5
    // },
    // descriptionText: {
    //     fontFamily: 'Pretendard-Medium',
    //     fontSize: 10,
    //     color: '#9D9D9D',
    // },
//     buttonContainer: {
//         padding: 20,
//     }
// })

export default Permission