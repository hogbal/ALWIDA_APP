import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNav from 'navigation/DrawerNav';

// 권한
import Permission from 'pages/permission-request/Permission';

// 로그인 & 회원가입
import Login from 'pages/login/Login';
import EnterMemberInfo from 'pages/login/EnterMemberInfo';
import SignUp from 'pages/login/SignUp';

// 메인
import Destination from 'pages/main/destination/Destination';
import Order from 'pages/main/destination/Order';
import OrderTime from 'pages/main/destination/OrderTime';
import RecommendedTime from 'pages/main/destination/RecommendedTime';
import RecommendedTimeChange from 'pages/main/destination/RecommendedTimeChange';
import Reservation from '/pages/main/destination/Reservation';
import DA from 'pages/main/DA/DA';
import DAImage from 'pages/main/DA/DAImage';
import Transportation from 'pages/main/transportation/Transportation';
import ChangeReservation from 'pages/main/transportation/ChangeReservation';
import Examination from 'pages/main/examination/Examination';

// 로딩
import DestLoading from 'pages/util/DestLoading';
import ChangeLoading from 'pages/util/ChangeLoading';

import {Font} from 'api/Font';

const StackLogin = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const StackPermission = createNativeStackNavigator();

const StackLoginNav = data => {
  return (
    <StackLogin.Navigator initialRouteName="Login">
      <StackLogin.Screen
        name="Login"
        options={{
          headerShown: false,
        }}>
        {props => <Login navigation={props} props={data} />}
      </StackLogin.Screen>
      <StackLogin.Screen
        name="EnterMemberInfo"
        component={EnterMemberInfo}
        options={{
          title: '회원 정보 입력',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: 20,
            color: '#0C202B',
          },
        }}
      />
      <StackLogin.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: '회원 정보 입력',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: 20,
            color: '#0C202B',
          },
        }}
      />
    </StackLogin.Navigator>
  );
};

const StackPermissonNav = data => {
  return (
    <StackPermission.Navigator initialRouteName="Permission">
      <StackPermission.Screen
        name="Permission"
        options={{
          headerShown: false,
        }}>
        {props => <Permission navigation={props} props={data} />}
      </StackPermission.Screen>
    </StackPermission.Navigator>
  );
};

const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="DrawerNav">
      <Stack.Screen
        name="DrawerNav"
        component={DrawerNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Destination"
        component={Destination}
        options={{
          title: '목적지',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: Font.fontSizes.fontSizes20,
            color: '#0C202B',
          },
        }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          title: '운송오더',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: Font.fontSizes.fontSizes20,
            color: '#0C202B',
          },
        }}
      />
      <Stack.Screen
        name="OrderTime"
        component={OrderTime}
        options={{
          title: '오더 지역 및 시간 설정',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: Font.fontSizes.fontSizes20,
            color: '#0C202B',
          },
        }}
      />
      <Stack.Screen
        name="DestLoading"
        component={DestLoading}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecommendedTime"
        component={RecommendedTime}
        options={{
          title: '추천 시간',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: Font.fontSizes.fontSizes20,
            color: '#0C202B',
          },
        }}
      />
      <Stack.Screen
        name="RecommendedTimeChange"
        component={RecommendedTimeChange}
        options={{
          title: '추천 시간',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: Font.fontSizes.fontSizes20,
            color: '#0C202B',
          },
        }}
      />
      <Stack.Screen
        name="Reservation"
        component={Reservation}
        options={{
          title: '예약현황',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: Font.fontSizes.fontSizes20,
            color: '#0C202B',
          },
        }}
      />
      <Stack.Screen
        name="ChangeReservation"
        component={ChangeReservation}
        options={{
          title: '예약변경',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: Font.fontSizes.fontSizes20,
            color: '#0C202B',
          },
        }}
      />
      <Stack.Screen
        name="ChangeLoading"
        component={ChangeLoading}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DA"
        component={DA}
        options={{
          title: '인수도증',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: Font.fontSizes.fontSizes20,
            color: '#0C202B',
          },
        }}
      />
      <Stack.Screen
        name="DAImage"
        component={DAImage}
        options={{
          title: '인수도증',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: Font.fontSizes.fontSizes20,
            color: '#0C202B',
          },
        }}
      />
      <Stack.Screen
        name="Transportation"
        component={Transportation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Examination"
        component={Examination}
        options={{
          title: '컨테이너 검사',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: Font.fontSizes.fontSizes20,
            color: '#0C202B',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export {StackLoginNav, StackPermissonNav, StackNav};
