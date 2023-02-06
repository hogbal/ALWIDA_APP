import React from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

const PermmisionModal = ({ navigation, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.contentsContainer}>
                        <Text style={styles.text}>운송 서비스를 이용하려면 위치 권한을 허용해야합니다.</Text>
                        <Text style={styles.descriptionText}>이 앱은 앱이 종료되었거나 사용 중이 아닐 때도 위치 데이터를 수집하여 운송</Text>
                        <Text style={styles.descriptionText}>구간 통과 확인, 목적지까지 남은 거리 및 시간 계산 기능을 사용 설정합니다.</Text>
                        <Text style={styles.descriptionText}></Text>
                        <Text style={styles.descriptionText}>요청 화면이 나타나면 앱 사용 중에만 허용 - 설정 페이지 - 항상 허용 설정해야</Text>
                        <Text style={styles.descriptionText}>합니다. 설정하지 않은 경우 운송 서비스가 제대로 작동하지 않을 수도 있습니다.</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setModalVisible(false)
                                navigation.navigate('Login')}
                            }
                        >
                            <Text style={styles.buttonText}>확인</Text>
                        </TouchableOpacity>

                        {/* 버튼 테두리 */}
                        <View style={{borderRightWidth: 1, borderColor: '#707070',}}></View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.buttonText}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(172, 172, 169, 0.26)',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        width: '90%',
        borderWidth: 1,
        borderColor: '#707070',
        borderRadius: 10,
    },
    contentsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        paddingHorizontal: 10,
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#000000',
        marginBottom: 20,
    },
    descriptionText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 10,
        color: '#000000',
    },
    buttonContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#707070',
    },
    button: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#000000',
    }
})

export default PermmisionModal