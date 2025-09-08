import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
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
                        <View style={styles.badgeBox}>
                            <Text style={styles.badge}>
                                Idade: <Text style={styles.highlight}>{character.age || '??'}</Text>
                            </Text>
                        </View>
                        <View style={styles.badgeBox}>
                            <Text style={styles.badge}>
                                Raça: <Text style={styles.highlight}>{character.race || '??'}</Text>
                            </Text>
                        </View>
                        <View style={styles.badgeBox}>
                            <Text style={styles.badge}>
                                Gênero: <Text style={styles.highlight}>{character.gender || '??'}</Text>
                            </Text>
                        </View>
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

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover'
    },
    content: {
        padding: width * 0.05
    },
    image: {
        width: '100%',
        height: height * 0.35,
        resizeMode: 'contain',
        zIndex: 5
    },
    card: {
        backgroundColor: '#fff',
        padding: width * 0.05,
        paddingTop: width * 0.12,
        paddingBottom: width * 0.4,
        borderRadius: 10,
        marginTop: -height * 0.05
    },
    name: {
        fontSize: width * 0.065,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.015
    },
    badgeGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: height * 0.015
    },
    badgeBox: {
        backgroundColor: '#eee',
        padding: width * 0.02,
        borderRadius: 8
    },
    badge: {
        fontSize: width * 0.035
    },
    highlight: {
        fontWeight: 'bold',
        color: '#c00'
    },
    description: {
        marginVertical: height * 0.015,
        fontSize: width * 0.035
    },
    quote: {
        backgroundColor: '#000',
        color: '#fff',
        padding: width * 0.04,
        borderRadius: 8,
        marginTop: height * 0.015
    }
});

