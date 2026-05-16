import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import PostDetailScreen from './src/screens/PostDetailScreen';
import CreatePostScreen from './src/screens/CreatePostScreen'; // Yeni ekranı import ettik
import { COLORS } from './src/constants/theme';
import { PostProvider } from './src/context/PostContext';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <PostProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="PostDetail"
                    screenOptions={{ headerShown: false }} // Kendi özel header'larımızı kullandığımız için bunu gizliyoruz
                >
                    {/* Akış / Anasayfa Ekranı */}
                    <Stack.Screen name="PostDetail" component={PostDetailScreen} />

                    {/* Gönderi Oluşturma Ekranı */}
                    <Stack.Screen name="CreatePost" component={CreatePostScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PostProvider>
    );
};

export default App;