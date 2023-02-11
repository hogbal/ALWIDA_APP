import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'

import { RecoilRoot } from 'recoil'
import { NavigationContainer } from '@react-navigation/native'

import { StackLoginNav, StackPermissonNav, StackNav } from 'navigation/StackNav'
import { check, PERMISSIONS, RESULTS } from "react-native-permissions"

import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
    const [checkLogin, setCheckLogin] = useState(false)
    const [checkPermisson, setCheckPermisson] = useState(false)

    const loginCheck = async () => {
        const keep = await AsyncStorage.getItem('loginKeep')
        if (keep == "true") {
            const id = await AsyncStorage.getItem('id')

            if (id !== null) {
                setCheckLogin(true)
            }
            else {
                setCheckLogin(false)
            }   
        }
        else {
            setCheckLogin(false)
        }
    }

    const permissionCheck = async () => {
        if(Platform.OS !== "ios" && Platform.OS !== "android") return
        const platformPermissions = Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        
        check(platformPermissions).then((statuses) => {
            if(statuses == RESULTS.GRANTED) {
                setCheckPermisson(true)
            }
            else {
                setCheckPermisson(false)
            }
        })
    }

    useEffect(() => {
        loginCheck()
        permissionCheck()
        setTimeout(() => {
            SplashScreen.hide()
        }, 1000)
    }, [])

    return (
        <RecoilRoot>
            <NavigationContainer>
                {
                    checkPermisson == true
                    ? checkLogin == false ? <StackNav /> : <StackLoginNav onCheck={setCheckLogin} />
                    : <StackPermissonNav />
                }
            </NavigationContainer>
        </RecoilRoot>
    )
}

export default App