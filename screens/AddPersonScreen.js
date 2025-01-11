// screens/AddPersonScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { useGroup } from '../store/GroupContext';

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
        //add ai etc here
        addMember(personData);
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