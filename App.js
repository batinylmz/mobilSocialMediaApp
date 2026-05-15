import React from 'react';
import { StatusBar } from 'react-native';
import { PostProvider } from './src/context/PostContext';
import PostDetailScreen from './src/screens/PostDetailScreen'; // Yeni ekranı import ettik
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