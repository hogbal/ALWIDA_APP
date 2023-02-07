import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native'

const ActiveButton = ({ onpress, text }) => {
    return (
        <TouchableOpacity
            style={styles.activeButton}
            onPress={() => onpress()}
        >
            <Text style={styles.activeText}>{text}</Text>
        </TouchableOpacity>
    )
}

const InactiveButton = ({ text }) => {
    return (
        <View
            style={styles.inactiveButton}
        >
            <Text style={styles.inactiveText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    activeButton: {
        width: '90%',
        backgroundColor: '#00A8FF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3%',
    },
    activeText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#FFFFFF',
        margin: '4%',
    },
    inactiveButton: {
        width: '90%',
        backgroundColor: '#E9EBEC',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3%',
    },
    inactiveText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#ACACA9',
        margin: '4%',
    },
})

export { ActiveButton, InactiveButton }