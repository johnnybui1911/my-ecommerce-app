import {Dimensions, Platform, StatusBar} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export {SCREEN_WIDTH, SCREEN_HEIGHT, STATUS_BAR_HEIGHT};
