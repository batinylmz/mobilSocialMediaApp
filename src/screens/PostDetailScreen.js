import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';
import BottomNavBar from '../components/BottomNavBar';

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
                        source={require('../../assets/nexus-logo.png')}
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
                    <View style={styles.videoControlsOverlay}>
                        <View style={styles.progressBarBg}>
                            <View style={styles.progressBarFill} />
                        </View>
                        <View style={styles.controlRow}>
                            <Icon name="play" size={18} color="#FFFFFF" />
                            <View style={styles.rightControls}>
                                <Text style={styles.timeText}>0:45 / 1:30</Text>
                                <Icon name="volume-medium" size={14} color="#FFFFFF" style={styles.controlIcon} />
                                <Icon name="settings-outline" size={14} color="#FFFFFF" style={styles.controlIcon} />
                                <Icon name="browsers-outline" size={14} color="#FFFFFF" style={styles.controlIcon} />
                                <Icon name="expand-outline" size={14} color="#FFFFFF" style={styles.controlIcon} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* 5. Kısım: Etiketler ve Etkileşim Butonları */}
                <View style={styles.interactionSection}>

                    {/* Etiketler (Tags) */}
                    <View style={styles.tagsContainer}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>#history</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>#türkiye</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>#success</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>#stealth fighter</Text>
                        </View>
                    </View>

                    {/* Aksiyon Butonları (Beğen ve Kaydet) */}
                    <View style={styles.actionButtonsContainer}>
                        {/* Beğen Butonu */}
                        <TouchableOpacity style={styles.actionButton}>
                            <Icon name="heart-outline" size={20} color={COLORS.textMain} />
                            <Text style={styles.actionButtonText}>1.3M</Text>
                        </TouchableOpacity>

                    {/* Kaydet Butonu (Figma'daki 36x30 ölçüsü) */}
                    <TouchableOpacity style={styles.bookmarkButton}>
                        <Icon name="bookmark-outline" size={20} color={COLORS.textMain} />
                    </TouchableOpacity>
                </View>

                    {/* 6. Kısım: Yorumlar Başlığı ve Girdi Alanı */}
                    <View style={styles.commentsSection}>
                        <Text style={styles.commentsHeader}>Yorumlar (3)</Text>

                        <View style={styles.commentInputContainer}>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="Yorum ekle..."
                                placeholderTextColor={COLORS.textSecondary}
                            />
                            {/* Gönder (Kağıt Uçak) Butonu */}
                            <TouchableOpacity style={styles.sendButton}>
                                <Icon name="send" size={16} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* 7. Kısım: Yorum Kartı */}
                    <View style={styles.commentCard}>
                        {/* Sol Taraf: Yorum Yapanın Profil Fotoğrafı (Sen) */}
                        <View style={styles.commentAvatar}>
                            <Text style={styles.commentAvatarText}>B</Text>
                        </View>

                        {/* Sağ Taraf: İsim ve Yorum Metni */}
                        <View style={styles.commentContent}>
                            <Text style={styles.commentAuthor}>Batın Yılmaz</Text>
                            <Text style={styles.commentText}>Bu çalışma gerçekten gurur verici 🇹🇷</Text>
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
    mediaWrapper: { width: 396, height: 220, alignSelf: 'center', borderRadius: 10, overflow: 'hidden', backgroundColor: '#000' },
    mediaImage: { width: '100%', height: '100%' },
    videoControlsOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10 },
    progressBarBg: { height: 3, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 1.5, marginBottom: 8 },
    progressBarFill: { width: '50%', height: '100%', backgroundColor: '#FFFFFF', borderRadius: 1.5 },
    controlRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    rightControls: { flexDirection: 'row', alignItems: 'center' },
    timeText: { color: '#FFFFFF', fontSize: 10, marginRight: 12 },
    controlIcon: { marginLeft: 12 },


    interactionSection: {
        paddingHorizontal: 15,
        marginTop: 15,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    tag: {
        backgroundColor: 'rgba(119, 171, 255, 0.7)', // #77ABFF %70 Opacity
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
        marginRight: 8,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagText: {
        color: '#032783', // Figma kesin yazı rengi
        fontSize: 12, // Figma kesin font boyutu
        fontWeight: 'normal', // Istok Web Regular
        includeFontPadding: false, // Android ortalama için
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20, // Altındaki yorumlara boşluk
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.tagBackground, // Açık gri
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 10,
        height: 30, // Figma yüksekliği
    },
    actionButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginLeft: 6,
    },
    bookmarkButton: {
        backgroundColor: COLORS.tagBackground,
        width: 36, // Figma ölçüsü
        height: 30, // Figma ölçüsü
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Yeni ekledigim styleler
    commentsSection: {
        paddingHorizontal: 15,
        marginTop: 5,
    },
    commentsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginBottom: 12,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    commentInput: {
        flex: 1,
        height: 36,
        backgroundColor: 'rgba(229, 228, 226, 0.5)', // #E5E4E2 %50 Opaklık
        borderRadius: 5,
        paddingHorizontal: 15,
        marginRight: 10, // Gönder butonu ile arasına boşluk
        fontSize: 14,
        color: COLORS.textMain,
    },
    sendButton: {
        width: 36,
        height: 36,
        backgroundColor: 'rgba(30, 58, 138, 0.6)', // #1E3A8A %60 Opaklık
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 2,
    },

    //  GÜNCELLENEN STİLLER
    commentCard: {
        flexDirection: 'row',
        alignItems: 'center',

        height: 60,
        backgroundColor: 'rgba(229, 228, 226, 0.3)', // #E5E4E2 %30
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)', // #000000 %30
        borderRadius: 5,
        marginHorizontal: 15,
        paddingHorizontal: 15,
        marginBottom: 30,
    },
    commentAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#1E3A8A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    commentAvatarText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    commentContent: {
        flex: 1,
        justifyContent: 'center',
    },
    commentAuthor: {
        fontSize: 14, // Figma: 14
        fontWeight: '600', // Figma: Semi Bold
        color: COLORS.textMain,
    },
    commentText: {
        fontSize: 13,
        color: COLORS.textMain,
        marginTop: 2,
    },
    // (ALT GEZİNME ÇUBUĞU)
    bottomNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // İkonlar arasına Figma'daki 60px boşluğu otomatik yayar
        width: '100%', // Tüm ekranı kaplasın
        maxWidth: 400, // Figma'daki maksimum 400px genişliği aşmasın
        height: 40,
        alignSelf: 'center',
        paddingHorizontal: 20,
        backgroundColor: COLORS.background, // Arkaplanla aynı renk
        paddingBottom: 5, // Cihazların alt çentikleri için ufak bir pay
    },
    navIconContainer: {
        width: 30, // Figma: 30x30 ölçüsü
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PostDetailScreen;