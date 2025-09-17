import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen({ route }) {
  const { userInfo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userInfo.name}!</Text>
      <Text>Email: {userInfo.email}</Text>
      <Text style={{ marginTop: 20 }}>Raw Claims:</Text>
      <Text selectable>{JSON.stringify(userInfo, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});