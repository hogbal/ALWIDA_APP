import {Dimensions, Platform} from 'react-native';

const basicDimensions = {
  // width: 360,
  // height: 800,
  // iphone 14 pro max 기준
  width: 430,
  height: 932
};

const width = (
  Dimensions.get('screen').width *
  (1 / basicDimensions.width)
).toFixed(2);

const height = (
  Dimensions.get('screen').height *
  (1 / basicDimensions.height)
).toFixed(2);

const fontSizes = Platform.OS == "ios" ? {
  fontSizes10: width * 10,
  fontSizes12: width * 12,
  fontSizes14: width * 14,
  fontSizes16: width * 16,
  fontSizes18: width * 18,
  fontSizes20: width * 20,
  fontSizes22: width * 22,
  fontSizes24: width * 24,
  fontSizes26: width * 26,
  fontSizes28: width * 28,
  fontSizes30: width * 30,
  fontSizes32: width * 32,
  fontSizes50: width * 50,
  fontSizes60: width * 60,
}
:
{
  fontSizes10: width * 10 - 2,
  fontSizes12: width * 12 - 2,
  fontSizes14: width * 14 - 2,
  fontSizes16: width * 16 - 2,
  fontSizes18: width * 18 - 2,
  fontSizes20: width * 20 - 2,
  fontSizes22: width * 22 - 2,
  fontSizes24: width * 24 - 2,
  fontSizes26: width * 26 - 2,
  fontSizes28: width * 28 - 2,
  fontSizes30: width * 30 - 2,
  fontSizes32: width * 32 - 2,
  fontSizes50: width * 50 - 2,
  fontSizes60: width * 60 - 2,
}

const Font = {
  fontSizes,
  height,
  width,
};

export { Font }