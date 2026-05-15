import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { PostProvider } from './src/context/PostContext';
import PostDetailScreen from './src/screens/PostDetailScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';// Yeni ekranı import ettik
import { COLORS } from './src/constants/theme';
const App = () => {
    return (
        <PostProvider>
            {/* Durum çubuğunu tasarımına uygun hale getirelim */}
            <StatusBar
                backgroundColor={COLORS.background}
                barStyle="dark-content"
            />

            {/* Şu an sadece PostDetailScreen'i görüntülüyoruz */}
            <PostDetailScreen />
        </PostProvider>
    );
};

export default App;