import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ActiveButton, InactiveButton} from 'components/CustomButton';
import {LocalPicker, TerminalPicker} from 'components/CustomPicker';

import Donut from './Donut';
import {createPOSTObject} from 'api/API';
import {Font} from 'api/Font';

const Destination = ({navigation}) => {
  const [check, setCheck] = useState(false);
  const [DATA, setData] = useState();
  const [selectedLocal, setSelectedLocal] = useState('지역');
  const [selectedTerminal, setSelectedTerminal] = useState('터미널');
  const [localVisible, setLocalVisible] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [color, setColor] = useState('');
  const [status, setStatus] = useState('');

  // id 불러오기
  const getID = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        return reservationState(value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /** 예약현황 확인 */
  const reservationState = async id => {
    let formdata = new FormData();
    formdata.append('id', id);
    await createPOSTObject('dest/reservation_state', formdata)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.result != false && data.result != 'error') {
          setCheck(true);
        }
        dataLoading();
      })
      .catch(err => console.error(err));
  };

  /** 지역 및 터미널 피커 데이터 로딩 */
  const dataLoading = async () => {
    await createPOSTObject('dest')
      .then(response => {
        return response.json();
      })
      .then(info => {
        setData(info);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getID();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <LocalPicker
          DATA={DATA}
          localVisible={localVisible}
          setLocalVisible={setLocalVisible}
          selectedLocal={selectedLocal}
          setSelectedLocal={setSelectedLocal}
          setSelectedTerminal={setSelectedTerminal}
          setPercentage={setPercentage}
          setColor={setColor}
          setStatus={setStatus}
        />
        <TerminalPicker
          DATA={DATA}
          terminalVisible={terminalVisible}
          setTerminalVisible={setTerminalVisible}
          selectedTerminal={selectedTerminal}
          setSelectedTerminal={setSelectedTerminal}
          selectedLocal={selectedLocal}
          setPercentage={setPercentage}
          setColor={setColor}
          setStatus={setStatus}
        />

        <View style={styles.chart}>
          <Donut percentage={percentage} color={color} />
          <Text style={[styles.statusText, {color: color}]}>{status}</Text>
          {/* 혼잡도 현황 버튼 */}
          <TouchableOpacity
            style={styles.statusInfoContainer}
            onPress={() => null}>
            <Text style={styles.infoText}>혼잡도 현황</Text>
            <Image source={require('assets/img/destination_info_icon.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        {check === true ? (
          <ActiveButton
            onpress={() => navigation.navigate('Reservation')}
            text="예약 현황 확인"
          />
        ) : selectedTerminal == '터미널' ? (
          <InactiveButton text="운송오더 신청" />
        ) : (
          <ActiveButton
            onpress={() => navigation.navigate('Order')}
            text="운송오더 신청"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  info: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  chart: {
    marginTop: '10%',
    alignItems: 'center',
  },
  statusInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: Font.fontSizes.fontSizes26,
  },
  infoText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: Font.fontSizes.fontSizes14,
    color: '#B6B6B6',
    margin: '3%',
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Destination;
