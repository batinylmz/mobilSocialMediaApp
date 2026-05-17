import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { COLORS } from '../constants/theme';
// Eğer arkadaşın useAuth hook'unu oluşturduysa buradan çağırılacak
// import { useAuth } from '../hooks/useAuth'; 

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Arkadaşının Context yapısı hazır olunca burayı aktifleştirebilirsiniz
  // const { login } = useAuth(); 

  const handleLogin = async () => {
    // 1. Validasyon Kontrolü
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Kullanıcı adı ve şifre alanları boş bırakılamaz.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true); // Buton devre dışı kalır ve loading indicator başlar

    try {
      // 2. DummyJSON API İsteği
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // API Başarılı: Token ve Kullanıcı verisi geldi
        console.log('Giriş Başarılı:', data);
        
        // TODO: Arkadaşının kurduğu AuthContext'e verileri kaydetme
        // if (login) { login(data.token, data); }

        Alert.alert('Başarılı', 'Giriş işlemi tamamlandı, ana sayfaya yönlendiriliyorsunuz.');
        
        // Ana Tab Navigator'a yönlendirme (Ödev isterlerine göre)
        // navigation.replace('Main'); 
      } else {
        // API'den dönen hata mesajını göster
        setErrorMessage(data.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Ağ hatası oluştu. Lütfen internet bağlantınızı kontrol edin.');
    } finally {
      setIsLoading(false); // İşlem bitince yükleme ekranını kapat
    }
  };

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

        {/* Giriş Kartı */}
        <View style={styles.cardContainer}>
          
          {/* Kullanıcı Adı Alanı */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconPlaceholder}>
                <Text style={styles.iconText}>👤</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="emilys"
                placeholderTextColor={COLORS.textSecondary}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                editable={!isLoading} // Yüklenirken inputu kilitle
              />
            </View>
          </View>

          {/* Şifre Alanı */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Şifre</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconPlaceholder}>
                <Text style={styles.iconText}>🔒</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="**********"
                placeholderTextColor={COLORS.textSecondary}
                secureTextEntry={secureText}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                editable={!isLoading} // Yüklenirken inputu kilitle
              />
              <TouchableOpacity 
                style={styles.eyeButton} 
                onPress={() => setSecureText(!secureText)}
                disabled={isLoading}
              >
                <Text style={styles.eyeIconText}>{secureText ? '👁️' : '🙈'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Hata Mesajı Alanı */}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          {/* Giriş Yap Butonu */}
          <TouchableOpacity 
            style={[
              styles.button, 
              { backgroundColor: COLORS.gradientBlue },
              isLoading && styles.disabledButton // Yüklenirken butonu görsel olarak soluklaştır
            ]} 
            onPress={handleLogin}
            disabled={isLoading} // İstek süresince buton devre dışı
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Giriş Yap</Text>
            )}
          </TouchableOpacity>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
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
    width: 120,
    height: 111,
    borderRadius: 40,
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
    fontFamily: 'Jaldi-Regular',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 15,
    fontWeight: '500',
  },
  cardContainer: {
    width: 400,
    height: 490,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 35,
    alignItems: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: '#000000',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  iconPlaceholder: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  eyeButton: {
    padding: 5,
  },
  eyeIconText: {
    fontSize: 18,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontWeight: '600'
  },
  button: {
    width: 350,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Inter-Regular',
  },
});