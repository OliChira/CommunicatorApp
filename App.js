import React, { useEffect } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import jwtDecode from 'jwt-decode';
import TabNavigator from './screens/TabNavigator';

WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

const CLIENT_ID = '4c4650e0-94a6-4559-8f81-a5b60fe4df5a';
const TENANT_ID = 'c05b8d5a-b883-4afb-ae93-db5db239911c';

const discovery = {
  authorizationEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
};

const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });
//const REDIRECT_URI = 'https://myscstage.mcd.com/';

function LoginScreen({ navigation }) {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      scopes: ['openid', 'profile', 'email'],
      responseType: 'code',
    },
    discovery
  );

  useEffect(() => {
    const fetchTokens = async () => {
      if (response?.type === 'success') {
        const code = response.params.code;

        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            clientId: CLIENT_ID,
            code,
            redirectUri: REDIRECT_URI,
            extraParams: {
              code_verifier: request.codeVerifier,
            },
          },
          discovery
        );

        const idToken = tokenResult.id_token;
        const decoded = jwtDecode(idToken);

        // Navigate to TabNavigator with user info
        navigation.navigate('Main', { userInfo: decoded });
      }
    };

    fetchTokens();
  }, [response]);

  const handleMockLogin = () => {
    const mockUserInfo = {
      name: 'John Doe',
      email: 'john.doe@company.com',
      sub: 'EMP-12345'
    };
    navigation.navigate('Main', { userInfo: mockUserInfo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Company Approval App</Text>
      <Button title="Login with Microsoft" disabled={!request} onPress={() => promptAsync()} />
      <View style={{ marginTop: 20 }}>
        <Button title="Skip Login (Development)" onPress={handleMockLogin} color="#28a745" />
      </View>
      <Text style={styles.devNote}>
        Use "Skip Login" to bypass authentication for development
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 30, fontWeight: 'bold', textAlign: 'center' },
  devNote: { fontSize: 12, color: '#6c757d', marginTop: 10, textAlign: 'center' }
});