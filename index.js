/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Text, TextInput } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-root-siblings'

if (Text.defaultProps) {
    Text.defaultProps.allowFontScaling = false;
  } else {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }
  
  // Override Text scaling in input fields
  if (TextInput.defaultProps) {
    TextInput.defaultProps.allowFontScaling = false;
  } else {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }
AppRegistry.registerComponent(appName, () => App);
