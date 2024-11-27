import { Dimensions, Platform } from 'react-native';

// Screen dimensions
const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

// Responsive helpers
const responsiveHeight = (h: number): number => deviceHeight * (h / 100);
const responsiveWidth = (w: number): number => deviceWidth * (w / 100);

// Navigation and status bar heights
const NAV_HEIGHT = responsiveHeight(6.6);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 24;

// Button sizes
const btnDimensions = {
  normalWidth: responsiveWidth(74.4),
  largeWidth: responsiveWidth(91.47),
  normalHeight: 48,
  smallHeight: 30,
};

// Tab and drawer dimensions
const layoutDimensions = {
  tabHeight: responsiveHeight(8),
  drawerWidth: responsiveWidth(80),
  scrollableTabHeight: 50,
  inputHeight: 43,
};

// Margins and paddings (horizontal)
const marginHorizontal = {
  large: responsiveWidth(12.8), // 48px
  normal: responsiveWidth(8.5), // 32px
  semiSmall: responsiveWidth(6.4), // 24px
  small: responsiveWidth(4.27), // 16px
  extraSmall: responsiveWidth(2), // 8px
  xSmall: responsiveWidth(3),
  xxSmall: responsiveWidth(1),
  extraLarge: responsiveWidth(24),
  xxLarge: responsiveWidth(28),
  big: responsiveWidth(36),
  extraBig: responsiveWidth(42),
  flatListMargin: responsiveWidth(2),
};

// Margins and paddings (vertical)
const marginVertical = {
  xxLarge: responsiveHeight(20),
  extraLarge: responsiveHeight(12),
  large: responsiveHeight(7.19), // 48px
  normal: responsiveHeight(4.8), // 32px
  semiSmall: responsiveHeight(3.6), // 24px
  small: responsiveHeight(2.4), // 16px
  extraSmall: responsiveHeight(1.5),
  tiny: responsiveHeight(1),
  veryTiny: responsiveHeight(0.5),
};

// Common colors
const sharedColors = {
  black: '#121314',
  white: '#fff',
  blue: '#4860F8',
};

// Light theme colors
const lightColors = {
  black: '#000000',
  blue:sharedColors.blue,
  pink:'#F4407D',
  green:'#B7EB6F',
  grey:'#797979'
};

// Dark theme colors
const darkColors = {
  blue: sharedColors.blue,
  white: '#FFFFFF',
};

// Font configurations
const fontFamily = {
  A_bold: 'AlbertSans-Bold',
  A_semiBold: 'AlbertSans-SemiBold',
  A_regular: 'AlbertSans-Regular',

  L_bold: 'LexendDeca-Bold',
  L_semiBold: 'LexendDeca-SemiBold',
  L_regular: 'LexendDeca-Regular',

  R_bold: 'Rubik-Bold',
  R_semiBold: 'Rubik-SemiBold',
  R_regular: 'Rubik-Regular',

};

// Font sizes and line heights
const LARGE_DEVICE_SCALE = 1.3;
const fontSize = {
  extraSmall: 12,
  small: 14,
  normal: 16,
  medium: 18,
  mediumLarge: 20,
  semiLarge: 22,
  large: 24,
};
const lineHeight = {
  small: 16,
  normal: 24,
};

// Border radius
const borderRadius = {
  normal: 4,
  semiNormal: 5,
  semiSmall: 6,
  medium: 12,
  backNextBtn: 100,
  semiLarge: 10,
  box: 20,
  extraLarge: 50,
  l150: 150,
  circle: 1000,
  email: 7,
  otp: 8,
  bigBox: 40,
};

// Adjust for larger devices
if (deviceWidth >= 768) {
  Object.keys(fontSize).forEach((key) => {
    fontSize[key as keyof typeof fontSize] *= LARGE_DEVICE_SCALE;
  });

  Object.keys(lineHeight).forEach((key) => {
    lineHeight[key as keyof typeof lineHeight] *= LARGE_DEVICE_SCALE;
  });

  Object.keys(borderRadius).forEach((key) => {
    borderRadius[key as keyof typeof borderRadius] *= LARGE_DEVICE_SCALE;
  });

  btnDimensions.normalHeight *= LARGE_DEVICE_SCALE;
  btnDimensions.smallHeight *= LARGE_DEVICE_SCALE;
  layoutDimensions.inputHeight *= LARGE_DEVICE_SCALE;
  layoutDimensions.scrollableTabHeight *= LARGE_DEVICE_SCALE;
}

// Exports
export {
  responsiveHeight,
  responsiveWidth,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  btnDimensions,
  layoutDimensions,
  marginHorizontal,
  marginVertical,
  lightColors,
  darkColors,
  sharedColors,
  fontFamily,
  fontSize,
  lineHeight,
  borderRadius,
};
