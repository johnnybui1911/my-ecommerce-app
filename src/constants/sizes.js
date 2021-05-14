import {Dimensions, Platform, StatusBar} from 'react-native';

const WINDOW_SCREEN = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_X_HEIGHT = 44;
const STATUSBAR_IP12_HEIGHT = 47;
const STATUSBAR_IP12MAX_HEIGHT = 47;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

const isIphoneNotch =
  WINDOW_WIDTH >= X_WIDTH && WINDOW_HEIGHT >= X_HEIGHT && Platform.OS === 'ios';

function getStatusBarHeight() {
  if (Platform.OS === 'ios') {
    if (WINDOW_WIDTH >= X_WIDTH && WINDOW_HEIGHT >= X_HEIGHT) {
      return STATUSBAR_X_HEIGHT;
    } else if (WINDOW_WIDTH >= XSMAX_WIDTH && WINDOW_HEIGHT >= XSMAX_HEIGHT) {
      return STATUSBAR_X_HEIGHT;
    } else if (WINDOW_WIDTH >= IP12_WIDTH && WINDOW_HEIGHT >= IP12_HEIGHT) {
      return STATUSBAR_IP12_HEIGHT;
    } else if (
      WINDOW_WIDTH >= IP12MAX_WIDTH &&
      WINDOW_HEIGHT >= IP12MAX_HEIGHT
    ) {
      return STATUSBAR_IP12MAX_HEIGHT;
    } else {
      return STATUSBAR_DEFAULT_HEIGHT;
    }
  }
  return StatusBar.currentHeight;
}

const STATUS_BAR_HEIGHT = getStatusBarHeight();

const DEFAULT_SPACE = 8;

const BOTTOM_TAB_HEIGHT = isIphoneNotch ? 96 : 64;

const sizes = {
  small: DEFAULT_SPACE,
  medium: DEFAULT_SPACE * 2,
  large: DEFAULT_SPACE * 3,
  xLarge: DEFAULT_SPACE * 4,
};

const PRODUCT_ITEM_HEIGHT = 223;

export {
  WINDOW_SCREEN,
  SCREEN_HEIGHT,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  STATUS_BAR_HEIGHT,
  BOTTOM_TAB_HEIGHT,
  PRODUCT_ITEM_HEIGHT,
  sizes,
};
