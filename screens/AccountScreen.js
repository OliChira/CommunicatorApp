import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView, StatusBar } from 'react-native';
import Card from '../components/Card';
import { theme } from '../styles/theme';

export default function AccountScreen({ route, navigation }) {
  const { userInfo } = route.params || {};

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }]
            });
          }
        }
      ]
    );
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'This feature will be available soon.');
  };

  const handleNotificationSettings = () => {
    Alert.alert('Notification Settings', 'This feature will be available soon.');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact support at support@company.com');
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const renderProfileInfo = () => (
    <Card style={styles.profileSection} padding="lg">
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getUserInitials(userInfo?.name)}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{userInfo?.name || 'User Name'}</Text>
          <Text style={styles.userEmail}>{userInfo?.email || 'user@company.com'}</Text>
        </View>
      </View>
    </Card>
  );

  const renderAccountDetails = () => (
    <Card style={styles.section} padding="lg">
      <Text style={styles.sectionTitle}>Account Details</Text>

      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Employee ID</Text>
        <Text style={styles.detailValue}>{userInfo?.sub || 'EMP-12345'}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Department</Text>
        <Text style={styles.detailValue}>Operations</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Role</Text>
        <Text style={styles.detailValue}>Approval Manager</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Location</Text>
        <Text style={styles.detailValue}>New York, NY</Text>
      </View>
    </Card>
  );

  const renderMenuSection = (title, items) => (
    <Card style={styles.section} padding="lg">
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.menuItem,
            index > 0 && styles.menuItemWithBorder
          ]}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.menuItemText,
            item.destructive && styles.destructiveText
          ]}>
            {item.title}
          </Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>
      ))}
    </Card>
  );

  const securityItems = [
    { title: 'Change Password', onPress: handleChangePassword },
    { title: 'Notification Settings', onPress: handleNotificationSettings }
  ];

  const supportItems = [
    { title: 'Help & Support', onPress: handleSupport },
    { title: 'Privacy Policy', onPress: () => Alert.alert('Privacy Policy', 'This feature will be available soon.') },
    { title: 'Terms of Service', onPress: () => Alert.alert('Terms of Service', 'This feature will be available soon.') }
  ];

  const appItems = [
    { title: 'About', onPress: () => Alert.alert('Company Approval App', 'Version 1.0.0') },
    { title: 'Logout', onPress: handleLogout, destructive: true }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.secondary} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {renderProfileInfo()}
          {renderAccountDetails()}
          {renderMenuSection('Security', securityItems)}
          {renderMenuSection('Support', supportItems)}
          {renderMenuSection('App', appItems)}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Company Approval App v1.0.0</Text>
          </View>
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
  profileSection: {
    marginBottom: theme.spacing.lg
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
    ...theme.shadows.md
  },
  avatarText: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.inverse
  },
  profileInfo: {
    flex: 1
  },
  userName: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs
  },
  userEmail: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium
  },
  section: {
    marginBottom: theme.spacing.lg
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md
  },
  detailLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  detailValue: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.medium
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: theme.spacing.xs
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md
  },
  menuItemWithBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.md
  },
  menuItemText: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.medium
  },
  destructiveText: {
    color: theme.colors.error.main
  },
  menuItemArrow: {
    fontSize: 20,
    color: theme.colors.text.tertiary,
    fontWeight: '300'
  },
  footer: {
    paddingVertical: theme.spacing.xl,
    alignItems: 'center'
  },
  footerText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.tertiary
  }
});