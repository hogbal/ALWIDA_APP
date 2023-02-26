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
import {createPOSTObject} from 'api/API';
import {Font} from 'api/Font';

const ItemList = ({title, description}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text
        style={
          description == '발급 대기 중' || description == '-'
            ? styles.blueDescriptionText
            : styles.descriptionText
        }>
        {description}
      </Text>
    </View>
  );
};

const DA = ({navigation}) => {
  const [publish, setPublish] = useState('');
  const [terminalName, setTerminalName] = useState('');
  const [issue, setIssue] = useState('');
  const [date, setDate] = useState('');
  const [division, setDivision] = useState('');
  const [containerNum, setContainerNum] = useState('');
  const [deviceLocation, setDeviceLocation] = useState('');
  const [standard, setStandard] = useState('');
  const [fm, setFM] = useState('');

  // id 불러오기
  const getID = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        return getInfo(value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 인수도증 정보 불러오기
  const getInfo = async id => {
    let formdata = new FormData();
    formdata.append('id', id);
    await createPOSTObject('receipt', formdata)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPublish(data.publish);
        setTerminalName(data.terminalName);
        setIssue(data.issue);
        setDate(data.date);
        setDivision(data.divison);
        setContainerNum(data.containerNum);
        setDeviceLocation(data.deviceLocation);
        setStandard(data.standard);
        setFM(data.fm);
      })
      .catch(err => console.error(err));
  };

  // 페이지 실행 시 id 및 인수도증 정보 불러오기
  useEffect(() => {
    getID();
  }, []);

  useEffect(() => {
    // id 및 검사내역 불러오기 완료 시 리렌더링
    setDate(publish === false ? '발급 대기 중' : date);
    setDeviceLocation(deviceLocation === null ? '-' : deviceLocation);
  }, [date, deviceLocation]);

  if (issue) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.ticketContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.terminalText}>터미널</Text>
              <Text style={styles.terminalNameText}>{terminalName}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('DAImage')}>
              <Image source={require('assets/img/da_pin.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <ItemList title="발행일시" description={date} />
            <ItemList title="구분" description={division} />
            <ItemList title="컨테이너 번호" description={containerNum} />
            <ItemList title="장치위치" description={deviceLocation} />
            <ItemList title="규격" description={standard} />
            <ItemList title="F/M" description={fm} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ticketContainer}>
        <Text style={styles.terminalText}>터미널</Text>
        <Text style={styles.terminalNameText}>{terminalName}</Text>
        <View>
          <ItemList title="발행일시" description={date} />
          <ItemList title="구분" description={division} />
          <ItemList title="컨테이너 번호" description={containerNum} />
          <ItemList title="장치위치" description={deviceLocation} />
          <ItemList title="규격" description={standard} />
          <ItemList title="F/M" description={fm} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketContainer: {
    width: '90%',
    padding: '10%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#E3E6ED',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '4%',
  },
  terminalText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: Font.fontSizes.fontSizes16,
    color: '#888888',
  },
  terminalNameText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: Font.fontSizes.fontSizes20,
    color: '#000000',
    marginBottom: '10%',
  },
  titleText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: Font.fontSizes.fontSizes16,
    color: '#888888',
  },
  descriptionText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: Font.fontSizes.fontSizes16,
    color: '#1A1A1A',
  },
  blueDescriptionText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: Font.fontSizes.fontSizes16,
    color: '#00A8FF',
  },
  readyTicketContainer: {
    flex: 2,
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#E3E6ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  readyText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: Font.fontSizes.fontSizes20,
    color: '#00A8FF',
  },
});

export default DA;
