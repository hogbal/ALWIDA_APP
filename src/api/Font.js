import {Dimensions} from 'react-native';

const basicDimensions = {
  width: 360,
  height: 800,
};

const width = (
  Dimensions.get('screen').width *
  (1 / basicDimensions.width)
).toFixed(2);

const height = (
  Dimensions.get('screen').height *
  (1 / basicDimensions.height)
).toFixed(2);

const fontSizes = {
  fontSizes10: width * 10,
  fontSizes12: width * 12,
  fontSizes14: width * 14,
  fontSizes16: width * 16,
  fontSizes18: width * 18,
  fontSizes20: width * 20,
  fontSizes22: width * 22,
  fontSizes24: width * 24,
};

const Font = {
  fontSizes,
  height,
  width,
};

export { Font }