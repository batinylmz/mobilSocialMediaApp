import React,{useState, useRef} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity,TextInput,FlatList,RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import { COLORS } from '../constants/theme'; // Kendi renk dosyan varsa kullanabilirsin

const MOCK_POSTS = [
    {
        id: '1',
        avatarText: 'B',
        avatarBg: '#6A1B9A',
        title: 'F-35 Programından Çıkarılmadan Kendi Savaş...',
        handle: '@Batın Yılmaz',
        body: "Türkiye, 2028 ile 2030 yılları arasında hava kuvvetlerine 20 adet Block-10 KAAN 5. nesil savaş uçağı teslim edecek; bu, Ankara'nın yerli bir hayalet muharip uçak üretme yeteneğine sahip az sayıdaki ülkeden biri olma yolundaki ...",
        mediaType: 'video',
        mediaSource: require('../../assets/post_image.png'),
        videoDuration: '0:45 / 1:30',
        tags: ['#history', '#türkiye', '#success', '#stealth fighter'],
        likes: '1.3M',
        comments: '57',
        views: '8.2M'
    },
    {
        id: '2',
        avatarText: 'M',
        avatarBg: '#0D47A1',
        title: 'Türkiye Mavi Vatan\'da Egemenlik ilan edecek 🇹🇷',
        handle: '@Mustafa Özdemir',
        body: 'Türkiye, Kurban Bayramı sonrası Mavi Vatan kanununu meclise sunacak. Tüm Mavi Vatan sınırlarının belirlenmesi ve hukuki koruma ile devlet korumasına alınması ...',
        mediaType: 'text',
        mediaSource: null,
        videoDuration: null,
        tags: ['#MaviVatan', '#Adalar', '#Türkiye'],
        likes: '413K',
        comments: '239',
        views: '7.4M'
    }
];





const FeedScreen = () => {
    // 1. Aşağı Çekip Yenileme State'i
    const [isRefreshing, setIsRefreshing] = useState(false);

    // 2. Listeyi en üste kaydırmak için Ref
    const flatListRef = useRef(null);

    // Yenileme Animasyonu Fonksiyonu
    const handleRefresh = () => {
        setIsRefreshing(true);
        // Gerçekte burada API'den yeni veriler çekilir. Şimdilik 1.5 saniye sonra dönmeyi durduruyoruz.
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1500);
    };
    // Ev (Home) İkonuna Basıldığında En Üste Çıkma Fonksiyonu
    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    };

    const renderPostItem = ({ item }) => {
        return (
            <View style={styles.cardContainer}>
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
                        <Image
                            source={item.mediaSource}
                            style={styles.mediaImage}
                            resizeMode="cover"
                        />
                        {item.mediaType === 'video' && (
                            <View style={styles.videoControls}>
                                <Icon name="play" size={16} color="#FFF" />
                                <Text style={styles.videoTime}>{item.videoDuration}</Text>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <Icon name="volume-medium" size={16} color="#FFF" />
                                    <Icon name="settings-outline" size={16} color="#FFF" />
                                    <Icon name="expand" size={16} color="#FFF" />
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

                <View style={styles.interactionBar}>
                    <View style={styles.interactionLeft}>
                        <TouchableOpacity style={styles.interactionItem}>
                            <Icon name="heart-outline" size={24} color="#000" />
                            <Text style={styles.interactionText}>{item.likes}</Text>
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
                    <TouchableOpacity>
                        <Icon name="bookmark-outline" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* ÜST BAR (HEADER) */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>ANA AKIŞ</Text>
                <Image
                    source={require('../../assets/nexus-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
                    <Icon name="notifications" size={24} color="#000000" />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>

//arama cubugu olusturuldu sabit olacak sekılde
            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color="#333333" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Gönderi ara..."
                    placeholderTextColor="#999999"
                />
            </View>

            {/* DİNAMİK AKIŞ LİSTESİ */}
            <FlatList
                ref={flatListRef} // En üste çıkma işlemini yapabilmek için ref bağladık
                data={MOCK_POSTS}
                renderItem={renderPostItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
                contentContainerStyle={styles.listContent}
                // Aşağı çekip yenileme (Pull to Refresh) eklentisi
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        tintColor="#032783" // Yükleniyor ikonunun rengi (Figma laciverti)
                    />
                }
            />

            {/* ALT NAVİGASYON BARI (Figma'daki alt kısım) */}
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={scrollToTop}>
                    <Icon name="home" size={28} color="#032783" /> {/* Tıklayınca listeyi başa sarar */}
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="compass" size={28} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="add-circle" size={32} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="person" size={28} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="settings" size={28} color="#000" />
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
    listContent: {
        paddingBottom: 20, // Alt menü ile aradaki boşluk
    },
    listSeparator: {
        height: 15,
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
