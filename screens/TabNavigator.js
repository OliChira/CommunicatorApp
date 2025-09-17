import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApprovalScreen from './ApprovalScreen';
import HistoryScreen from './HistoryScreen';
import AccountScreen from './AccountScreen';
import RequestDetailScreen from './RequestDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ApprovalStack({ route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ApprovalMain"
        component={ApprovalScreen}
        options={{
          title: 'Approvals',
          headerStyle: { backgroundColor: '#007bff' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="RequestDetail"
        component={RequestDetailScreen}
        options={{
          title: 'Request Details',
          headerStyle: { backgroundColor: '#007bff' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryMain"
        component={HistoryScreen}
        options={{
          title: 'History',
          headerStyle: { backgroundColor: '#007bff' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="RequestDetail"
        component={RequestDetailScreen}
        options={{
          title: 'Request Details',
          headerStyle: { backgroundColor: '#007bff' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack({ route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountMain"
        component={AccountScreen}
        initialParams={{ userInfo: route.params?.userInfo }}
        options={{
          title: 'Account',
          headerStyle: { backgroundColor: '#007bff' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitleVisible: false
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
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#6c757d',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e9ecef',
          borderTopWidth: 1,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          paddingBottom: 12,
          paddingTop: 12,
          height: 85
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
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
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="📝" color={color} size={size} />
          ),
          tabBarBadge: 5
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="📋" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        initialParams={{ userInfo }}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="👤" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

function TabIcon({ icon, color, size }) {
  return (
    <Text style={{
      fontSize: size - 4,
      color: color,
      textAlign: 'center'
    }}>
      {icon}
    </Text>
  );
}