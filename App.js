import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

// Ekran İçe Aktarımları (Importlar)
import FeedScreen from './src/screens/FeedScreen'; // YENİ: Ana Akış ekranımızı import ettik
import PostDetailScreen from './src/screens/PostDetailScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import { COLORS } from './src/constants/theme';
import { PostProvider } from './src/context/PostContext';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <PostProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Feed" // YENİ: Uygulama artık ilk olarak Feed (Ana Akış) ekranıyla açılacak
                    screenOptions={{ headerShown: false }} // Kendi özel header'larımızı kullandığımız için bunu gizliyoruz
                >
                    {/* 1. Ana Akış Ekranı */}
                    <Stack.Screen name="Feed" component={FeedScreen} />

                    {/* 2. Gönderi Detay Ekranı */}
                    <Stack.Screen name="PostDetail" component={PostDetailScreen} />

                    {/* 3. Gönderi Oluşturma Ekranı */}
                    <Stack.Screen name="CreatePost" component={CreatePostScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PostProvider>
    );
};

export default App;