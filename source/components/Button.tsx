import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  borderRadius,
  fontFamily,
  fontSize,
  responsiveWidth,
  darkColors,
  lineHeight,
} from '../styles/variables';

interface btnProps {
  onPress?: () => void;
  name?: string;
  backgroundColor?: string;
  needLoading?: boolean;
  bottom?: number;
  position?: any;
  buttonTextColor?: string;
  borderWidthColor?: string;
  loaderColor?: string;
  marginBottom?: number;
  marginTop?: number;
  borderWidth?: number;
  borderColor?: string;
  disabled?: boolean;
  width?: any;
  // extraStyles:any;
}

const Buttons: React.FC<btnProps> = ({
  name,
  onPress,
  backgroundColor,
  needLoading,
  bottom,
  position,
  buttonTextColor,
  loaderColor,
  marginBottom,
  marginTop,
  borderWidth,
  borderColor,
  disabled,
  width,

  // extraStyles
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnStyles,
        {
          backgroundColor: backgroundColor,
          marginTop: marginTop,
          bottom: bottom,
          marginBottom: marginBottom,
          position: position,
          borderWidth: borderWidth,
          borderColor: borderColor,
          width: width,
        },
        //  extraStyles
      ]}
      activeOpacity={0.5}
      onPress={onPress}
      disabled={disabled}>
      {needLoading ? (
        <ActivityIndicator
          size="small"
          color={loaderColor ? loaderColor : darkColors.white}
        />
      ) : (
        <View>
          <Text style={[styles.text, {color: buttonTextColor}]}>{name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btnStyles: {
    width: responsiveWidth(85),
    borderRadius: borderRadius.circle,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontFamily: fontFamily.R_bold,
    fontSize: fontSize.medium,
    lineHeight: lineHeight.normal,
  },
});
export default Buttons;
