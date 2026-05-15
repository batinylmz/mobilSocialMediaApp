import React, { useState } from 'react';
import {
    View, Text, TextInput, StyleSheet, ScrollView,
    TouchableOpacity, SafeAreaView, Image, Alert, ActivityIndicator
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
            if (media) {
                const filename = `posts/${Date.now()}_${media.uri.substring(media.uri.lastIndexOf('/') + 1)}`;
                const storageRef = storage().ref(filename);
                await storageRef.putFile(media.uri);
                downloadURL = await storageRef.getDownloadURL();
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
                { text: "Tamam", onPress: () => navigation.goBack() } // veya 'PostDetail'e yönlendir
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

                {/* Paylaş Butonu */}
                <View style={styles.buttonWrapper}>
                    <GradientButton title="Paylaş" onPress={() => console.log('Tıklandı')} />
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
    headerTitle: {
        position: 'absolute',
        left: 20,
        fontSize: 20,
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
        width: SIZES.notificationSize, // 30
        height: SIZES.notificationSize, // 30
        backgroundColor: COLORS.tagBackground, // Gri arkaplan
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
    buttonWrapper: { width: '100%', marginTop: 40 }
});

export default CreatePostScreen;