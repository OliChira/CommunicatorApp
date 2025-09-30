import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Animated } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import jwtDecode from 'jwt-decode';
import TabNavigator from './screens/TabNavigator';
import Button from './components/Button';
import AnimatedCard from './components/AnimatedCard';
import { theme } from './styles/theme';

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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true
      })
    ]).start();

    // Start pulsing animation after initial load
    const startPulsing = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          }),
          Animated.delay(3000) // Wait 3 seconds before next pulse (total 5 seconds)
        ])
      ).start();
    };

    // Start pulsing after initial animation completes
    setTimeout(startPulsing, 800);
  }, [fadeAnim, slideAnim, pulseAnim]);

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.secondary} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.mainContent}>
          <View style={styles.header}>
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  transform: [
                    {
                      rotate: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg']
                      })
                    },
                    {
                      scale: Animated.multiply(
                        fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.5, 1]
                        }),
                        pulseAnim
                      )
                    }
                  ]
                }
              ]}
            >
              <View style={styles.animatedIcon}>
                <Animated.View
                  style={[
                    styles.innerCircle,
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                />
                <Animated.View
                  style={[
                    styles.outerRing,
                    {
                      opacity: pulseAnim.interpolate({
                        inputRange: [1, 1.2],
                        outputRange: [0.8, 0.3]
                      })
                    }
                  ]}
                />
              </View>
            </Animated.View>
            <Text style={styles.title}>Company Approval</Text>
          </View>

          <AnimatedCard style={styles.loginCard} padding="xl" delay={300}>

            <View style={styles.buttonContainer}>
              <Button
                title="Sign in with Microsoft"
                disabled={!request}
                onPress={() => promptAsync()}
                size="lg"
                style={styles.primaryButton}
              />

              <Button
                title="Continue as Guest"
                onPress={handleMockLogin}
                variant="outline"
                size="lg"
                style={styles.secondaryButton}
              />
            </View>

            <Text style={styles.devNote}>
              Use "Continue as Guest" for development and testing
            </Text>
          </AnimatedCard>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Secure authentication powered by Microsoft Azure
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
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
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.xl
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl
  },
  logoContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg
  },
  animatedIcon: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  innerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary.main,
    position: 'absolute',
    ...theme.shadows.md
  },
  outerRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: theme.colors.primary.light,
    borderStyle: 'dashed',
    position: 'absolute'
  },
  title: {
    fontSize: theme.typography.sizes.xxxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    textAlign: 'center'
  },
  loginCard: {
    marginBottom: theme.spacing.xl
  },
  cardTitle: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm
  },
  cardSubtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.xl
  },
  buttonContainer: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg
  },
  primaryButton: {
    width: '100%'
  },
  secondaryButton: {
    width: '100%'
  },
  devNote: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic'
  },
  footer: {
    alignItems: 'center',
    paddingTop: theme.spacing.lg
  },
  footerText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.tertiary,
    textAlign: 'center'
  }
});