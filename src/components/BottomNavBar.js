import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // 1. Navigasyon kütüphanesini import ettik
import { COLORS } from '../constants/theme';

const BottomNavBar = () => {
    const navigation = useNavigation(); // 2. Kütüphaneyi burada tanımladık

    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navIconContainer} onPress={() => navigation.navigate('Feed')}>
                <Icon name="home" size={26} color="#000000"/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navIconContainer}>
                <Icon name="compass" size={26} color="#000000" />
            </TouchableOpacity>

            {/* Ortadaki + Butonu artık CreatePost ekranını açacak */}
            <TouchableOpacity style={styles.navIconContainer} onPress={() => navigation.navigate('CreatePost')}>
                <Icon name="add-circle" size={30} color="#000000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navIconContainer}>
                <Icon name="person" size={26} color="#000000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navIconContainer}>
                <Icon name="settings" size={26} color="#000000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 400,
        height: 40,
        alignSelf: 'center',
        paddingHorizontal: 20,
        backgroundColor: COLORS.background,
        paddingBottom: 5,
    },
    navIconContainer: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default BottomNavBar;