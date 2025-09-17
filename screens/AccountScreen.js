import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

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

  const renderProfileInfo = () => (
    <View style={styles.profileSection}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{userInfo?.name || 'User Name'}</Text>
          <Text style={styles.userEmail}>{userInfo?.email || 'user@company.com'}</Text>
        </View>
      </View>
    </View>
  );

  const renderAccountDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account Details</Text>

      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Employee ID</Text>
        <Text style={styles.detailValue}>{userInfo?.sub || 'EMP-12345'}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Department</Text>
        <Text style={styles.detailValue}>Operations</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Role</Text>
        <Text style={styles.detailValue}>Approval Manager</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Location</Text>
        <Text style={styles.detailValue}>New York, NY</Text>
      </View>
    </View>
  );

  const renderMenuSection = (title, items) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.menuItem,
            index === items.length - 1 && styles.lastMenuItem
          ]}
          onPress={item.onPress}
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
    </View>
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderProfileInfo()}
      {renderAccountDetails()}
      {renderMenuSection('Security', securityItems)}
      {renderMenuSection('Support', supportItems)}
      {renderMenuSection('App', appItems)}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Company Approval App v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  profileSection: {
    backgroundColor: '#fff',
    marginBottom: 20
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff'
  },
  profileInfo: {
    flex: 1
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4
  },
  userEmail: {
    fontSize: 16,
    color: '#6c757d'
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa'
  },
  detailLabel: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '500'
  },
  detailValue: {
    fontSize: 16,
    color: '#212529'
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa'
  },
  lastMenuItem: {
    borderBottomWidth: 0
  },
  menuItemText: {
    fontSize: 16,
    color: '#212529'
  },
  destructiveText: {
    color: '#dc3545'
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#6c757d',
    fontWeight: '300'
  },
  footer: {
    padding: 20,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    color: '#6c757d'
  }
});