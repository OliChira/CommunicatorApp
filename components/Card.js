import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default function Card({
  children,
  style,
  padding = 'md',
  shadow = 'md',
  ...props
}) {
  const cardStyle = [
    styles.card,
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    theme.shadows[shadow],
    style
  ];

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border.light
  },

  paddingSm: {
    padding: theme.spacing.sm
  },
  paddingMd: {
    padding: theme.spacing.md
  },
  paddingLg: {
    padding: theme.spacing.lg
  },
  paddingXl: {
    padding: theme.spacing.xl
  }
});