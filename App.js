import React from 'react';
import { StatusBar } from 'react-native';
import PostDetailScreen from './src/screens/PostDetailScreen'; // Yeni ekranı import ettik
import { COLORS } from './src/constants/theme';

const App = () => {
    return (
        <>
            {/* Durum çubuğunu tasarımına uygun hale getirelim */}
            <StatusBar
                backgroundColor={COLORS.background}
                barStyle="dark-content"
            />

            {/* Şu an sadece PostDetailScreen'i görüntülüyoruz */}
            <PostDetailScreen />
        </>
    );
};

export default App;