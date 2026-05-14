import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';

const PostDetailScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            //üst bar kismi
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

            // kaydirilabilir ekran için
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

    // --- YENİ EKLENEN STİLLER ---
    contentContainer: {
        flex: 1,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 20, // Header'dan boşluk
        marginBottom: 15,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24, // Tam yuvarlak olması için genişliğin yarısı
        backgroundColor: '#1E3A8A', // Figma'daki U16 koyu mavi arka planı
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userInfo: {
        marginLeft: 12, // Avatar ile yazı arasındaki boşluk
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
});

export default PostDetailScreen;