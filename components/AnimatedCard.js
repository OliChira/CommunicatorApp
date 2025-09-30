import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import Card from './Card';

export default function AnimatedCard({
  children,
  delay = 0,
  duration = 600,
  style,
  ...props
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true
      })
    ]);

    animation.start();
  }, [fadeAnim, slideAnim, delay, duration]);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      {
        translateY: slideAnim
      }
    ]
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Card {...props}>
        {children}
      </Card>
    </Animated.View>
  );
}