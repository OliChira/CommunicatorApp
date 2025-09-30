import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { theme } from '../styles/theme';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start();
  };
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];

    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    } else {
      baseStyle.push(styles[variant]);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle = [styles.text, styles[`${size}Text`]];

    if (variant === 'outline' && !disabled) {
      baseTextStyle.push(styles.outlineText);
    } else if (variant === 'ghost' && !disabled) {
      baseTextStyle.push(styles.ghostText);
    } else {
      baseTextStyle.push(styles.primaryText);
    }

    if (textStyle) {
      baseTextStyle.push(textStyle);
    }

    return baseTextStyle;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.9}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary.main : theme.colors.text.inverse}
          />
        ) : (
          <Text style={getTextStyle()}>{title}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...theme.shadows.sm
  },

  // Sizes
  sm: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 36
  },
  md: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: 48
  },
  lg: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    minHeight: 56
  },

  // Variants
  primary: {
    backgroundColor: theme.colors.primary.main
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary.main
  },
  ghost: {
    backgroundColor: 'transparent'
  },
  secondary: {
    backgroundColor: theme.colors.secondary.main
  },
  success: {
    backgroundColor: theme.colors.success.main
  },
  error: {
    backgroundColor: theme.colors.error.main
  },

  disabled: {
    backgroundColor: theme.colors.secondary.light,
    borderColor: theme.colors.secondary.light,
    opacity: 0.6
  },

  // Text styles
  text: {
    fontWeight: theme.typography.weights.semibold,
    textAlign: 'center'
  },
  smText: {
    fontSize: theme.typography.sizes.sm
  },
  mdText: {
    fontSize: theme.typography.sizes.md
  },
  lgText: {
    fontSize: theme.typography.sizes.lg
  },

  primaryText: {
    color: theme.colors.text.inverse
  },
  outlineText: {
    color: theme.colors.primary.main
  },
  ghostText: {
    color: theme.colors.primary.main
  }
});