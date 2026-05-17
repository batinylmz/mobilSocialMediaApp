import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
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

                <SafeAreaView>
    );
};