import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import FeedScreen from './src/screens/FeedScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import { PostProvider } from './src/context/PostContext';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <PostProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Feed"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Feed" component={FeedScreen} />
                    <Stack.Screen name="PostDetail" component={PostDetailScreen} />
                    <Stack.Screen name="CreatePost" component={CreatePostScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PostProvider>
    );
};

export default App;