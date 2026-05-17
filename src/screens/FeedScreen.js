import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import { COLORS } from '../constants/theme'; // Kendi renk dosyan varsa kullanabilirsin

const FeedScreen = () => {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>ANA AKIŞ</Text>

                <Image
                    source={require('../../assets/nexus-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                {/* Sağ: Bildirim Zili ve Rozet */}
                <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
                    <Icon name="notifications" size={24} color="#000000" />

                    {/* Kırmızı Rozet (Badge) */}
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Tasarımdaki bembeyaz arka plan
    },
    // --- 1. PARÇA STİLLERİ ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20, // Tasarımdaki yan boşluklar
        height: 50, // Figma'daki 440x50 ölçüsünün yüksekliği
    },
    headerTitle: {
        fontSize: 20, // Figma'daki Bold 20 ölçüsü
        fontWeight: 'bold',
        color: '#000000',
        width: 100, // Orta logonun kaymaması için sol ve sağ genişlikleri dengeliyoruz
    },
    logo: {
        width: 40,
        height: 40,
    },
    notificationButton: {
        width: 100, // Sağ tarafı sol tarafla (100) eşitliyoruz ki logo tam ortada kalsın
        alignItems: 'flex-end', // İkonu en sağa yasla
        justifyContent: 'center',
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#FF3B30', // Bildirim kırmızısı
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        borderWidth: 1.5,
        borderColor: '#FFFFFF', // İkonun üzerine bindiğinde şık dursun diye beyaz çerçeve
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default FeedScreen;
