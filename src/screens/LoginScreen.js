import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Image,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { AuthContext } from '../context/AuthContext'; 

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Hata', 'Lütfen kullanıcı adı ve şifre alanlarını doldurun.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data); 
      } else {
        Alert.alert('Giriş Başarısız', data.message || 'Kullanıcı adı veya şifre hatalı.');
      }
    } catch (error) {
      Alert.alert('Bağlantı Hatası', 'Sunucuya ulaşılamıyor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1E3A8A', '#3882F6']}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/nexus-logo.png')} 
          style={styles.logo} 
        />
        <Text style={styles.logoSubtitle}>Sosyal Medya Platformu</Text>
      </View>

      <View style={styles.formContainer}>
        
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
          <View style={styles.inputBox}>
            <Ionicons name="person" size={20} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="emilys"
              placeholderTextColor="#A9A9A9"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Şifre</Text>
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed" size={20} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="**********"
              placeholderTextColor="#A9A9A9"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!isLoading}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="black" style={styles.iconRight} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleLogin} 
          disabled={isLoading}
          style={styles.buttonShadow}
        >
          <LinearGradient
            colors={['#2A7AE2', '#312727', '#DB6565']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Giriş Yap</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 111,
    borderRadius: 40,
    marginBottom: 10,
  },
  logoSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    color: '#000',
    marginBottom: 8,
    marginLeft: 5,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  buttonShadow: {
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
  },
  button: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginScreen;