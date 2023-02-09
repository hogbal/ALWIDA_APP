import React from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CustomModal = ({ title, description, modalVisible, setModalVisible, onpress }) => {

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
                        <Text style={styles.titleText}>{title}</Text>
                        <Text style={styles.descriptionText}>{description}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                getID(onpress)
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Text style={styles.buttonText}>예</Text>
                        </TouchableOpacity>

                        {/* 버튼 테두리 */}
                        <View style={{borderRightWidth: 1, borderColor: '#707070',}}></View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.buttonText}>아니요</Text>
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
        padding: 30,
    },
    titleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
        color: '#000000',
        marginBottom: 20,
    },
    descriptionText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#000000',
    },
    buttonContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#707070',
    },
    button: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#00A8FF',
    },
})

export default CustomModal