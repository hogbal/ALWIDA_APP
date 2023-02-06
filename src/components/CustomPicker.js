import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
} from 'react-native'

const PickerItem = ({ index, text, dataLength, setSelected, visible, setVisible, onPress }) => {
    return (
        <TouchableOpacity
            style={
                dataLength == index + 1
                ? styles.lastItemContainer
                : styles.itemContainer
            }
            onPress={() => {
                setSelected(text)
                setVisible(!visible)
                onPress()
            }}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const LocalPicker = ({ DATA, localVisible, setLocalVisible, selectedLocal, setSelectedLocal }) => {
    return (
        <>
            <TouchableOpacity
                style={
                    localVisible == true
                    ? styles.visibleContainer
                    : [styles.container, { marginBottom: 40, }]
                }
                onPress={() => setLocalVisible(!localVisible)}
            >
                <Text style={styles.text}>{selectedLocal}</Text>
                <Image
                    style={styles.arrowImg}
                    source={require('assets/img/picker_arrow.png')}
                />
            </TouchableOpacity>
            {
                localVisible &&
                DATA.map((value, index) => {
                    onPress = () => {
                        console.log('local')
                    }
                    return (
                        <PickerItem key={value.index} index={index} text={value.local} dataLength={DATA.length} setSelected={setSelectedLocal} visible={localVisible} setVisible={setLocalVisible} onPress={onPress} />
                    )
                })
            }
        </>
    )
}

const TerminalPicker = ({ DATA, terminalVisible, setTerminalVisible, selectedTerminal, setSelectedTerminal, selectedLocal, setPercentage=null, setColor=null, setStatus=null }) => {
    if (selectedLocal == '지역') {
        return (
            <View
                style={
                    terminalVisible == true
                    ? styles.visibleContainer
                    : styles.container
                }
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
        <>
            <TouchableOpacity
                style={
                    terminalVisible == true
                    ? styles.visibleContainer
                    : styles.container
                }
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
            </TouchableOpacity>
            {
                terminalVisible &&
                DATA.map((value, valueIndex) => {
                    if (value.local == selectedLocal) {
                        return (
                            value['terminals'].map((item, index) => {
                                onPress = () => {
                                    if (setPercentage !== null) {
                                        setPercentage(item.percentage)
                                        setColor(item.color)
                                        setStatus(item.status)
                                    }
                                }
                                return (
                                    <PickerItem key={item.index} index={index} text={item.terminal} dataLength={value['terminals'].length} setSelected={setSelectedTerminal} visible={terminalVisible} setVisible={setTerminalVisible} onPress={onPress} />
                                )
                            })
                        )
                    }
                })
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E3E6ED',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 17,
        backgroundColor: '#FFFFFF',
    },
    visibleContainer: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E3E6ED',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 17,
        backgroundColor: '#FFFFFF',
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E3E6ED',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 17,
        backgroundColor: '#FFFFFF',
    },
    lastItemContainer: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E3E6ED',
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 17,
        marginBottom: 40,
        backgroundColor: '#FFFFFF',
    },
    text: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
        color: '#1A1A1A',
    },
    arrowImg: {
        position: 'absolute',
        right: '8%',
    },
    markerImg: {
        position: 'absolute',
        left: '10%',
    },
})

export { LocalPicker, TerminalPicker }