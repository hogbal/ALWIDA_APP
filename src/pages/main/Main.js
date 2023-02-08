import React from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

const Main = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {/* drawer navigator */}
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                >
                    <Image
                        style={styles.topButtonImg}
                        source={require('assets/img/main_right_top.png')}
                    />
                </TouchableOpacity>
            </View>

            {/* 로고 이미지 */}
            <View style={styles.imgContainer}>
                <Image
                    style={styles.logoImg}
                    source={require('assets/img/logo.png')}
                />
            </View>

            <View style={styles.buttonContainer}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {/* 목적지 */}
                    <TouchableOpacity
                        style={styles.touchableButtonContainer}
                        onPress={() => navigation.navigate('Destination')}
                    >
                        <Image
                            style={styles.buttonImg}
                            source={require('assets/img/main_destination_button.png')}
                        />
                        <Text style={styles.buttonText}>목적지</Text>
                    </TouchableOpacity>

                    {/* 인수도증 */}
                    <TouchableOpacity
                        style={styles.touchableButtonContainer}
                        onPress={() => navigation.navigate('DA')}
                    >
                        <Image
                            style={styles.buttonImg}
                            source={require('assets/img/main_da_button.png')}
                        />
                        <Text style={styles.buttonText}>인수도증</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {/* 운송현황 */}
                    <TouchableOpacity
                        style={styles.touchableButtonContainer}
                        onPress={() => navigation.navigate('Transportation')}
                    >
                        <Image
                            style={styles.buttonImg}
                            source={require('assets/img/main_transportation_button.png')}
                        />
                        <Text style={styles.buttonText}>운송현황</Text>
                    </TouchableOpacity>

                    {/* 검사 */}
                    <TouchableOpacity
                        style={styles.touchableButtonContainer}
                        onPress={() => navigation.navigate('Examination')}
                    >
                        <Image
                            style={styles.buttonImg}
                            source={require('assets/img/main_examination_button.png')}
                        />
                        <Text style={styles.buttonText}>검사</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.blankContainer}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: "3%",
        backgroundColor: '#FAFAFA',
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    topButtonImg: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    imgContainer: {
        flex: 3.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImg: {
        width: '50%',
        resizeMode: 'contain'
    },
    buttonContainer: {
        flex: 3,
        alignItems: 'center',
    },
    buttonImg: {
        width: '20%',
        resizeMode: 'contain',
        margin: 10
    },
    buttonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#5A5A5A',
    },
    touchableButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        borderColor: '#D8DDEA',
        borderRadius: 15,
        backgroundColor: '#FFFFFF'
    },
    blankContainer: {
        flex: 1.5,
    }
})

export default Main