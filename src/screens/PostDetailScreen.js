import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';
import BottomNavBar from '../components/BottomNavBar';

const PostDetailScreen = ({ navigation, route }) => {
    // Tıklanan postun verisini al
    const { post } = route.params;

    const [isPaused, setIsPaused] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [isSaved, setIsSaved] = useState(false);
    const [commentText, setCommentText] = useState('');

    // BEĞENİ FORMATLAMA (Eğer 413001 olursa bile ekranda 413K gösterir)
    const formatLikes = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toString();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 1. HEADER */}
            <View style={styles.header}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={{ paddingRight: 10 }}>
                        <Icon name="chevron-back" size={24} color={COLORS.textMain} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Gönderi Detayı</Text>
                </View>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/nexus-logo.png')} style={styles.logo} resizeMode="cover" />
                </View>
            </View>

            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>

                {/* 2. PROFİL (Alt alta İsim ve Gri Username) */}
                <View style={styles.profileSection}>
                    <View style={[styles.avatar, { backgroundColor: post.avatarBg }]}>
                        <Text style={styles.avatarText}>{post.avatarText}</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{post.authorName}</Text>
                        <Text style={styles.userHandle}>{post.authorUsername}</Text>
                    </View>
                </View>

                {/* 3. METİN */}
                <View style={styles.textSection}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.postParagraph}>{post.body}</Text>
                </View>

                {/* 4. MEDYA (Video İkonları Düzeltildi) */}
                {post.mediaType !== 'text' && (
                    <View style={styles.mediaWrapper}>
                        {post.mediaType === 'video' ? (
                            <TouchableOpacity activeOpacity={0.9} onPress={() => setIsPaused(!isPaused)} style={{ width: '100%', height: '100%' }}>
                                <Image source={post.mediaSource} style={styles.mediaImage} resizeMode="contain" />

                                <View style={styles.videoOverlay}>
                                    {/* Orta Play Butonu */}
                                    {isPaused && (
                                        <View style={styles.playIconCircle}>
                                            <Icon name="play" size={30} color="#FFFFFF" style={{ marginLeft: 4 }} />
                                        </View>
                                    )}

                                    {/* Alt Video Barı (Eski düzgün haline getirildi) */}
                                    {/* Alt Video Barı */}
                                    <View style={styles.videoControlsBottom}>
                                        {/* Sol: Oynat/Durdur ve Süre */}
                                        <Icon name={isPaused ? "play" : "pause"} size={18} color="#FFFFFF" />
                                        <Text style={styles.videoTimeText}>{post.videoDuration}</Text>

                                        {/* Orta: İlerleme Çubuğu */}
                                        <View style={styles.progressBarContainer}>
                                            <View style={styles.progressBarFill} />
                                        </View>

                                        {/* Sağ: Ses, Resim İçinde Resim (PiP) ve Tam Ekran */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                            <Icon name="volume-medium" size={18} color="#FFFFFF" />
                                            {/* Resim İçinde Resim (PiP) İkonu */}
                                            <Icon name="copy-outline" size={18} color="#FFFFFF" />
                                            {/* Tam Ekran İkonu */}
                                            <Icon name="expand" size={18} color="#FFFFFF" />
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        ) : (
                            <Image source={post.mediaSource} style={styles.mediaImage} resizeMode="cover" />
                        )}
                    </View>
                )}

                {/* 5. ETKİLEŞİM VE ETİKETLER */}
                <View style={styles.interactionSection}>
                    {/* Etiketler */}
                    {post.tags && post.tags.length > 0 && (
                        <View style={styles.tagsContainer}>
                            {post.tags.map((tag, index) => (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Aksiyon Butonları */}
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => {
                            setIsLiked(!isLiked);
                            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
                        }}>
                            <Icon name={isLiked ? "heart" : "heart-outline"} size={20} color={isLiked ? "#FF3B30" : COLORS.textMain} />
                            <Text style={styles.actionButtonText}>{formatLikes(likeCount)}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.bookmarkButton} onPress={() => setIsSaved(!isSaved)}>
                            <Icon name={isSaved ? "bookmark" : "bookmark-outline"} size={20} color={isSaved ? "#000000" : COLORS.textMain} />
                        </TouchableOpacity>
                    </View>

                    {/* 6. YORUM YAZMA KUTUSU */}
                    <View style={styles.commentsSection}>
                        <Text style={styles.commentsHeader}>Yorumlar ({post.comments})</Text>

                        <View style={styles.commentInputContainer}>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="Yorum ekle..."
                                placeholderTextColor={COLORS.textSecondary}
                                value={commentText}
                                onChangeText={setCommentText}
                            />
                            <TouchableOpacity disabled={commentText.trim().length === 0} style={[styles.sendButton, { opacity: commentText.trim().length > 0 ? 1 : 0.4 }]}>
                                <Icon name="send" size={16} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* 7. DİNAMİK YORUM KARTLARI (MOCK DATADAN ÇEKER) */}
                    {post.commentsList && post.commentsList.map((comment, index) => (
                        <View key={index} style={styles.commentCard}>
                            <View style={styles.commentAvatar}>
                                <Text style={styles.commentAvatarText}>{comment.avatar}</Text>
                            </View>
                            <View style={styles.commentContent}>
                                <Text style={styles.commentAuthor}>{comment.name}</Text>
                                <Text style={styles.commentText}>{comment.text}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <BottomNavBar />
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
    avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
    avatarText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    userInfo: { marginLeft: 12 },
    userName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    // USERNAME GRİLEŞTİRİLDİ
    userHandle: { fontSize: 13, color: '#999999', marginTop: 2 },
    textSection: { paddingHorizontal: 15, marginBottom: 15 },
    postTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 10, lineHeight: 22 },
    postParagraph: { fontSize: 14, color: COLORS.textMain, lineHeight: 20 },
    mediaWrapper: {
        marginHorizontal: 15, // Sağdan ve soldan yazılarla aynı hizaya getirir
        height: 220,
        borderRadius: 10,     // Figma'daki o şık yuvarlak köşeleri ekler
        overflow: 'hidden',   // Resmin ve video karartmasının bu yuvarlak köşelerden taşmasını engeller
        backgroundColor: '#000'
    },
    mediaImage: { width: '100%', height: '100%' },
    // VİDEO İKONLARI STİLLERİ
    videoOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' },
    playIconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center' },
    videoControlsBottom: { position: 'absolute', bottom: 10, left: 10, right: 10, flexDirection: 'row', alignItems: 'center' },
    videoTimeText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', marginLeft: 10 },
    progressBarContainer: { flex: 1, height: 3, backgroundColor: 'rgba(255, 255, 255, 0.4)', marginHorizontal: 12, borderRadius: 2 },
    progressBarFill: { width: '40%', height: '100%', backgroundColor: '#FFFFFF', borderRadius: 2 },
    // DİĞER STİLLER
    interactionSection: { paddingHorizontal: 15, marginTop: 15 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
    tag: { backgroundColor: 'rgba(119, 171, 255, 0.7)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, marginRight: 8, marginBottom: 8, justifyContent: 'center', alignItems: 'center' },
    tagText: { color: '#032783', fontSize: 12, fontWeight: 'normal', includeFontPadding: false },
    actionButtonsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    actionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.tagBackground, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginRight: 10, height: 30 },
    actionButtonText: { fontSize: 12, fontWeight: 'bold', color: COLORS.textMain, marginLeft: 6 },
    bookmarkButton: { backgroundColor: COLORS.tagBackground, width: 36, height: 30, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    commentsSection: { marginTop: 5 },
    commentsHeader: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 12 },
    commentInputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    commentInput: { flex: 1, height: 36, backgroundColor: 'rgba(229, 228, 226, 0.5)', borderRadius: 5, paddingHorizontal: 15, marginRight: 10, fontSize: 14, color: COLORS.textMain },
    sendButton: { width: 36, height: 36, backgroundColor: 'rgba(30, 58, 138, 0.6)', borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingRight: 2 },
    commentCard: { flexDirection: 'row', alignItems: 'center', minHeight: 60, backgroundColor: 'rgba(229, 228, 226, 0.3)', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 15, marginBottom: 15 },
    commentAvatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#1E3A8A', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    commentAvatarText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
    commentContent: { flex: 1, justifyContent: 'center' },
    commentAuthor: { fontSize: 14, fontWeight: '600', color: COLORS.textMain },
    commentText: { fontSize: 13, color: COLORS.textMain, marginTop: 2 }
});

export default PostDetailScreen;