import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useGroup } from '../store/GroupContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PERSONALITY_CATEGORIES = {
    humorVibes: {
        title: "Humor & Vibes",
        traits: ["Funny", "Chill", "Meme-Lord", "Sarcastic", "Adventurous"],
        sliderTraits: ["Funny Level", "Chill Level"]
    },
    emotionalStyle: {
        title: "Emotional Style",
        traits: ["Empathetic", "Caring", "Optimistic", "Realistic", "Sensitive"],
        sliderTraits: ["Emotional Intelligence"]
    },
    funMetrics: {
        title: "Fun Metrics",
        sliderTraits: ["Sus Level", "Rizz Level", "Main Character Energy"]
    },
    groupRole: {
        title: "Group Role",
        traits: ["Leader", "Follower", "Mediator", "Innovator", "Peacekeeper"]
    }
};

const generatePersonalityDescription = (name, selectedTraits, ratings, interests) => {
    let description = `${name} is `;

    // Add main traits
    const mainTraits = selectedTraits.slice(0, 3).join(", ");
    description += mainTraits;

    // Add ratings commentary
    if (ratings["Sus Level"] > 70) {
        description += ` (pretty sus tho 👀)`;
    }
    if (ratings["Rizz Level"] > 80) {
        description += ` with maximum rizz ✨`;
    }
    if (ratings["Main Character Energy"] > 90) {
        description += ` and definitely main character energy 🌟`;
    }

    // Add interests
    if (interests) {
        description += `. They're into ${interests}`;
    }

    return description;
};

export default function AddPersonScreen({ navigation }) {
    const { addMember } = useGroup();
    const [currentStep, setCurrentStep] = useState(0);
    const [personData, setPersonData] = useState({
        name: '',
        selectedTraits: [],
        ratings: {
            "Funny Level": 50,
            "Chill Level": 50,
            "Sus Level": 50,
            "Rizz Level": 50,
            "Main Character Energy": 50,
            "Emotional Intelligence": 50
        },
        interests: ''
    });

    const steps = [
        { title: "Basic Info", key: "basicInfo" },
        ...Object.keys(PERSONALITY_CATEGORIES).map(key => ({
            title: PERSONALITY_CATEGORIES[key].title,
            key
        })),
        { title: "Review", key: "review" }
    ];

    const handleTraitToggle = (trait) => {
        setPersonData(prev => ({
            ...prev,
            selectedTraits: prev.selectedTraits.includes(trait)
                ? prev.selectedTraits.filter(t => t !== trait)
                : [...prev.selectedTraits, trait]
        }));
    };

    const handleSliderChange = (trait, value) => {
        setPersonData(prev => ({
            ...prev,
            ratings: {
                ...prev.ratings,
                [trait]: value
            }
        }));
    };

    const renderBasicInfo = () => (
        <View style={styles.stepContainer}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={personData.name}
                onChangeText={(text) => setPersonData(prev => ({ ...prev, name: text }))}
            />
            <TextInput
                style={styles.input}
                placeholder="Interests (comma separated)"
                value={personData.interests}
                onChangeText={(text) => setPersonData(prev => ({ ...prev, interests: text }))}
            />
        </View>
    );

    const renderTraitSelection = (categoryKey) => {
        const category = PERSONALITY_CATEGORIES[categoryKey];
        return (
            <View style={styles.stepContainer}>
                <Text style={styles.categoryTitle}>{category.title}</Text>

                {/* Regular traits */}
                {category.traits && (
                    <View style={styles.traitsGrid}>
                        {category.traits.map(trait => (
                            <TouchableOpacity
                                key={trait}
                                style={[
                                    styles.traitButton,
                                    personData.selectedTraits.includes(trait) && styles.traitButtonSelected
                                ]}
                                onPress={() => handleTraitToggle(trait)}
                            >
                                <Text style={styles.traitButtonText}>{trait}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Slider traits */}
                {category.sliderTraits && category.sliderTraits.map(trait => (
                    <View key={trait} style={styles.sliderContainer}>
                        <Text style={styles.sliderLabel}>
                            {trait}: {personData.ratings[trait]}
                        </Text>
                        <Slider
                            style={styles.slider}
                            value={personData.ratings[trait]}
                            onValueChange={(value) => handleSliderChange(trait, value)}
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                        />
                    </View>
                ))}
            </View>
        );
    };

    const renderReview = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.reviewTitle}>Review Profile</Text>
            <Text style={styles.description}>
                {generatePersonalityDescription(
                    personData.name,
                    personData.selectedTraits,
                    personData.ratings,
                    personData.interests
                )}
            </Text>
        </View>
    );

    const renderCurrentStep = () => {
        if (currentStep === 0) return renderBasicInfo();
        if (currentStep === steps.length - 1) return renderReview();
        return renderTraitSelection(steps[currentStep].key);
    };

    const handleSubmit = () => {
        const description = generatePersonalityDescription(
            personData.name,
            personData.selectedTraits,
            personData.ratings,
            personData.interests
        );

        addMember({
            ...personData,
            id: Math.random().toString(36).substr(2, 9),
            analysis: description
        });

        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.progressContainer}>
                {steps.map((step, index) => (
                    <View key={step.key} style={styles.progressStep}>
                        <View style={[
                            styles.progressDot,
                            index <= currentStep && styles.progressDotActive
                        ]} />
                        <Text style={styles.progressText}>{step.title}</Text>
                    </View>
                ))}
            </View>

            {renderCurrentStep()}

            <View style={styles.buttonContainer}>
                {currentStep > 0 && (
                    <Button
                        title="Back"
                        onPress={() => setCurrentStep(prev => prev - 1)}
                    />
                )}
                {currentStep < steps.length - 1 ? (
                    <Button
                        title="Next"
                        onPress={() => setCurrentStep(prev => prev + 1)}
                        disabled={currentStep === 0 && !personData.name}
                    />
                ) : (
                    <Button
                        title="Add to Group"
                        onPress={handleSubmit}
                    />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    progressStep: {
        alignItems: 'center',
    },
    progressDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
    },
    progressDotActive: {
        backgroundColor: '#007AFF',
    },
    progressText: {
        fontSize: 12,
        marginTop: 5,
    },
    stepContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    traitsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    traitButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        margin: 5,
        borderRadius: 20,
        minWidth: 100,
        alignItems: 'center',
    },
    traitButtonSelected: {
        backgroundColor: '#007AFF',
    },
    traitButtonText: {
        color: '#333',
    },
    sliderContainer: {
        marginBottom: 15,
    },
    sliderLabel: {
        marginBottom: 5,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    reviewTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    }
});