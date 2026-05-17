import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

const TRENDING_TAGS = [
  { id: '1', name: 'beşiktaş', count: '33.1K' },
  { id: '2', name: 'fenerbahçe', count: '1924' },
  { id: '3', name: 'ekonomi', count: '5790' },
  { id: '4', name: 'yapayzeka', count: '21K' },
  { id: '5', name: 'xçöktü', count: '9972' },
  { id: '6', name: 'DoktoroKontenjanları', count: '21.6K' },
];

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderTagItem = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer}>
      <LinearGradient
        colors={['#1E3A8A', '#3882F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hashCircle}
      >
        <Text style={styles.hashText}>#</Text>
      </LinearGradient>

      <View style={styles.textContainer}>
        <Text style={styles.tagTitle}>#{item.name}</Text>
        <Text style={styles.tagCount}>{item.count} gönderi</Text>
      </View>

      <Ionicons name="arrow-forward" size={24} color="#000" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KEŞFET</Text>
        
        <Image 
          source={require('../../assets/nexus-logo.png')} 
          style={styles.logo} 
        />
        
        <TouchableOpacity style={styles.bellContainer}>
          <Ionicons name="notifications" size={28} color="#000" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Etiket ara..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.sectionTitle}>Gündemdekiler</Text>

      <FlatList
        data={TRENDING_TAGS}
        keyExtractor={(item) => item.id}
        renderItem={renderTagItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomTabBar}>
        <Ionicons name="home" size={28} color="#000" />
        <Ionicons name="compass" size={28} color="#1E3A8A" />
        <Ionicons name="add-circle" size={32} color="#000" />
        <Ionicons name="person" size={28} color="#000" />
        <Ionicons name="settings" size={28} color="#000" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900', 
    color: '#000000',
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 8,
  },
  bellContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E50000', 
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    padding: 0, 
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA', 
    borderRadius: 16,
    height: 86, 
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  hashCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hashText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  tagTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  tagCount: {
    fontSize: 16,
    color: '#333333',
  },
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70, 
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
});

export default ExploreScreen;