import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';

const PostDetailScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* 1. Kısım: Üst Bar (Header) - Figma'ya Göre Güncellendi */}
            <View style={styles.header}>
                {/* Sol Taraf: Geri Butonu ve Başlık */}
                <TouchableOpacity style={styles.backButtonContainer}>
                    <Icon name="chevron-back" size={24} color={COLORS.textMain} />
                    <Text style={styles.headerTitle}>Gönderi Detayı</Text>
                </TouchableOpacity>

                {/* Orta Kısım: Nexus Logosu (Figma: 39.87 x 37) */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/nexus-logo.png')}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingHorizontal: 15, // Sol taraftan boşluk (Figma: X:15)
    },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 175,
        zIndex: 10, // Tıklanabilirliği garanti altına almak için
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginLeft: 5,
    },
    logoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
    },
    logo: {
        width: 39.87,
        height: 37,
        borderRadius: 10,
    },
});

export default PostDetailScreen;