import * as React from 'react';
import {View, Text, Animated, StyleSheet, Dimensions} from 'react-native';
import {Font} from 'api/Font';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const Donut = ({
  percentage = 0,
  radius = Dimensions.get('window').width / 3,
  strokeWidth = radius / 10,
  color,
}) => {
  return (
    <AnimatedCircularProgress
      size={radius * 2}
      width={strokeWidth}
      fill={percentage}
      rotation={215}
      arcSweepAngle={290}
      backgroundColor="#ECECEC"
      tintColor={color}
      lineCap="round">
      {percentage => <Text style={styles.text}>{parseInt(percentage)}대</Text>}
    </AnimatedCircularProgress>
  );
};

const styles = StyleSheet.create({
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numText: {
    position: 'absolute',
    fontFamily: 'Pretendard-Medium',
    fontSize: Font.fontSizes.fontSizes50,
    color: '#1A1A1A',
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    fontSize: Font.fontSizes.fontSizes32,
    color: '#1A1A1A',
  },
});

export default Donut;
