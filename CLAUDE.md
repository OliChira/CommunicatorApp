# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native Expo application for company approval workflows. The app implements Microsoft Azure AD authentication using OAuth 2.0 and displays user information after successful login.

## Technology Stack

- **Framework**: React Native with Expo SDK 52
- **Navigation**: React Navigation v7 (Native Stack Navigator)
- **Authentication**: Microsoft Azure AD OAuth 2.0 via expo-auth-session
- **Development**: Expo development tools

## Development Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Project Structure

```
company-approval-app/
├── App.js                 # Main app component with navigation and login logic
├── index.js              # Expo entry point
├── screens/
│   └── HomeScreen.js     # Post-authentication user dashboard
├── assets/               # App icons and splash screens
└── package.json          # Dependencies and scripts
```

## Authentication Architecture

The app uses a two-screen navigation flow:

1. **LoginScreen** (App.js:25-70): Handles Microsoft Azure AD OAuth flow
   - Uses expo-auth-session for OAuth implementation
   - Configured for specific Azure tenant and client ID
   - Exchanges authorization code for ID token
   - Decodes JWT to extract user information

2. **HomeScreen** (screens/HomeScreen.js): Displays authenticated user data
   - Receives decoded JWT claims as navigation params
   - Shows user name, email, and raw token claims

## Key Configuration

- **Azure AD Tenant ID**: `c05b8d5a-b883-4afb-ae93-db5db239911c`
- **Client ID**: `4c4650e0-94a6-4559-8f81-a5b60fe4df5a`
- **OAuth Scopes**: `['openid', 'profile', 'email']`
- **Redirect URI**: Uses Expo's proxy for development

## Development Notes

- The app uses Expo's new architecture (`newArchEnabled: true`)
- WebBrowser session completion is handled for OAuth flows
- JWT decoding happens client-side using jwt-decode library
- Navigation state includes user info from decoded token claims

## Common Development Tasks

When working on authentication:
- Test OAuth flow in Expo Go app or simulator
- Verify Azure AD app registration settings match configuration
- Check redirect URI configuration in both code and Azure portal

When adding new screens:
- Add to Stack.Navigator in App.js
- Follow existing pattern of passing data via route params
- Import and register new screen components