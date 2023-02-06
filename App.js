import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

import { RecoilRoot } from 'recoil'
import { NavigationContainer } from '@react-navigation/native'

import StackNav from 'navigation/StackNav'

const App = () => {

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
    }, [])

    return (
        <RecoilRoot>
            <NavigationContainer>
                <StackNav />
            </NavigationContainer>
        </RecoilRoot>
    )
}

export default App