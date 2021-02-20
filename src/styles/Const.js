import { RFValue } from "react-native-responsive-fontsize";
import Config from 'react-native-config';
import { Platform, StatusBar } from "react-native";
import DeviceInfo from 'react-native-device-info';

export const FONT_BOLD = "Quicksand-Bold";
export const FONT_LIGHT = "Quicksand-Light";
export const FONT_MEDIUM = "Quicksand-Medium";
export const FONT_REGULAR = "Quicksand-Regular";

export const STANDARD_SCREEN_HEIGHT = 740;

export const EXTRA_SMALL_FONT_SIZE_2 = 9;
export const EXTRA_SMALL_FONT_SIZE_1 = 10;
export const EXTRA_SMALL_FONT_SIZE = 12;
export const SMALL_FONT_SIZE = 14;
export const NORMAL_FONT_SIZE = 16;
export const LARGE_FONT_SIZE = 18;
export const EXTRA_LARGE_FONT_SIZE = 20;
export const EXTRA_LARGE_FONT_SIZE_2 = 24;
export const EXTRA_LARGE_FONT_SIZE_3 = 26;

export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios'
    ? 20
    : StatusBar.currentHeight;
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 30 : 56;
export const HEADER_BAR_HEIGHT = DeviceInfo.hasNotch() ? STATUSBAR_HEIGHT + APPBAR_HEIGHT : 0;

export const WHITE_COLOR = "white";
export const BLACK_COLOR = "black";
export const THEME_COLOR = Config.THEME_COLOR || "#069a92";
export const UNDERLINE_COLOR = "#c3c3c3";
export const ICON_COLOR = "#c3c3c3";
export const GRAY_COLOR = "#d6d8d7";
export const ORANGE_COLOR = "#bb6a2e";
export const TEXT_GRAY = "#5c5e5c";
export const DARK_RED ="#A62C23";

export const nigphoneRegExp ='^[0]';
export const phoneRegExp = '^[6-9]{1}?[0-9]{9}$';
export const userNameRegExp = '^[a-z0-9@]+([._@][a-z0-9@]+)*$';//'^[a-z]{1}?[a-z0-9_.]*$';
export const coporateRegExp = '^[a-zA-Z0-9]*$';
export const couponeCodeRegExp = '^[a-zA-Z0-9]*$';
export const passwordRegExp = '^[a-zA-Z0-9]{1}?[a-zA-Z0-9_@]*$';
export const onlyWordsWithSpace = '^^[a-zA-Z]{1}?[a-zA-Z ]*$';
export const onlyWords = '^[a-zA-Z]{1}?[a-zA-Z]*$';
export const alphaNumbericRegExp = '^[a-zA-Z0-9]*$';
export const reasonRegExp = '^[a-zA-Z0-9_?., ]*$';
export const ReferenceCodeRegExp = '^[a-zA-Z0-9-]*$';
export const userNameValidation1 = "Username can only contain a-z,0-9, _ ,. and @";
export const userNameValidation2 = "Username cannot begin with _ or . and together";
export const userNameValidation3 = "Username can contain only 6 to 20 characters"
export const TOOLBAR_HEIGHT = RFValue(60, STANDARD_SCREEN_HEIGHT);




