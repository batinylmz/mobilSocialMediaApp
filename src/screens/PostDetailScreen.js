import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';

const PostDetailScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* 1. Kısım: Üst Bar (Header) */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButtonContainer}>
                    <Icon name="chevron-back" size={24} color={COLORS.textMain} />
                    <Text style={styles.headerTitle}>Gönderi Detayı</Text>
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/nexus-logo.png')}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                </View>
            </View>

            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>

                {/* 2. Kısım: Kullanıcı Profili */}
                <View style={styles.profileSection}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>U16</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Kullanıcı 16</Text>
                        <Text style={styles.userHandle}>@user162327</Text>
                    </View>
                </View>

                {/* 3. Kısım: Gönderi Başlığı ve İçerik Metni */}
                <View style={styles.textSection}>
                    <Text style={styles.postTitle}>
                        F-35 Programından Çıkarılmadan Kendi Savaş Uçağını Üretmeye Türkiye'nin KAAN Programı Hızla İlerliyor 🇹🇷
                    </Text>
                    <Text style={styles.postParagraph}>
                        Türkiye, 2028 ile 2030 yılları arasında hava kuvvetlerine 20 adet Block-10 KAAN 5. nesil savaş uçağı teslim edecek; bu, Ankara'nın yerli bir hayalet muharip uçak üretme yeteneğine sahip az sayıdaki ülkeden biri olma yolundaki hamlesini hızlandırıyor.
                    </Text>
                    <Text style={[styles.postParagraph, { marginTop: 10 }]}>
                        KAAN programı, ABD'nin Rusya'dan S-400 hava savunma sistemlerini satın alması nedeniyle Türkiye'yi F-35 projesinden çıkarmasının ardından büyük bir ivme kazandı.
                    </Text>
                </View>

                {/* 4. Kısım: Medya Oynatıcı (KAAN Uçağı) */}
                <View style={styles.mediaWrapper}>
                    <Image
                        source={require('../../assets/kaan.png')}
                        style={styles.mediaImage}
                        resizeMode="cover"
                    />

                    {/* Video Kontrol Arayüzü (Resmin Üzerine Biniyor) */}
                    <View style={styles.videoControlsOverlay}>

                        {/* İlerleme Çubuğu (Progress Bar) */}
                        <View style={styles.progressBarBg}>
                            <View style={styles.progressBarFill} />
                        </View>

                        {/* Alt Kontrol Paneli */}
                        <View style={styles.controlRow}>
                            {/* Sol: Play İkonu */}
                            <Icon name="play" size={18} color="#FFFFFF" />

                            {/* Sağ: Süre ve Diğer İkonlar */}
                            <View style={styles.rightControls}>
                                <Text style={styles.timeText}>0:45 / 1:30</Text>
                                <Icon name="volume-medium" size={14} color="#FFFFFF" style={styles.controlIcon} />
                                <Icon name="settings-outline" size={14} color="#FFFFFF" style={styles.controlIcon} />
                                {/* Figma'daki pencere ikonu için benzer bir ikon */}
                                <Icon name="browsers-outline" size={14} color="#FFFFFF" style={styles.controlIcon} />
                                <Icon name="expand-outline" size={14} color="#FFFFFF" style={styles.controlIcon} />
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', alignItems: 'center', height: 60, borderBottomWidth: 1, borderBottomColor: COLORS.border, paddingHorizontal: 15 },
    backButtonContainer: { flexDirection: 'row', alignItems: 'center', width: 175, zIndex: 10 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginLeft: 5 },
    logoContainer: { position: 'absolute', left: 0, right: 0, alignItems: 'center', zIndex: 1 },
    logo: { width: 39.87, height: 37, borderRadius: 10 },
    contentContainer: { flex: 1 },
    profileSection: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 20, marginBottom: 15 },
    avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#1E3A8A', justifyContent: 'center', alignItems: 'center' },
    avatarText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    userInfo: { marginLeft: 12 },
    userName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    userHandle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },
    textSection: { paddingHorizontal: 15, marginBottom: 15 },
    postTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 10, lineHeight: 22 },
    postParagraph: { fontSize: 14, color: COLORS.textMain, lineHeight: 20 },

    //  (MEDYA ALANI) bu sekilde tasarlandi.
    mediaWrapper: {
        width: 396,
        height: 220,
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden', // Köşelerin yuvarlatılmasını zorunlu kılar
        backgroundColor: '#000', // Resim yüklenene kadar siyah arkaplan
    },
    mediaImage: {
        width: '100%',
        height: '100%',
    },
    videoControlsOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        // Alt kısma hafif siyah bir gradient/gölge etkisi vermek iyi olur ama şimdilik Figma'daki gibi sade bırakıyoruz
    },
    progressBarBg: {
        height: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 1.5,
        marginBottom: 8,
    },
    progressBarFill: {
        width: '50%', // 0:45 / 1:30 olduğu için yarısı dolu
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 1.5,
    },
    controlRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        color: '#FFFFFF',
        fontSize: 10, // Figma'daki çok küçük metin boyutuna uygun
        marginRight: 12,
    },
    controlIcon: {
        marginLeft: 12, // İkonlar arası boşluk
    },
});

export default PostDetailScreen;