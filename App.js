import React from 'react';
import ExploreScreen from './src/screens/ExploreScreen'; // Zeynep'in ekranı eklendi
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
                    {/* Zeynep'in Keşfet ekranını navigasyon ağımıza kaydettik */}
                    <Stack.Screen name="Explore" component={ExploreScreen} /> 
                </Stack.Navigator>
            </NavigationContainer>
        </PostProvider>
    );
};

export default App;