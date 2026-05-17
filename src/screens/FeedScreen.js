import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from "../constants/theme";

const MOCK_POSTS = [
    {
        id: '1',
        avatarText: 'B',
        avatarBg: '#6A1B9A',
        authorName: 'Batın Yılmaz',       // <-- Yeni
        authorUsername: '@batinyilmaz233',// <-- Yeni
        title: 'F-35 Programından Çıkarılmadan Kendi Savaş...',
        handle: '@Batın Yılmaz',
        body: "Türkiye, 2028 ile 2030 yılları arasında hava kuvvetlerine 20 adet Block-10 KAAN 5. nesil savaş uçağı teslim edecek; bu, Ankara'nın yerli bir hayalet muharip uçak üretme yeteneğine sahip az sayıdaki ülkeden biri olma yolundaki ...",
        mediaType: 'video',
        mediaSource: require('../../assets/kaan.png'),
        videoDuration: '0:45 / 1:30',
        tags: ['#history', '#türkiye', '#success', '#stealth fighter'],
        likes: 1300000,
        comments: '57',
        views: '8.2M',
        // Yorumlar Listesi (DİNAMİK)
        commentsList: [
            { id: 'c1', avatar: 'M', name: 'Mustafa Özdemir', text: 'Bu çalışma gerçekten gurur verici 🇹🇷' },
            { id: 'c2', avatar: 'A', name: 'Ahmet Yılmaz', text: 'Havacılık tarihimiz için dönüm noktası.' }
        ]
    },
    {
        id: '2',
        avatarText: 'M',
        avatarBg: '#0D47A1',
        authorName: 'Mustafa Özdemir',        // <-- Yeni
        authorUsername: '@mustafaozdemir99', // <-- Yeni
        title: 'Türkiye Mavi Vatan\'da Egemenlik ilan edecek 🇹🇷',
        handle: '@Mustafa Özdemir',
        body: 'Türkiye, Kurban Bayramı sonrası Mavi Vatan kanununu meclise sunacak. Tüm Mavi Vatan sınırlarının belirlenmesi ve hukuki koruma ile devlet korumasına alınması ...',
        mediaType: 'text',
        mediaSource: null,
        videoDuration: null,
        tags: ['#MaviVatan', '#Adalar', '#Türkiye'],
        likes: 413000,
        comments: '239',
        views: '7.4M',
        // Yorumlar Listesi (DİNAMİK)
        commentsList: [
            { id: 'c3', avatar: 'B', name: 'Batın Yılmaz', text: 'Kesinlikle atılması gereken bir adımdı, destekliyoruz!' }
        ]
    }
];

// BAĞIMSIZ KART BİLEŞENİ (Her postun kalbi ve kaydetmesi kendine özel çalışır)
const PostCard = ({ item, navigation }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(item.likes);
    const [isSaved, setIsSaved] = useState(false);

    // Beğeni sayılarını şık formatlamak için yardımcı (Örn: 1300000 -> 1.3M)
    const formatLikes = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toString();
    };

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('PostDetail', { post: item })}
            >
                <View style={styles.cardHeader}>
                    <View style={[styles.avatarPlaceholder, { backgroundColor: item.avatarBg }]}>
                        <Text style={styles.avatarText}>{item.avatarText}</Text>
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.postTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.postHandle}>{item.handle}</Text>
                    </View>
                </View>

                <Text style={styles.postBody}>{item.body}</Text>

                {item.mediaType !== 'text' && (
                    <View style={styles.mediaContainer}>
                        <Image source={item.mediaSource} style={styles.mediaImage} resizeMode="cover" />
                        {item.mediaType === 'video' && (
                            <View style={styles.videoControlsBottom}>
                                <Icon name="play" size={18} color="#FFFFFF" />
                                <Text style={styles.videoTimeText}>{item.videoDuration}</Text>

                                <View style={styles.progressBarContainer}>
                                    <View style={styles.progressBarFill} />
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, paddingRight: 5 }}>
                                    <Icon name="volume-medium" size={18} color="#FFFFFF" />
                                    <Icon name="copy-outline" size={18} color="#FFFFFF" />
                                    <Icon name="expand" size={18} color="#FFFFFF" />
                                </View>
                            </View>
                        )}
                    </View>
                )}

                <View style={styles.tagsContainer}>
                    {item.tags.map((tag, index) => (
                        <View key={index} style={styles.tagBadge}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </TouchableOpacity>

            {/* BUTONLAR BURADA TETİKLENİR VE KARTLA ÇAKIŞMAZ */}
            <View style={styles.interactionBar}>
                <View style={styles.interactionLeft}>
                    <TouchableOpacity
                        style={styles.interactionItem}
                        onPress={() => {
                            setIsLiked(!isLiked);
                            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
                        }}
                    >
                        <Icon name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "#FF3B30" : "#000"} />
                        <Text style={styles.interactionText}>{formatLikes(likeCount)}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.interactionItem}>
                        <Icon name="chatbubble-outline" size={24} color="#000" />
                        <Text style={styles.interactionText}>{item.comments}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.interactionItem}>
                        <Icon name="eye-outline" size={24} color="#000" />
                        <Text style={styles.interactionText}>{item.views}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
                    <Icon name={isSaved ? "bookmark" : "bookmark-outline"} size={24} color={isSaved ? "#000000" : "#000"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const FeedScreen = ({ navigation }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const flatListRef = useRef(null);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* ÜST BAR (HEADER) - YENİ DÜZEN */}
            <View style={styles.header}>
                {/* Sol Kısım: Başlık (Geri oku yok ama genişliği sağ tarafla eşit ki logo tam ortalansın) */}
                <View style={styles.leftContainer}>
                    <Text style={styles.headerTitle}>ANA AKIŞ</Text>
                </View>

                {/* Orta Kısım: Logo (Mutlak Pozisyonla Tam Ortada) */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/nexus-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Sağ Kısım: Bildirim Butonu */}
                <TouchableOpacity style={styles.rightContainer} activeOpacity={0.7}>
                    <View style={styles.iconWrapper}>
                        <Icon name="notifications" size={24} color="#000000" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color="#333333" style={styles.searchIcon} />
                <TextInput style={styles.searchInput} placeholder="Gönderi ara..." placeholderTextColor="#999999" />
            </View>

            <FlatList
                style={{ flex: 1 }}
                ref={flatListRef}
                data={MOCK_POSTS}
                renderItem={({ item }) => <PostCard item={item} navigation={navigation} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
                contentContainerStyle={styles.listContent}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor="#032783" />}
            />

            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={scrollToTop}><Icon name="home" size={28} color="#032783" /></TouchableOpacity>
                <TouchableOpacity><Icon name="compass" size={28} color="#000" /></TouchableOpacity>

                {/* ARTI BUTONU BAĞLANDI */}
                <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
                    <Icon name="add-circle" size={32} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity><Icon name="person" size={28} color="#000" /></TouchableOpacity>
                <TouchableOpacity><Icon name="settings" size={28} color="#000" /></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    // --- YENİLENEN UNIFIED HEADER STİLLERİ ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border, // Gönderi oluştur ekranındaki o hafif stroke çizgisi
        paddingHorizontal: 15
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 120, // Logonun sola kaymaması için sağ tarafla tam eşit genişlik
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    logoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1
    },
    logo: {
        width: 39.87, // Milimetrik genişlik
        height: 37,    // Milimetrik yükseklik
        borderRadius: 10, // Figma'daki o şık yuvarlak köşeler
        overflow: 'hidden' // Resmin köşelerden taşmasını engellemek için
    },
    rightContainer: {
        width: 120, // Sol tarafla tam dengeli genişlik
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 10
    },
    iconWrapper: {
        position: 'relative'
    },
    notificationButton: { width: 100, alignItems: 'flex-end', justifyContent: 'center', position: 'relative' },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#FF3B30',
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FFFFFF'
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold'
    },
    searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 15, marginBottom: 15, height: 36, borderRadius: 10, borderWidth: 1, borderColor: '#D9D9D9', paddingHorizontal: 12, backgroundColor: '#FFFFFF' },
    searchIcon: { marginRight: 8 },
    searchInput: { flex: 1, fontSize: 15, color: '#000000', paddingVertical: 0 },
    listContent: { paddingBottom: 20 },
    listSeparator: { height: 15 },
    cardContainer: { marginHorizontal: 20, backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)', overflow: 'hidden' },
    cardHeader: { flexDirection: 'row', paddingHorizontal: 15, paddingTop: 15, alignItems: 'center' },
    avatarPlaceholder: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
    avatarText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
    headerTextContainer: { marginLeft: 10, flex: 1 },
    postTitle: { fontSize: 16, fontWeight: 'bold', color: '#000000' },
    postHandle: { fontSize: 10, fontWeight: '600', color: '#666666', marginTop: 2 },
    postBody: { fontSize: 14, lineHeight: 20, color: '#000000', paddingHorizontal: 15, paddingTop: 10, paddingBottom: 10 },
    mediaContainer: { marginHorizontal: 15, height: 170, borderRadius: 10, overflow: 'hidden', backgroundColor: '#000000', position: 'relative' },
    mediaImage: { width: '100%', height: '100%' },
    videoControlsBottom: { position: 'absolute', bottom: 10, left: 10, right: 10, flexDirection: 'row', alignItems: 'center' },
    videoTimeText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', marginLeft: 10 },
    progressBarContainer: { flex: 1, height: 3, backgroundColor: 'rgba(255, 255, 255, 0.4)', marginHorizontal: 12, borderRadius: 2 },
    progressBarFill: { width: '40%', height: '100%', backgroundColor: '#FFFFFF', borderRadius: 2 }, tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, marginTop: 10, gap: 8 },
    tagBadge: { backgroundColor: 'rgba(119, 171, 255, 0.7)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
    tagText: { color: '#032783', fontSize: 10, fontWeight: '600' },
    interactionBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 15 },
    interactionLeft: { flexDirection: 'row', alignItems: 'center', gap: 20 },
    interactionItem: { flexDirection: 'row', alignItems: 'center' },
    interactionText: { fontSize: 20, color: '#000000', marginLeft: 6 },
    bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#E5E5E5', paddingBottom: 10 }
});

export default FeedScreen;