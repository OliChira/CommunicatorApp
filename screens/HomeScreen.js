import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Animated } from 'react-native';
import AnimatedCard from '../components/AnimatedCard';
import { theme } from '../styles/theme';

export default function HomeScreen({ route }) {
  const { userInfo } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const formatUserName = (name) => {
    if (!name) return 'User';
    return name.split(' ')[0];
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.secondary} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{getUserInitials(userInfo.name)}</Text>
            </View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{formatUserName(userInfo.name)}!</Text>
          </Animated.View>

          <AnimatedCard style={styles.profileCard} padding="lg" delay={200}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Profile Information</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{userInfo.name || 'Not provided'}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{userInfo.email || 'Not provided'}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Employee ID</Text>
              <Text style={styles.infoValue}>{userInfo.sub || userInfo.oid || 'Not available'}</Text>
            </View>
          </AnimatedCard>

          <AnimatedCard style={styles.detailsCard} padding="lg" delay={400}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Authentication Details</Text>
            </View>

            <View style={styles.claimsContainer}>
              <Text style={styles.claimsLabel}>Token Claims:</Text>
              <View style={styles.claimsBox}>
                <Text style={styles.claimsText} selectable>
                  {JSON.stringify(userInfo, null, 2)}
                </Text>
              </View>
            </View>
          </AnimatedCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary
  },
  scrollView: {
    flex: 1
  },
  content: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md
  },
  avatarText: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.inverse
  },
  welcomeText: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs
  },
  nameText: {
    fontSize: theme.typography.sizes.xxxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary
  },
  profileCard: {
    marginBottom: theme.spacing.lg
  },
  detailsCard: {
    marginBottom: theme.spacing.lg
  },
  cardHeader: {
    marginBottom: theme.spacing.lg
  },
  cardTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary
  },
  infoRow: {
    paddingVertical: theme.spacing.md
  },
  infoLabel: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  infoValue: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.medium
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: theme.spacing.xs
  },
  claimsContainer: {
    marginTop: theme.spacing.sm
  },
  claimsLabel: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  claimsBox: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light
  },
  claimsText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.secondary,
    fontFamily: 'monospace',
    lineHeight: 16
  }
});