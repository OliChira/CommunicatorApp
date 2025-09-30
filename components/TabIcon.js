import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../styles/theme';

const TabIcon = ({ name, focused, size = 24 }) => {
  const iconColor = focused ? theme.colors.primary.main : theme.colors.secondary.main;

  const getIcon = () => {
    switch (name) {
      case 'approvals':
        return (
          <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
              width: size * 0.8,
              height: size * 0.8,
              borderRadius: size * 0.1,
              borderWidth: 2,
              borderColor: iconColor,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={{
                width: size * 0.3,
                height: size * 0.15,
                borderBottomWidth: 2,
                borderRightWidth: 2,
                borderColor: iconColor,
                transform: [{ rotate: '45deg' }],
                marginTop: -size * 0.05
              }} />
            </View>
          </View>
        );

      case 'history':
        return (
          <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
              width: size * 0.8,
              height: size * 0.8,
              borderRadius: size * 0.4,
              borderWidth: 2,
              borderColor: iconColor,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={{
                position: 'absolute',
                width: 2,
                height: size * 0.25,
                backgroundColor: iconColor,
                top: size * 0.1
              }} />
              <View style={{
                position: 'absolute',
                width: size * 0.2,
                height: 2,
                backgroundColor: iconColor,
                left: size * 0.4
              }} />
            </View>
          </View>
        );

      case 'account':
        return (
          <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
              width: size * 0.45,
              height: size * 0.45,
              borderRadius: size * 0.225,
              borderWidth: 2,
              borderColor: iconColor,
              marginBottom: size * 0.05
            }} />
            <View style={{
              width: size * 0.8,
              height: size * 0.4,
              borderTopLeftRadius: size * 0.4,
              borderTopRightRadius: size * 0.4,
              borderWidth: 2,
              borderBottomWidth: 0,
              borderColor: iconColor
            }} />
          </View>
        );

      default:
        return <Text style={{ fontSize: size, color: iconColor }}>•</Text>;
    }
  };

  return getIcon();
};

export default TabIcon;