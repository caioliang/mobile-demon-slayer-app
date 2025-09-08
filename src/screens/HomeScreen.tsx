import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type Character = {
    id: number;
    name: string;
    img: string;
};

export default function HomeScreen() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        axios.get('https://www.demonslayer-api.com/api/v1/characters?limit=45')
            .then(res => {
                const sortedCharacters = res.data.content.sort((a: Character, b: Character) =>
                    a.name.localeCompare(b.name)
                );
                setCharacters(sortedCharacters);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);
    const renderItem = ({ item }: { item: Character }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalhes', { characterId: item.id })}
        >
            <Image source={{ uri: item.img }} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Escolha seu personagem abaixo</Text>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={characters}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#fff'
  },
  logo: {
    width: width * 0.6,
    height: height * 0.2,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  title: {
    fontSize: width * 0.05,
    textAlign: 'center',
    marginVertical: height * 0.03
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginBottom: height * 0.015,
    padding: width * 0.05,
    borderRadius: 8
  },
  avatar: {
    width: width * 0.1,
    height: width * 0.15,
    marginRight: width * 0.03,
    borderRadius: 8
  },
  name: {
    fontSize: width * 0.045,
    fontWeight: 'bold'
  }
});