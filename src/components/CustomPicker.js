import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Modal,
    SafeAreaView
} from 'react-native'

import { Font } from 'api/Font'
import { ScrollView } from 'react-native-gesture-handler'

const LocalPickerItem = ({ index, text, dataLength, setSelectedLocal, setSelectedTerminal, visible, setVisible, setPercentage, setColor, setStatus}) => {
    return (
        <TouchableOpacity
            style={ styles.itemContainer }
            onPress={() => {
                setSelectedLocal(text)
                setSelectedTerminal('터미널')
                setVisible(!visible)
                if(setPercentage !== null) {
                    setPercentage(0)
                    setColor('')
                    setStatus('')
                }
            }}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const TerminalPickerItem = ({ index, text, dataLength, setSelected, visible, setVisible, setCircle }) => {
    return (
        <TouchableOpacity
            style={ styles.itemContainer }
            onPress={() => {
                setSelected(text)
                setVisible(!visible)
                setCircle()
            }}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const LocalPicker = ({ DATA, localVisible, setLocalVisible, selectedLocal, setSelectedLocal, setSelectedTerminal, setPercentage=null, setColor=null, setStatus=null}) => {
    return (
        <TouchableOpacity
            style={ styles.container }
            onPress={() => setLocalVisible(!localVisible)}
        >
            <Text style={styles.text}>{selectedLocal}</Text>
            <Image
                style={styles.arrowImg}
                source={require('assets/img/picker_arrow.png')}
            />
            
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={localVisible}
                onRequestClose={() => setLocalVisible(!localVisible)}
            >
                <SafeAreaView style={styles.modal}>
                    <ScrollView style={styles.modalScroll}>
                        {
                            localVisible &&
                            DATA.map((value, index) => {
                                return (
                                    <LocalPickerItem 
                                        key={value.index} 
                                        index={index} 
                                        text={value.local} 
                                        dataLength={DATA.length} 
                                        setSelectedLocal={setSelectedLocal} 
                                        setSelectedTerminal={setSelectedTerminal}
                                        visible={localVisible} 
                                        setVisible={setLocalVisible} 
                                        setPercentage={setPercentage}
                                        setColor={setColor}
                                        setStatus={setStatus}
                                    />
                                )
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </TouchableOpacity>
    )
}

const TerminalPicker = ({ DATA, terminalVisible, setTerminalVisible, selectedTerminal, setSelectedTerminal, selectedLocal, setPercentage=null, setColor=null, setStatus=null }) => {
    if (selectedLocal == '지역') {
        return (
            <View
                style={ styles.container }
                onPress={() => setTerminalVisible(!terminalVisible)}
            >
                <Image
                    style={styles.markerImg}
                    source={require('assets/img/picker_marker.png')}
                />
                <Text style={[styles.text, { color: '#B6B6B6', }]}>{selectedTerminal}</Text>
                <Image
                    style={styles.arrowImg}
                    source={require('assets/img/picker_arrow.png')}
                />
            </View>
        )
    }
    return (
        <TouchableOpacity
            style={ styles.container }
            onPress={() => setTerminalVisible(!terminalVisible)}
        >
            <Image
                style={styles.markerImg}
                source={require('assets/img/picker_marker.png')}
            />
            <Text style={styles.text}>{selectedTerminal}</Text>
            <Image
                style={styles.arrowImg}
                source={require('assets/img/picker_arrow.png')}
            />
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={terminalVisible}
                onRequestClose={() => setTerminalVisible(!terminalVisible)}
            >
                <SafeAreaView style={styles.modal}>
                    <ScrollView style={styles.modalScroll}>
                        {
                            terminalVisible &&
                            DATA.map((value, valueIndex) => {
                                if (value.local == selectedLocal) {
                                    return (
                                        value['terminals'].map((item, index) => {
                                            setCircle = () => {
                                                if (setPercentage !== null) {
                                                    setPercentage(item.percentage)
                                                    setColor(item.color)
                                                    setStatus(item.status)
                                                }
                                            }
                                            return (
                                                <TerminalPickerItem 
                                                    key={item.index} 
                                                    index={index} 
                                                    text={item.terminal} 
                                                    dataLength={value['terminals'].length} 
                                                    setSelected={setSelectedTerminal}
                                                    setCircle={setCircle}
                                                    visible={terminalVisible} setVisible={setTerminalVisible} 
                                                />
                                            )
                                        })
                                    )
                                }
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E3E6ED',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7%',
        margin: '3%',
        backgroundColor: '#FFFFFF',
    },
    itemContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#E3E6ED',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "7%",
        backgroundColor: '#FFFFFF',
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: Font.fontSizes.fontSizes20,
        color: '#1A1A1A',
    },
    arrowImg: {
        position: 'absolute',
        right: '5%',
    },
    markerImg: {
        position: 'absolute',
        left: '5%',
    },
    modal: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalScroll: {
        width:'95%'
    }
})

export { LocalPicker, TerminalPicker }