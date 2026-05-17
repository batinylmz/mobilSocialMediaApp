import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import firestore from '@react-native-firebase/firestore';
import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from "../constants/theme";



// BAĞIMSIZ KART BİLEŞENİ (Her postun kalbi ve kaydetmesi kendine özel çalışır)
const PostCard = ({ item, navigation }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(item.likes || 0);
    const [isSaved, setIsSaved] = useState(false);

    const formatLikes = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num ? num.toString() : '0';
    };

    const avatarBgColor = item.avatarBg || '#0D47A1';
    const avatarLetter = item.authorName ? item.authorName.charAt(0).toUpperCase() : 'U';
    const tagList = item.tags || [];

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                activeOpacity={0.9}
                delayPressIn={100}
                onPress={() => navigation.navigate('PostDetail', { post: item })}
            >
                <View style={styles.cardHeader}>
                    <View style={[styles.avatarPlaceholder, { backgroundColor: avatarBgColor }]}>
                        <Text style={styles.avatarText}>{avatarLetter}</Text>
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.postTitle} numberOfLines={1}>{item.authorName || 'İsimsiz'}</Text>
                        <Text style={styles.postHandle}>{item.authorUsername || '@kullanici'}</Text>
                    </View>
                </View>

                {item.postTitle ? <Text style={[styles.postTitle, {paddingHorizontal: 15}]}>{item.postTitle}</Text> : null}
                {item.postContent ? <Text style={styles.postBody}>{item.postContent}</Text> : null}

                {item.mediaType === 'image' && item.mediaUrl ? (
                    <View style={styles.mediaContainer}>
                        <Image
                            source={{ uri: item.mediaUrl }}
                            style={styles.mediaImage}
                            resizeMode="cover"
                        />
                    </View>
                ) : item.mediaType === 'video' && item.mediaUrl ? (
                    <View style={styles.mediaContainer}>
                        <Video
                            source={{ uri: item.mediaUrl }}
                            style={styles.mediaImage}
                            resizeMode="cover"
                            repeat={true}
                            muted={true}
                            paused={false}
                        />
                        <View style={styles.videoControlsBottom}>
                            <Icon name="play" size={18} color="#FFFFFF" />
                            <Text style={styles.videoTimeText}>{item.videoDuration || '0:00'}</Text>
                            <View style={styles.progressBarContainer}>
                                <View style={styles.progressBarFill} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, paddingRight: 5 }}>
                                <Icon name="volume-mute" size={18} color="#FFFFFF" />
                                <Icon name="copy-outline" size={18} color="#FFFFFF" />
                                <Icon name="expand" size={18} color="#FFFFFF" />
                            </View>
                        </View>
                    </View>
                ) : null}

                <View style={styles.tagsContainer}>
                    {tagList.map((tag, index) => (
                        <View key={index} style={styles.tagBadge}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </TouchableOpacity>

            <View style={styles.interactionBar}>
                <View style={styles.interactionLeft}>
                    <TouchableOpacity style={styles.interactionItem} onPress={() => { setIsLiked(!isLiked); setLikeCount(isLiked ? likeCount - 1 : likeCount + 1); }}>
                        <Icon name={isLiked ? "heart" : "heart-outline"} size={22} color={isLiked ? "#FF3B30" : "#000"} />
                        <Text style={styles.interactionText}>{formatLikes(likeCount)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionItem}>
                        <Icon name="chatbubble-outline" size={20} color="#000" />
                        <Text style={styles.interactionText}>{item.comments || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionItem}>
                        <Icon name="eye-outline" size={22} color="#000" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
                    <Icon name={isSaved ? "bookmark" : "bookmark-outline"} size={22} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const FeedScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const flatListRef = useRef(null);
    React.useEffect(() => {
        // 'Posts' koleksiyonunu dinliyoruz (Senin Firebase'de yazdığın gibi baş harfi büyük)
        const subscriber = firestore()
            .collection('Posts')
            .orderBy('createdAt', 'desc') // En yeni postlar en üstte görünsün
            .onSnapshot(querySnapshot => {
                const postsArray = [];

                if (querySnapshot) {
                    querySnapshot.forEach(documentSnapshot => {
                        postsArray.push({
                            id: documentSnapshot.id,
                            ...documentSnapshot.data(),
                        });
                    });
                }

                setPosts(postsArray);
            }, error => {
                console.error("Firebase'den veri çekilirken hata:", error);
            });

        // Ekran kapanırsa dinlemeyi bırak
        return () => subscriber();
    }, []);


    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    // FIREBASE'E TEK TIKLA VERİ YÜKLEME FONKSİYONU
    const uploadMockDataToFirebase = async () => {
        const dummyData = [
            {
                authorName: "Togg Günlükleri",
                authorUsername: "@togg_tr",
                avatarText: "T",
                avatarBg: "#00BCD4",
                postTitle: "T10X 1.5 Yazılım Güncellemesi Yayında 🇹🇷",
                postContent: "Togg T10X akıllı cihazlarımız için merakla beklenen 1.5 yazılım güncellemesi OTA üzerinden dağıtılmaya başlandı. Yeni arayüz tasarımı, geliştirilmiş şerit takip sistemi, yüz tanıma hızı ve Trumore entegrasyonu ile sürüş deneyimi bir üst seviyeye çıkıyor.",
                mediaType: "image",
                mediaUrl: "https://images.pexels.com/photos/16775824/pexels-photo-16775824.jpeg", // Doğru direkt link
                likes: 214000,
                comments: 1450,
                tags: ["#togg", "#t10x", "#yerliüretim"],
                createdAt: new Date() // Hata vermemesi için düzeltildi
            },
            {
                authorName: "Kara Kartal Haber",
                authorUsername: "@bjk_haber",
                avatarText: "B",
                avatarBg: "#000000",
                postTitle: "Sahadaki Maestro: Orkun Kökçü 🦅",
                postContent: "Orkun bu sezon orta sahada adeta bir maestro gibi takımın hücum hattını yönetiyor. Topu ayağına her aldığında tribünleri heyecanlandıran bu yetenek, şampiyonluk yolundaki en büyük kozlarımızdan biri. Sergen Yalçın dönemindeki o hücum presini hatırlatıyor!",
                mediaType: "text",
                mediaUrl: null,
                likes: 185000,
                comments: 2100,
                tags: ["#beşiktaş", "#orkunkökçü", "#süperlig"],
                createdAt: new Date()
            },
            {
                authorName: "Spor Gündemi",
                authorUsername: "@spor_global",
                avatarText: "S",
                avatarBg: "#E53935",
                postTitle: "2026 FIFA Dünya Kupası Elemelerinde Son Durum ⚽",
                postContent: "Kuzey Amerika'nın ev sahipliği yapacağı 2026 Dünya Kupası elemeleri tüm hızıyla devam ediyor. Yeni formatla birlikte artan takım sayısı, turnuvaya katılma şansını artırsa da grup aşamalarındaki rekabet zirveye çıkmış durumda.",
                mediaType: "image",
                mediaUrl: "https://images.pexels.com/photos/34201721/pexels-photo-34201721.jpeg", // Direkt jpeg'e çevrildi
                likes: 13479,
                comments: 890,
                tags: ["#worldcup2026", "#futbol", "#dünyakupası"],
                createdAt: new Date()
            },
            {
                authorName: "Doğa Yürüyüşçüsü",
                authorUsername: "@kampci_gezgin",
                avatarText: "D",
                avatarBg: "#2E7D32",
                postTitle: "Hafta Sonu Kampı İçin İdeal Rota 🌲",
                postContent: "Şehrin gürültüsünden uzaklaşıp sadece doğanın sesini dinlemek gibisi yok. Ekipmanlarınızı hazırlarken çadırınızın zemin izolasyonuna dikkat etmeyi unutmayın. Bu hafta sonu Karagöl civarında harika bir sonbahar manzarası var.",
                mediaType: "video",
                mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", // Test mp4 (Çalışması için)
                videoDuration: "0:17",
                likes: 14338,
                comments: 410,
                tags: ["#doğa", "#kamp", "#huzur"],
                createdAt: new Date()
            },
            {
                authorName: "Yapay Zeka Haberleri",
                authorUsername: "@ai_turkiye",
                avatarText: "A",
                avatarBg: "#8E24AA",
                postTitle: "Yapay Zeka ile Video Üretiminde Yeni Çağ 🤖",
                postContent: "Sadece metin komutları yazarak saniyeler içinde sinematik videolar üretebilen yeni yapay zeka modelleri sektörü sarsıyor. İçerik üreticileri için sınırlar tamamen ortadan kalktı.",
                mediaType: "video",
                mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Test mp4
                videoDuration: "0:08",
                likes: 11459,
                comments: 113,
                tags: ["#yapayzeka", "#ai", "#teknoloji"],
                createdAt: new Date()
            },
            {
                authorName: "Günün Kahvesi",
                authorUsername: "@barista_gunlugu",
                avatarText: "G",
                avatarBg: "#795548",
                postTitle: "Kusursuz Espresso İçin İpuçları ☕",
                postContent: "İyi bir espresso shot almak için kahve çekirdeklerinizin taze kavrulmuş olması kadar, öğütme derecesi ve tamping basıncı da çok önemlidir. 9 bar basınç ve 25 saniyelik akış süresi altındır.",
                mediaType: "image",
                mediaUrl: "https://images.pexels.com/photos/30226644/pexels-photo-30226644.jpeg", // Direkt jpeg'e çevrildi
                likes: 37741,
                comments: 132,
                tags: ["#kahve", "#espresso", "#barista"],
                createdAt: new Date()
            },
            {
                authorName: "Müzik Molası",
                authorUsername: "@vinyl_records",
                avatarText: "M",
                avatarBg: "#D81B60",
                postTitle: "Plak Dinlemenin Verdiği O Nostaljik His 🎵",
                postContent: "Dijital müziğin kusursuzluğundan sıkılanlar için plağın o hafif cızırtılı ve sıcak analog sesi her zaman sığınılacak bir limandır. Pikaba iğneyi koyduğunuz o ilk anın hissiyatı bambaşka.",
                mediaType: "text",
                mediaUrl: null,
                likes: 18900,
                comments: 245,
                tags: ["#müzik", "#plak", "#nostalji"],
                createdAt: new Date()
            },
            {
                authorName: "Animasyon Stüdyosu",
                authorUsername: "@3d_arts",
                avatarText: "A",
                avatarBg: "#F4511E",
                postTitle: "Açık Kaynak Animasyon Projesi Yayında! 🎬",
                postContent: "Aylardır üzerinde çalıştığımız kısa animasyon filmimizin render işlemleri nihayet bitti. Işıklandırma ve fizik motoru simülasyonları sistemlerimizi oldukça zorladı ama sonuca değdi.",
                mediaType: "image",
                mediaUrl: "https://images.pexels.com/photos/11901222/pexels-photo-11901222.jpeg", // Direkt jpeg'e çevrildi
                likes: 2120,
                comments: 11,
                tags: ["#animasyon", "#3d", "#render", "#blender"],
                createdAt: new Date()
            },
            {
                authorName: "Finans Piyasaları",
                authorUsername: "@ekonomi_borsa",
                avatarText: "F",
                avatarBg: "#00695C",
                postTitle: "Faiz Kararları Sonrası Piyasalar Hareketli 📈",
                postContent: "Merkez bankalarının peş peşe açıkladığı faiz oranları sonrası borsa endekslerinde dalgalanmalar sürüyor. Uzmanlar yatırımcıların portföy çeşitliliğine dikkat etmesi gerektiği konusunda uyarıyor.",
                mediaType: "image",
                mediaUrl: "https://images.pexels.com/photos/6694924/pexels-photo-6694924.jpeg", // Direkt jpeg'e çevrildi
                likes: 71123,
                comments: 634,
                tags: ["#finans", "#borsa", "#yatırım"],
                createdAt: new Date()
            },
            {
                authorName: "Sokak Fotoğrafçılığı",
                authorUsername: "@street_lens",
                avatarText: "S",
                avatarBg: "#424242",
                postTitle: "Siyah Beyazın Çarpıcılığı 📸",
                postContent: "Bazen renkleri ortadan kaldırmak, fotoğrafın barındırdığı duyguyu ve kompozisyonu çok daha güçlü bir şekilde izleyiciye aktarır. Gölgelerin dili her zaman daha keskindir.",
                mediaType: "image",
                mediaUrl: "https://images.pexels.com/photos/37109633/pexels-photo-37109633.jpeg", // Direkt jpeg'e çevrildi
                likes: 567,
                comments: 30,
                tags: ["#fotoğraf", "#sokak", "#siyahbeyaz"],
                createdAt: new Date()
            },
            {
                authorName: "Geliştirici Günlüğü",
                authorUsername: "@code_life",
                avatarText: "C",
                avatarBg: "#1976D2",
                postTitle: "Gece Kodlaması ve Bug Avı 🐛",
                postContent: "Saat sabahın 3'ü olmuş, ekrandaki hata mesajına bakıyorum, o da bana bakıyor. Konsola yazdırdığım 'buraya girdi mi' loglarının haddi hesabı yok. Yazılımcı hayatı dedikleri tam olarak bu olsa gerek.",
                mediaType: "video",
                mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", // Test mp4
                videoDuration: "0:57",
                likes: 89000,
                comments: 1120,
                tags: ["#yazılım", "#kodlama", "#developer"],
                createdAt: new Date()
            },
            {
                authorName: "Seyahat Rehberi",
                authorUsername: "@gezgin_rota",
                avatarText: "S",
                avatarBg: "#FFB300",
                postTitle: "Kapadokya'da Balon Turu 🎈",
                postContent: "Gün doğarken gökyüzüne yükselen yüzlerce sıcak hava balonuyla Kapadokya'nın peribacalarını izlemek, hayatınızda en az bir kere yaşamanız gereken bir tecrübe. Manzara kelimenin tam anlamıyla nefes kesici.",
                mediaType: "video",
                mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4", // Test mp4
                videoDuration: "0:28",
                likes: 145000,
                comments: 890,
                tags: ["#kapadokya", "#seyahat", "#türkiye"],
                createdAt: new Date()
            },
            {
                authorName: "Max Jonas",
                authorUsername: "@jonas219",
                avatarText: "M",
                avatarBg: "#FFB398",
                postTitle: "Wolsburg vs Bayern München",
                postContent: "Gercekten çok çekişmeli bir maç oluyor",
                mediaType: "video",
                mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Test mp4
                videoDuration: "0:34",
                likes: 1789,
                comments: 33,
                tags: ["#olise", "#football", "#germany"],
                createdAt: new Date()
            }
        ];

        try {
            console.log("Veriler Firebase'e yükleniyor, lütfen bekleyin...");
            for (const item of dummyData) {
                // Burada id belirtmediğimiz için Firebase her birine otomatik ID atayacak
                await firestore().collection('Posts').add(item);
            }
            console.log("BÜTÜN VERİLER BAŞARIYLA YÜKLENDİ! 🎉");
        } catch (error) {
            console.error("Yükleme sırasında hata oluştu:", error);
        }
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


            {/* GEÇİCİ FİREBASE BUTONU - İŞİMİZ BİTİNCE SİLECEĞİZ */}
            <TouchableOpacity
                style={{ backgroundColor: '#FF3B30', padding: 15, marginHorizontal: 20, borderRadius: 10, alignItems: 'center', marginBottom: 10 }}
                onPress={uploadMockDataToFirebase}
            >
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>VERİLERİ FIREBASE'E FIRLAT 🚀</Text>
            </TouchableOpacity>

            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color="#333333" style={styles.searchIcon} />
                <TextInput style={styles.searchInput} placeholder="Gönderi ara..." placeholderTextColor="#999999" />
            </View>

            <FlatList
                style={{ flex: 1 }}
                ref={flatListRef}
                data={posts}
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