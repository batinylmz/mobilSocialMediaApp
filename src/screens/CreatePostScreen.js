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
                const uploadUri = Platform.OS === 'android' ? media.uri.replace('file://', '') : media.uri;
                const fileExtension = media.type.includes('video') ? 'mp4' : 'jpg';
                const filename = `posts/${Date.now()}.${fileExtension}`;

                // 1. KRİTİK ADIM: storage() içine Firebase'deki gs:// ile başlayan adresini tırnak içinde yaz.
                // 2. ref().child() düzenine geçerek terminaldeki sarı WARN uyarılarını tamamen kapatıyoruz.
                const storageRef = storage('gs://BURAYA_FİREBASE_STORAGE_ADRESİNİ_YAZ').ref().child(filename);

                console.log("Yükleme başladı:", uploadUri);

                // putFile yerine yeni standart olan putFile() uyarısını da çözüyoruz
                await storageRef.putFile(uploadUri);
                downloadURL = await storageRef.getDownloadURL();

                console.log("Yükleme başarılı, URL:", downloadURL);
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
            {/* Özel Header Alanı */}
            <View style={styles.header}>

                {/* Geri Dönme İkonu - Tıklanabilir ve Sola Sabit */}
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                {/* Sola dayalı başlık */}

                <Text style={styles.headerTitle}>Gönderi Oluştur</Text>

                {/* Ortalanmış Logo - 10px Border Radius eklendi */}
                <Image
                    source={require('../../assets/nexus-logo.png')}
                    style={styles.logo}
                    resizeMode="cover"
                />

                {/* Sağa dayalı Bildirim İkonu ve Kırmızı Rozet */}
                <TouchableOpacity style={styles.notifyContainer}>
                    <View style={styles.notifyIconBg}>
                        {/* Gerçek Çan (Bell) İkonu */}
                        <Icon name="notifications" size={18} color="#000" />
                    </View>
                    {/* İçinde 3 yazan 14x14 kırmızı rozet */}
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
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
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border
    },
    backButton: {
        position: 'absolute',
        left: 10,
        zIndex: 10,
        padding: 5
    },
    headerTitle: {
        position: 'absolute',
        left: 45, // İkonun üzerine binmesin diye sola 45px pay verdik
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain
    },
    logo: {
        width: 39.87, // Figma genişliği
        height: 37,   // Figma yüksekliği
        borderRadius: 10, // Köşeler yuvarlatıldı
        overflow: 'hidden',
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
        right: 0,
        top: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#F20000',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5, // Beyaz çerçevenin kalınlığı
        borderColor: COLORS.background, // Beyaz çerçeve
        zIndex: 10, // Android'de ikonun üstünde kalmasını garantiler
        elevation: 5, // Android gölge/katman sırası
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 8,
        fontWeight: 'bold',
        includeFontPadding: false, // Android'de rakamın tam ortalanmasını sağlar
    },
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


