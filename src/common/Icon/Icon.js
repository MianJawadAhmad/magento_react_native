import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import { ThemeContext } from '../../theme';
import { DIMENS } from '../../constants';
import getIconType from './helpers/getIconType';

// Possible icon set supported by this Icon component
export const IconTypes = [
  'zocial',
  'octicon',
  'material',
  'material-community',
  'ionicon',
  'foundation',
  'evilicon',
  'entypo',
  'font-awesome',
  'font-awesome-5',
  'fontisto',
  'simple-line-icon',
  'feather',
  'antdesign',
];

const propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(IconTypes),
  disabled: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
  onPress: PropTypes.func,
  style: Text.propTypes.style,
};

const defaultProps = {
  name: '',
  type: 'material',
  onPress: null,
  disabled: false,
  size: DIMENS.common.iconSize,
  color: null,
  style: {},
};

const Icon = ({
  /**
   * type of icon set. Available Icon set are
   * - material
   * - material-community
   * - font-awesome
   * - font-awesome-5
   * - octicon
   * - ionicon
   * - foundation
   * - evilicon
   * - simple-line-icon
   * - zocial
   * - entypo
   * - feather
   * - antdesign
   * - fontisto
   *
   * Default value is 'material'
   */
  type,
  /**
   * size of icon (optional)
   */
  size,
  /**
   * Name of the icon to be shown
   *
   * Search here: https://oblador.github.io/react-native-vector-icons/
   */
  name,
  /**
   * color of icon (optional)
   *
   * If provided, it will be used for icon and Image tint color, if not, then default theme.iconColor for only icon
   */
  color,
  /**
   * additional styling to icon (optional)
   */
  style,
  /**
   * Callback to call when Icon is clicked
   */
  onPress,
  /**
   * If true, the onPress callback won't be called
   */
  disabled,
}) => {
  const { theme } = useContext(ThemeContext);

  const Component = onPress ? TouchableOpacity : React.Fragment;

  const IconComponent = getIconType(type);

  return (
    <Component
      {...(onPress && {
        onPress,
        disabled,
      })}
    >
      <IconComponent
        testID="icon"
        size={size}
        name={name}
        color={disabled ? theme.disabledDarkColor : color || theme.iconColor}
        style={StyleSheet.flatten([styles.iconStyle, style])}
      />
    </Component>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    backgroundColor: 'transparent',
  },
});

Icon.propTypes = propTypes;

Icon.defaultProps = defaultProps;

export default Icon;
