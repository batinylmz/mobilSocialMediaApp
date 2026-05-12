import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import CreatePostScreen from './src/screens/CreatePostScreen'; // Default import

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Üst barın (saat/pil) beyaz arka planda siyah ikonlarla görünmesi için */}
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.content}>
                <CreatePostScreen />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
    },
});

export default App;