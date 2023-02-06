import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

const ToastMessage = ({ description }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: 'gray',
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 12,
        color: '#FFF',
    }
})

export default ToastMessage