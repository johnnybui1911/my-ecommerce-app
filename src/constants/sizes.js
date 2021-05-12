import {Dimensions, Platform, StatusBar} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const STATUSBAR_X_HEIGHT = 44;

const X_WIDTH = 375;
const X_HEIGHT = 812;

function getStatusBarHeight() {
  if (Platform.OS === 'ios') {
    console.log({WINDOW_WIDTH, WINDOW_HEIGHT});
    if (WINDOW_WIDTH >= X_WIDTH && WINDOW_HEIGHT >= X_HEIGHT) {
      return STATUSBAR_X_HEIGHT;
    } else {
      return 20;
    }
  }
  return StatusBar.currentHeight;
}

const STATUS_BAR_HEIGHT = getStatusBarHeight();

const DEFAULT_SPACE = 8;

const space = {
  small: DEFAULT_SPACE,
  medium: DEFAULT_SPACE * 2,
  large: DEFAULT_SPACE * 3,
  xLarge: DEFAULT_SPACE * 4,
};

export {SCREEN_WIDTH, SCREEN_HEIGHT, STATUS_BAR_HEIGHT, space};
