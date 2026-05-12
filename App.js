import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import CreatePostScreen from './src/screens/CreatePostScreen';

const App = () => {
    return (
        // SafeAreaView çentiğin (notch) arkasında kalmasını engeller
        <SafeAreaView style={styles.container}>
            {/* StatusBar uygulamanın en üstündeki saat/pil çubuğudur */}
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <CreatePostScreen />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Arka plan rengi
    },
});

export default App;