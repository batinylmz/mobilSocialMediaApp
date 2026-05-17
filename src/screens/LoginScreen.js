import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { COLORS } from '../constants/theme';

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        
        {/* Üst Alan: Logo ve Başlık */}
        <View style={styles.headerContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>NEXUS</Text>
          </View>
          <Text style={styles.titleText}>Sosyal Medya Platformu</Text>
        </View>

        {/* Giriş Kartı (Figma: W: 400, H: 490, Corner Radius: 30) */}
        <View style={styles.cardContainer}>
          {/* İçerik, inputlar ve buton Commit 2 ile eklenecektir */}
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A', // Figma'daki ana arka plan mavisi (1E3A8A)
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 120, // Figma: 120x111 px
    height: 111,
    borderRadius: 40, // Figma: Corner radius 40
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleText: {
    fontFamily: 'Jaldi-Regular', // Figma: Jaldi 24px
    fontSize: 24, 
    color: '#FFFFFF',
    marginTop: 15,
    fontWeight: '500',
  },
  cardContainer: {
    width: 400, // Figma: W 400
    height: 490, // Figma: H 490
    backgroundColor: '#FFFFFF', // Beyaz kart
    borderRadius: 30, // Figma: Corner radius 30
    paddingHorizontal: 25,
    paddingTop: 35,
  },
});