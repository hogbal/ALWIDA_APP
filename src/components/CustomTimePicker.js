import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Font} from 'api/Font';

const TimePicker = ({setAMPM, hour, setHour, minute, setMinute}) => {
  const [_hour, _setHour] = useState('01');
  const [_minute, _setMinute] = useState('00');

  const [isAM, setIsAM] = useState(true);

  const changeHour = isUp => {
    if (isUp) {
      if (hour === 12) {
        setHour(1);
      } else {
        setHour(hour + 1);
      }
    } else {
      if (hour === 1) {
        setHour(12);
      } else {
        setHour(hour - 1);
      }
    }

    if (hour < 10) {
      _setHour('0' + hour);
    } else {
      _setHour(hour);
    }
  };

  const changeMinute = isUp => {
    if (isUp) {
      if (minute === 55) {
        setMinute(0);
      } else {
        setMinute((minute += 5));
      }
    } else {
      if (minute === 0) {
        setMinute(55);
      } else {
        setMinute((minute -= 5));
      }
    }

    if (minute < 10) {
      _setMinute('0' + minute);
    } else {
      _setMinute(minute);
    }
  };

  const clickedAM = () => {
    setIsAM(true);
    setAMPM('오전');
  };

  const clickedPM = () => {
    setIsAM(false);
    setAMPM('오후');
  };

  return (
    <View style={styles.container}>
      <View style={styles.ampm}>
        <TouchableOpacity onPress={() => clickedAM()}>
          <Text style={isAM ? styles.ampmText : styles.noneAmpmText}>오전</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickedPM()}>
          <Text style={isAM ? styles.noneAmpmText : styles.ampmText}>오후</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.time}>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => changeHour(true)}>
            <Image style={styles.icon} source={require('assets/img/up.png')} />
          </TouchableOpacity>

          <Text style={styles.timeText}>{hour}</Text>

          <TouchableOpacity onPress={() => changeHour(false)}>
            <Image
              style={styles.icon}
              source={require('assets/img/down.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.timeText}>:</Text>

        {/* 분 */}
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => changeMinute(true)}>
            <Image style={styles.icon} source={require('assets/img/up.png')} />
          </TouchableOpacity>

          <Text style={styles.timeText}>{minute}</Text>

          <TouchableOpacity onPress={() => changeMinute(false)}>
            <Image
              style={styles.icon}
              source={require('assets/img/down.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const NoneSelected = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ampm}>
        <Text style={styles.noneAmpmText}>오전</Text>
        <Text style={styles.noneAmpmText}>오후</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.noneTimeText}>00:00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderWidth: 2,
    borderColor: '#F6F6F6',
    borderRadius: 15,
  },
  ampm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ampmText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: Font.fontSizes.fontSizes20,
    color: '#1A1A1A',
    marginVertical: '5%',
  },
  noneAmpmText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: Font.fontSizes.fontSizes20,
    color: '#ACACA9',
    marginVertical: '5%',
  },
  timeText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: Font.fontSizes.fontSizes60,
    color: '#1A1A1A',
  },
  noneTimeText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: Font.fontSizes.fontSizes60,
    color: '#ACACA9',
    marginLeft: '10%',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export {TimePicker, NoneSelected};
