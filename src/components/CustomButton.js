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
        width: '100%',
        backgroundColor: '#00A8FF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#FFFFFF',
        margin: 15,
    },
    inactiveButton: {
        width: '100%',
        backgroundColor: '#E9EBEC',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inactiveText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#ACACA9',
        margin: 15,
    },
})

export { ActiveButton, InactiveButton }