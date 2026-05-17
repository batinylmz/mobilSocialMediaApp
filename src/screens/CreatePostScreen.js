import React, { useState } from 'react';
import {
    View, Text, TextInput, StyleSheet, ScrollView,
    TouchableOpacity, SafeAreaView, Image, Alert, ActivityIndicator,Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Firebase ve Galeri Paketleri
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


import { COLORS, SIZES } from '../constants/theme';
import BottomNavBar from '../components/BottomNavBar';
import GradientButton from '../components/GradientButton';

const CreatePostScreen = () => {
    const navigation = useNavigation();

    // Form State'leri
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(false);

// Figma'daki Etiketler
    const tags = ['#history', '#american', '#crime', '#french', '#fiction', '#classic', '#adventure'];


    // Galeri Seçimi
    const selectMedia = () => {
        ImagePicker.openPicker({
            mediaType: 'any',
            compressImageQuality: 0.8,
        }).then(res => {
            setMedia({ uri: res.path, type: res.mime });
        }).catch(e => console.log(e));
    };

    // Firebase Paylaşım Mantığı
    const handlePublish = async () => {
        if (!title || !content) {
            Alert.alert("Eksik Bilgi", "Lütfen başlık ve içerik alanlarını doldurun.");
            return;
        }

        setLoading(true);

        try {
            let downloadURL = null;

            // Eğer medya seçildiyse önce Storage'a yükle
            // if (media) bloğunu tamamen silip yerine bunu yapıştır:
            // handlePublish içindeki "if (media)" bloğunu tamamen silip yerine bunu yapıştır:
            if (media) {
                // Gerçek yüklemeyi pas geçip, Firestore'a doğrudan hazır bir test videosu linki veriyoruz
                downloadURL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
            }

            // Verileri Firestore'a kaydet
            await firestore().collection('Posts').add({
                authorName: "Batın Yılmaz",
                authorUsername: "@batinyilmaz",
                postTitle: title,
                postContent: content,
                mediaUrl: downloadURL,
                mediaType: media ? (media.type.includes('video') ? 'video' : 'image') : null,
                createdAt: firestore.FieldValue.serverTimestamp(),
                likes: 0,
            });

            setLoading(false);
            Alert.alert("Başarılı!", "Gönderiniz başarıyla paylaşıldı.", [
                { text: "Tamam", onPress: () => navigation.goBack() }
            ]);

        } catch (error) {
            setLoading(false);
            console.log(error);
            Alert.alert("Hata", "Paylaşım sırasında bir sorun oluştu.");
        }
    };


    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ÜST BAR (HEADER) */}
                <View style={styles.header}>
                    {/* Sol Kısım: Geri Ok ve Başlık */}
                    <View style={styles.leftContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 5 }}>
                            <Icon name="chevron-back" size={26} color="#000000" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Gönderi Oluştur</Text>
                    </View>

                    {/* LOGOYU BURADAN KALDIRDIK (Alt sayfalarda logo olmaz) */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/nexus-logo.png')} // Logonuzun doğru dosya yolunu buraya yazın
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    {/* Sağ Kısım: Bildirim İkonu */}
                    <TouchableOpacity style={styles.rightContainer} activeOpacity={0.7}>
                        <View style={styles.iconWrapper}>
                            <Icon name="notifications" size={24} color="#000000" />
                            <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
                        </View>
                    </TouchableOpacity>
                </View>
            {/* Form Alanı */}
            <View style={styles.form}>
                <Text style={styles.label}>Başlık *</Text>
                <TextInput
                    style={styles.inputTitle}
                    placeholder="Gönderinizin başlığı..."
                    placeholderTextColor={COLORS.textSecondary}
                    value={title}          // <-- Bu eksik olabilir
                    onChangeText={setTitle}
                />

                <View style={styles.labelRow}>
                    <Text style={styles.label}>Gönderi İçeriği *</Text>
                    <Text style={styles.counter}>{content.length}/500</Text>
                </View>
                <TextInput
                    style={styles.inputContent}
                    multiline
                    maxLength={500}
                    onChangeText={setContent}
                    value={content}
                    placeholder="Neler düşünüyorsunuz?"
                    placeholderTextColor={COLORS.textSecondary}
                    textAlignVertical="top"
                />
                {/* YENİ EKLENEN: Medya Yükleme Alanı */}
                <Text style={[styles.label, { marginTop: 20 }]}>Fotoğraf/Video Ekle</Text>
                {!media ? (
                    <TouchableOpacity style={styles.uploadBox} onPress={selectMedia}>
                        <Icon name="cloud-upload" size={40} color="#9CA3AF" />
                        <Text style={styles.uploadText}>"Galeriden seçmek için dokunun"</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.previewContainer}>
                        <Image source={{ uri: media.uri }} style={styles.previewImage} />
                        <TouchableOpacity style={styles.removeBtn} onPress={() => setMedia(null)}>
                            <Icon name="close-circle" size={28} color="#FF4444" />
                        </TouchableOpacity>
                        {media.type.includes('video') && (
                            <View style={styles.videoBadge}>
                                <Icon name="play" size={24} color="#FFF"/>
                            </View>
                        )}
                    </View>
                )}

                {/* YENİ EKLENEN: Etiketler Alanı */}
                <Text style={[styles.label, { marginTop: 20 }]}>Etiketler</Text>
                <View style={styles.tagContainer}>
                    {tags.map(tag => (
                        <View key={tag} style={styles.tagWrap}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>


                {/* Paylaş Butonu */}
                <View style={styles.buttonWrapper}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#000" />
                    ) : (
                        <GradientButton title="Paylaş" onPress={handlePublish} />
                    )}
                </View>
            </View>

            </ScrollView>

            <BottomNavBar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollContent: {
        paddingBottom: 20, // İçeriğin en altta navbar'a çok yapışmaması için
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        paddingHorizontal: 15
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Yazının sığması için kalan tüm alanı alır
    },
    backButton: {
        position: 'absolute',
        left: 10,
        zIndex: 10,
        padding: 5
    },
    logoContainer: {
        position: 'absolute', // Logoyu ekranın tam merkezine sabitler
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
    headerTitle: {
        fontSize: 18, // Başlığı biraz daha belirgin yaptık
        fontWeight: 'bold',
        color: '#000000',
        marginLeft: 5
    },
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    iconWrapper: {
        position: 'relative'
    },

    notifyContainer: {
        position: 'absolute',
        right: 20,
        width: 36, // Rozetin taşmaması için konteyner biraz büyütüldü
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notifyIconBg: {
        width: SIZES.notificationSize || 30,
        height: SIZES.notificationSize || 30,
        backgroundColor: COLORS.tagBackground || '#E5E7EB',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
        borderColor: '#FFFFFF',
        zIndex: 1
    },
    badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' },
    form: { paddingHorizontal: 20, marginTop: 20, width: '100%', alignItems: 'center' },
    label: { fontSize: 16, fontWeight: '500', alignSelf: 'flex-start', marginBottom: 8, color: COLORS.textMain },
    labelRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15 },
    counter: { color: COLORS.textSecondary },
    inputTitle: {
        width: '100%', height: SIZES.titleInputHeight,
        borderWidth: 1, borderColor: COLORS.border, borderRadius: SIZES.inputRadius,
        paddingHorizontal: 15, color: COLORS.textMain
    },
    inputContent: {
        width: '100%', height: SIZES.contentInputHeight,
        borderWidth: 1, borderColor: COLORS.border, borderRadius: SIZES.inputRadius,
        padding: 15, color: COLORS.textMain
    },

    // --- YENİ EKLENEN STİLLER (Medya ve Etiketler İçin) ---
    uploadBox: {
        width: '100%', height: 160,
        borderWidth: 2, borderColor: '#D1D5DB', borderStyle: 'dashed', borderRadius: 12,
        backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center'
    },
    uploadText: { marginTop: 10, color: '#6B7280', fontSize: 14 },
    previewContainer: { width: '100%', height: 180, borderRadius: 12, overflow: 'hidden', position: 'relative' },
    previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    removeBtn: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20 },
    videoBadge: { position: 'absolute', top: '40%', left: '45%', backgroundColor: 'rgba(0,0,0,0.6)', padding: 12, borderRadius: 30 },
    tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, width: '100%', marginBottom: 10 },
    tagWrap: { backgroundColor: '#F3F4F6', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
    tagText: { color: '#4B5563', fontSize: 13, fontWeight: '500' },

    buttonWrapper: { width: '100%', marginTop: 30, marginBottom: 20 }
});

export default CreatePostScreen;


