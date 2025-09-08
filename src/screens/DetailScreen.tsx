import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type Character = {
  id: number;
  name: string;
  age?: string;
  race?: string;
  gender?: string;
  description?: string;
  quote?: string;
  img: string;
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detalhes'>;

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const { characterId } = route.params;

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://www.demonslayer-api.com/api/v1/characters?id=${characterId}`)
      .then(res => setCharacter(res.data.content[0]))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !character) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  const isDemon = character.race?.toLowerCase().includes('demon');

  return (
    <ImageBackground
      source={
        isDemon
          ? require('../assets/background-demon.png')
          : require('../assets/background-human.png')
      }
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: character.img }} style={styles.image} />
        <View style={styles.card}>
          <Text style={styles.name}>{character.name}</Text>
          <View style={styles.badgeGroup}>
            <Text style={styles.badge}>Idade: <Text style={styles.highlight}>{character.age || '??'}</Text></Text>
            <Text style={styles.badge}>Raça: <Text style={styles.highlight}>{character.race || '??'}</Text></Text>
            <Text style={styles.badge}>Gênero: <Text style={styles.highlight}>{character.gender || '??'}</Text></Text>
          </View>
          <Text style={styles.description}>{character.description}</Text>
          {character.quote && (
            <Text style={styles.quote}>
              <Text style={{ fontStyle: 'italic' }}>{character.quote}</Text>
            </Text>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  content: { padding: 20 },
  image: { width: '100%', height: 300, resizeMode: 'contain' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginTop: -40 },
  name: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  badgeGroup: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  badge: { fontSize: 14 },
  highlight: { fontWeight: 'bold', color: '#c00' },
  description: { marginVertical: 10, fontSize: 14 },
  quote: { backgroundColor: '#000', color: '#fff', padding: 10, borderRadius: 8, marginTop: 10 }
});
