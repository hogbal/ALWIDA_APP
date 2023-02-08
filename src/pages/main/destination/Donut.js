import * as React from 'react'
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Dimensions
} from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'


const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const Donut = ({
    percentage = 0,
    radius = Dimensions.get('window').width/3,
    strokeWidth = radius/10,
    duration = 800,
    color,
    max = 100
}) => {
    const animatedValue = React.useRef(new Animated.Value(0)).current
    const circleRef = React.useRef()
    const halfCircle = radius + strokeWidth
    const circleCircumference = 2 * Math.PI * radius

    const animation = (toValue) => {
        return Animated.timing(animatedValue, {
            toValue,
            duration,
            delay: 500,
            useNativeDriver: true,
        }).start()
    }
    
    React.useEffect(() => {
        animation(percentage)
        
        animatedValue.addListener(v => {
            if (circleRef?.current) {
                const maxPerc = 100 * v.value / max
                const strokeDashoffset = circleCircumference - (circleCircumference * maxPerc) / 100
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                })
            }
        })
    })

    return (
        <View style={styles.circle}>
            <Svg
                width={radius * 2}
                height={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
                <G rotation={90} origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle
                        cx='50%'
                        cy='50%'
                        stroke={'#ECECEC'}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill='transparent'
                        strokeLinecap='round'
                    />
                    <AnimatedCircle
                        ref={circleRef}
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill='transparent'
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={circleCircumference}
                        strokeLinecap='round'
                    />
                </G>
            </Svg>
            <Text style={[styles.numText]}>
                {
                    percentage == 0 ? '00' : percentage
                }
                <Text style={styles.text}>대</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    numText: {
        position: 'absolute',
        fontFamily: 'Pretendard-Medium',
        fontSize: 50,
        color: '#1A1A1A'
    },
    text: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
        color: '#1A1A1A',
    },
})

export default Donut