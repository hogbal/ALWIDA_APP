import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native'

import { createPOSTObject } from 'api/API'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Font } from 'api/Font'

const Item = ({ id, date, receiver, result }) => {
    let _date = date === null ? '-' : date
    return (
        <View style={
            (id % 2 == 0)
            ? styles.itmeEvenContainer
            : styles.itmeOddContainer
        }>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.itemText}>{_date}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.itemText}>{receiver}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text
                    style={
                        (result === '수납완료')
                        ? styles.itemConfirmResultText
                        : styles.itemUnconfirmResultText
                    }
                >{result}</Text>
            </View>
        </View>
    )
}


const CashReceiptHistory = () => {
    const [info, setInfo] = useState([])
    const [id, setID] = useState('')

    // id 불러오기
    const getID = async () => {
        try {
            const value = await AsyncStorage.getItem('id')
            if (value !== null) {
                return getInfo(value)
            }
        } catch (e) {
            console.error(e)
        }
    }

    // 현금수납 내역 정보 불러오기
    const getInfo = async (id) => {
        let formdata = new FormData()
        formdata.append("id", id)
        await createPOSTObject('main/cash', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setInfo(data)
        })
        .catch((err) => console.error(err))
    }

    // 페이지 실행 시 id 및 현금수납 내역 정보 불러오기
    useEffect(() => {
        getID()
    }, [])

    const renderItem = ({ item }) => (
        <Item ket={item.id} id={item.id} date={item.date} receiver={item.receiver} result={item.result} />
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.itmeEvenContainer}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.titleText}>일시</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.titleText}>수신자</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.titleText}>결과</Text>
                </View>
            </View>
            <FlatList
                data={info}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    itmeOddContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: '3%',
        backgroundColor: '#F9F9F9',
    },
    itmeEvenContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: '3%',
        backgroundColor: '#FFFFFF',
    },
    titleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes14,
        color: '#888888',
    },
    itemText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes14,
        color: '#1A1A1A',
    },
    itemConfirmResultText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes14,
        color: '#00A8FF',
    },
    itemUnconfirmResultText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes14,
        color: '#E85B5B',
    }
})

export default CashReceiptHistory