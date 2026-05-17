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
                <Icon name="home" size={28} color="#000000"/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navIconContainer}>
                <Icon name="compass" size={28} color="#000000" />
            </TouchableOpacity>

            {/* Ortadaki + Butonu artık CreatePost ekranını açacak */}
            <TouchableOpacity style={styles.navIconContainer} onPress={() => navigation.navigate('CreatePost')}>
                <Icon name="add-circle" size={32} color="#000000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navIconContainer}>
                <Icon name="person" size={28} color="#000000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navIconContainer}>
                <Icon name="settings" size={28} color="#000000" />
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
        height: 60, // İkonların rahat durması için 60 idealdir
        alignSelf: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        paddingBottom: 10, // Alt çentikli ekranlar için güvenli alan

        // --- İŞTE HER EKRANA ÇİZGİYİ ATAN YENİ ÖZELLİKLER ---
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5', // Üst bar ile birebir aynı tonda tok gri çizgi
    },
    navIconContainer: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default BottomNavBar;