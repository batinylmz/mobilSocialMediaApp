import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';

const PostDetailScreen = () => {
    return (
        <SafeAreaView style={styles.container}>

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

            </ScrollView>
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
        paddingHorizontal: 15,
    },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 175,
        zIndex: 10,
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
    contentContainer: {
        flex: 1,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 20,
        marginBottom: 15,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#1E3A8A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userInfo: {
        marginLeft: 12,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textMain,
    },
    userHandle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 2,
    },


    textSection: {
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginBottom: 10,
        lineHeight: 22, // Okunabilirliği artırmak için
    },
    postParagraph: {
        fontSize: 14,
        color: COLORS.textMain,
        lineHeight: 20, // Paragrafların Figma'daki gibi nizami durması için
    },
});

export default PostDetailScreen;