import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity,TextInput,ScrollView } from 'react-native';
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
            <ScrollView showsVerticalScrollIndicator={false}>
            {/* 2. PARÇA: ARAMA KUTUSU (SEARCH BAR) */}
            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color="#333333" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Gönderi ara..."
                    placeholderTextColor="#999999"
                />
            </View>
            {/* 3. PARÇA: AKIŞ KARTI (POST CARD) */}
            <View style={styles.cardContainer}>


                <View style={styles.cardHeader}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>B</Text>
                    </View>
                    <View style={styles.headerTextContainer}>
                        {/* Figma: Inria Sans, Bold, 16px */}
                        <Text style={styles.postTitle} numberOfLines={1}>
                            F-35 Programından Çıkarılmadan Kendi Savaş...
                        </Text>
                        {/* Figma: Inter, Semi Bold, 10px */}
                        <Text style={styles.postHandle}>@Batın Yılmaz</Text>
                    </View>
                </View>

                <Text style={styles.postBody}>
                    Türkiye, 2028 ile 2030 yılları arasında hava kuvvetlerine 20 adet Block-10 KAAN 5. nesil savaş uçağı teslim edecek; bu, Ankara'nın yerli bir hayalet muharip uçak üretme yeteneğine sahip az sayıdaki ülkeden biri olma yolundaki ...
                </Text>
            </View>

            {/* Medya Alanı */}
                <View style={styles.mediaContainer}>
                    {/* Gerçek veriye bağlayana kadar statik placeholder */}
                    <Image
                        source={require('../../assets/kaan.png')}
                        style={styles.mediaImage}
                        resizeMode="cover"
                    />
                    <View style={styles.videoControls}>
                        <Icon name="play" size={16} color="#FFF" />
                        <Text style={styles.videoTime}>0:45 / 1:30</Text>
                        <View style={{flexDirection: 'row', gap: 10}}>
                            <Icon name="volume-medium" size={16} color="#FFF" />
                            <Icon name="settings-outline" size={16} color="#FFF" />
                            <Icon name="expand" size={16} color="#FFF" />
                        </View>
                    </View>
             </View>
            {/* Etiketler (Tags) */}
            <View style={styles.tagsContainer}>
                <View style={styles.tagBadge}><Text style={styles.tagText}>#history</Text></View>
                <View style={styles.tagBadge}><Text style={styles.tagText}>#türkiye</Text></View>
                <View style={styles.tagBadge}><Text style={styles.tagText}>#success</Text></View>
                <View style={styles.tagBadge}><Text style={styles.tagText}>#stealth fighter</Text></View>
            </View>

            {/* Etkileşim Barı */}
            <View style={styles.interactionBar}>
                <View style={styles.interactionLeft}>
                    <TouchableOpacity style={styles.interactionItem}>
                        <Icon name="heart-outline" size={24} color="#000" />
                        <Text style={styles.interactionText}>1.3M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionItem}>
                        <Icon name="chatbubble-outline" size={24} color="#000" />
                        <Text style={styles.interactionText}>57</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionItem}>
                        <Icon name="eye-outline" size={24} color="#000" />
                        <Text style={styles.interactionText}>8.2M</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Icon name="bookmark-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>


    {/* Alt boşluk */}
    <View style={{height: 30}} />
        </ScrollView>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 15,
        height: 36,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D9D9D9', // Tasarımdaki ince gri çizgi
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#000000',
        paddingVertical: 0, // Android'de input dikeyde kaymasın diye
    },
    cardContainer: {
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)', // Figma: Stroke 000000 %50
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 15,
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#6A1B9A', // Mor B harfi tasarımı
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerTextContainer: {
        marginLeft: 10,
        flex: 1,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    postHandle: {
        fontSize: 10,
        fontWeight: '600',
        color: '#666666',
        marginTop: 2,
    },
    postBody: {
        fontSize: 14,
        lineHeight: 20,
        color: '#000000',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    mediaContainer: {
        marginHorizontal: 15,
        height: 170, // Figma'daki video yüksekliği
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#000000',
        position: 'relative',
    },
    mediaImage: {
        width: '100%',
        height: '100%',
    },
    videoControls: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 8,
        paddingTop: 20,
    },
    videoTime: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right',
        marginRight: 15,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        marginTop: 10,
        gap: 8, // Etiketler arası boşluk
    },
    tagBadge: {
        backgroundColor: 'rgba(119, 171, 255, 0.7)', // Figma: Fill 77ABFF %70
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    tagText: {
        color: '#032783',
        fontSize: 10,
        fontWeight: '600',
    },
    interactionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    interactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20, // Kalp, Yorum ve Göz ikonları arası boşluk
    },
    interactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    interactionText: {
        fontSize: 20,
        color: '#000000',
        marginLeft: 6,
    },
});

export default FeedScreen;
