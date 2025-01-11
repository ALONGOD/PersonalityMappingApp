// screens/AddPersonScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { useGroup } from '../store/GroupContext';
const analyzePersonality = (traits, name, interests) => {
    const traitAnalysis = {
        extroversion: {
            low: 'tends to be reserved and values solitary time',
            medium: 'balances social interactions with alone time',
            high: 'is highly outgoing and energized by social interactions'
        },
        openness: {
            low: 'prefers routine and familiar experiences',
            medium: 'maintains a good balance between tradition and new experiences',
            high: 'is curious and eager to explore new ideas'
        },
        conscientiousness: {
            low: 'tends to be flexible and spontaneous',
            medium: 'maintains a reasonable balance between work and relaxation',
            high: 'is highly organized and detail-oriented'
        },
        agreeableness: {
            low: 'tends to be direct and straightforward in interactions',
            medium: 'balances cooperation with self-interest',
            high: 'is very cooperative and considerate of others'
        },
        neuroticism: {
            low: 'tends to be emotionally stable and resilient',
            medium: 'shows normal emotional responses to stress',
            high: 'may experience heightened emotional responses'
        }
    };

    const getTraitLevel = (value) => {
        if (value < 40) return 'low';
        if (value > 60) return 'high';
        return 'medium';
    };

    const traitDescriptions = Object.entries(traits).map(([trait, value]) => {
        const level = getTraitLevel(value);
        return `${name} ${traitAnalysis[trait][level]}`;
    });

    const interestAnalysis = interests ?
        `Their interests in ${interests} suggest a person who engages in ${traits.openness > 60 ? 'diverse' : 'focused'
        } activities.` : '';

    return `${traitDescriptions.join('. ')}. ${interestAnalysis}`;
};

export default function AddPersonScreen({ navigation }) {
    const { addMember } = useGroup();
    const [personData, setPersonData] = useState({
        name: '',
        traits: {
            extroversion: 50,
            openness: 50,
            conscientiousness: 50,
            agreeableness: 50,
            neuroticism: 50,
        },
        interests: '',
    });

    const handleSubmit = () => {
        const analysis = analyzePersonality(personData.traits, personData.name, personData.interests);
        addMember({
            ...personData,
            analysis
        });
        navigation.goBack();
    };

    const updateTrait = (trait, value) => {
        setPersonData({
            ...personData,
            traits: {
                ...personData.traits,
                [trait]: value,
            },
        });
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={personData.name}
                onChangeText={(text) => setPersonData({ ...personData, name: text })}
            />

            {/* Trait Sliders */}
            {Object.entries(personData.traits).map(([trait, value]) => (
                <View key={trait} style={styles.traitContainer}>
                    <Text style={styles.traitLabel}>
                        {trait.charAt(0).toUpperCase() + trait.slice(1)}: {value}
                    </Text>
                    <Slider
                        style={styles.slider}
                        value={value}
                        onValueChange={(newValue) => updateTrait(trait, newValue)}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                    />
                </View>
            ))}

            <TextInput
                style={styles.input}
                placeholder="Interests (comma separated)"
                value={personData.interests}
                onChangeText={(text) => setPersonData({ ...personData, interests: text })}
            />

            <Button title="Add to Group" onPress={handleSubmit} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    traitContainer: {
        marginBottom: 20,
    },
    traitLabel: {
        marginBottom: 5,
    },
    slider: {
        width: '100%',
        height: 40,
    },
});