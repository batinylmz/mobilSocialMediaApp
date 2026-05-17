import React, { useContext } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context
import { AuthContext } from '../context/AuthContext';

// Ekranlar
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

// Henüz oluşturmadığın Ana Sayfa için geçici bir dummy (sahte) ekran
const DummyMainScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Ana Sayfa - Yapım Aşamasında</Text>
  </View>
);

export default function RootNavigator() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3882F6" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // Kullanıcı giriş yapmışsa Ana Ekrana yönlendir
        <Stack.Screen name="Main" component={DummyMainScreen} />
      ) : (
        // Kullanıcı giriş yapmamışsa Login ekranını göster
        <Stack.Screen name="Auth" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}