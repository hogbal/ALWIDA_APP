import React, { useState, useEffect,  } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    BackHandler,
    StyleSheet,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createPOSTObject } from 'api/API'

// 메인
import Main from 'pages/main/Main'

// 메인 - drawar navigator
import VehicleRegistration from 'pages/main/drawerNav/vehicleRegistration/VehicleRegistration'
import CashReceiptHistory from 'pages/main/drawerNav/cashReceiptHistory/CashReceiptHistory'
import InspectionHistory from 'pages/main/drawerNav/inspectionHistory/InspectionHistory'

const Drawer = createDrawerNavigator()

const DrawerNav = () => {
    const [name, setName] = useState('') 

    const dataLoading = async (id) => {
        let formdata = new FormData()
        formdata.append('id', id)
        await createPOSTObject('main/name', formdata)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setName(data.name)
        })
        .catch((err) => console.error(err))
    }

    const getID = async () => {
        try {
            const value = await AsyncStorage.getItem('id')
            if (value !== null) {
                return dataLoading(value)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getID()
    }, [])

    return (
        <Drawer.Navigator
            initialRouteName='Main'
            screenOptions={{
                drawerPosition: 'right',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'Pretendard-Medium',
                    fontSize: 20,
                    color: '#0C202B',
                },
                drawerStyle: {
                    width: '50%',
                },
            }}
            drawerContent={({ navigation }) => (
                <SafeAreaView style={styles.container}>
                    <View>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.icon} onPress={() => navigation.closeDrawer()}>
                                <Image source={require('assets/img/drawer_back.png')}/>
                            </TouchableOpacity>
                            <Text style={styles.text}>{name}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate('VehicleRegistration')}
                        >
                            <Text style={styles.text}>차량등록</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate('CashReceiptHistory')}
                        >
                            <Text style={styles.text}>현금수납 내역</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate('InspectionHistory')}
                        >
                            <Text style={styles.text}>검사내역</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1,}}></View>

                    <View style={{ margin: 20, }}>
                        <Text style={styles.coText}>(주)파인드이알</Text>
                    </View>
                </SafeAreaView>
            )}
        >
            <Drawer.Screen
                name='Main'
                component={Main}
                options={{
                    title: '홈',
                    headerShown: false,
                    drawerItemStyle: {
                        backgroundColor: '#E9EBEC'
                    }
                }}
            />
            <Drawer.Screen
                name='VehicleRegistration'
                component={VehicleRegistration}
                options={{
                    title: '차량관리',
                    headerLeft: () => null,
                }}
            />
            <Drawer.Screen
                name='CashReceiptHistory'
                component={CashReceiptHistory}
                options={{
                    title: '현금수납 내역',
                    headerTitle: '현금수납',
                    headerLeft: () => null,
                }}
            />
            <Drawer.Screen
                name='InspectionHistory'
                component={InspectionHistory}
                options={{
                    title: '검사내역',
                    headerLeft: () => null,
                }}
            />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#E9EBEC',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ACACA9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        left: 15,
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#1A1A1A',
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#ACACA9',
        padding: 15,
    },
    coText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 10,
        color: '#5A5A5A',
        alignSelf: 'center',
    },
})

export default DrawerNav