import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'

import { RecoilRoot } from 'recoil'
import { NavigationContainer } from '@react-navigation/native'

import { StackPermissonNav, StackNav } from 'navigation/StackNav'
import { check, PERMISSIONS, RESULTS } from "react-native-permissions"

const App = () => {
    const [checkPermisson, setCheckPermisson] = useState(false)

    const permissionCheck = async () => {
        if(Platform.OS !== "ios" && Platform.OS !== "android") return
        const platformPermissions = Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        
        check(platformPermissions).then((statuses) => {
            console.log(statuses)
            if(statuses == RESULTS.GRANTED) {
                setCheckPermisson(true)
            }
            else {
                setCheckPermisson(false)
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            permissionCheck()
            SplashScreen.hide()
        }, 1000)
    }, [])

    return (
        <RecoilRoot>
            <NavigationContainer>
                {
                    checkPermisson == true
                    ? <StackNav />
                    : <StackPermissonNav />
                }
            </NavigationContainer>
        </RecoilRoot>
    )
}

export default App