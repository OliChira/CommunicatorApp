import React from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApprovalScreen from './ApprovalScreen';
import HistoryScreen from './HistoryScreen';
import AccountScreen from './AccountScreen';
import RequestDetailScreen from './RequestDetailScreen';
import TabIcon from '../components/TabIcon';
import { theme } from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ApprovalStack({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackTitle: '',
        gestureEnabled: true
      }}>
      <Stack.Screen
        name="ApprovalMain"
        component={ApprovalScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="RequestDetail"
        component={RequestDetailScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackTitle: '',
        gestureEnabled: true
      }}>
      <Stack.Screen
        name="HistoryMain"
        component={HistoryScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="RequestDetail"
        component={RequestDetailScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackTitle: '',
        gestureEnabled: true
      }}>
      <Stack.Screen
        name="AccountMain"
        component={AccountScreen}
        initialParams={{ userInfo: route.params?.userInfo }}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

export default function TabNavigator({ route }) {
  const { userInfo } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: theme.colors.secondary.main,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopColor: theme.colors.border.light,
          borderTopWidth: 1,
          ...theme.shadows.lg,
          paddingBottom: 12,
          paddingTop: 12,
          height: 85
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.sizes.xs,
          fontWeight: theme.typography.weights.semibold,
          marginTop: 4
        },
        tabBarIconStyle: {
          marginTop: 4
        }
      }}
    >
      <Tab.Screen
        name="Approvals"
        component={ApprovalStack}
        options={{
          tabBarLabel: 'Approvals',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon name="approvals" focused={focused} size={size} />
          ),
          tabBarBadge: 5
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon name="history" focused={focused} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        initialParams={{ userInfo }}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon name="account" focused={focused} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

