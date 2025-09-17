import React, { useEffect } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import jwtDecode from 'jwt-decode';
import HomeScreen from './screens/HomeScreen';

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

        // Navigate to HomeScreen with user info
        navigation.navigate('Home', { userInfo: decoded });
      }
    };

    fetchTokens();
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Company Approval App</Text>
      <Button title="Login" disabled={!request} onPress={() => promptAsync()} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, marginBottom: 20 }
});