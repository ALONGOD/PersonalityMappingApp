import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useGroup } from '../store/GroupContext';

const ACTIVITIES = [
    {
        name: "Escape Room Adventure",
        traits: { openness: 0.7, extroversion: 0.6, conscientiousness: 0.8 },
        tags: ["problem-solving", "teamwork", "communication"]
    },
    {
        name: "Group Hiking Trip",
        traits: { openness: 0.8, extroversion: 0.5, neuroticism: -0.4 },
        tags: ["outdoor", "nature", "fitness"]
    },
    {
        name: "Board Game Night",
        traits: { conscientiousness: 0.6, agreeableness: 0.7, extroversion: 0.5 },
        tags: ["games", "strategy", "indoor"]
    },
    {
        name: "Cooking Class",
        traits: { openness: 0.6, conscientiousness: 0.7, agreeableness: 0.8 },
        tags: ["cooking", "learning", "teamwork"]
    },
    {
        name: "Improv Workshop",
        traits: { extroversion: 0.9, openness: 0.8, neuroticism: -0.6 },
        tags: ["performance", "creativity", "communication"]
    },
    {
        name: "Volunteer Project",
        traits: { agreeableness: 0.9, conscientiousness: 0.7, extroversion: 0.5 },
        tags: ["community", "teamwork", "social"]
    },
    {
        name: "DIY Crafting Session",
        traits: { openness: 0.7, conscientiousness: 0.8, neuroticism: -0.3 },
        tags: ["creative", "artistic", "hands-on"]
    },
    {
        name: "Team Sports Game",
        traits: { extroversion: 0.8, agreeableness: 0.7, neuroticism: -0.5 },
        tags: ["sports", "competition", "teamwork"]
    },
    {
        name: "Poker Night",
        traits: { extroversion: 0.6, conscientiousness: 0.7, neuroticism: -0.4 },
        tags: ["games", "social", "competitive"]
    },
    {
        name: "Soccer Match",
        traits: { extroversion: 0.8, agreeableness: 0.7, neuroticism: -0.5 },
        tags: ["sports", "outdoor", "teamwork"]
    },
    {
        name: "Basketball Game",
        traits: { extroversion: 0.8, agreeableness: 0.6, neuroticism: -0.4 },
        tags: ["sports", "fitness", "teamwork"]
    },
    {
        name: "Baseball Game",
        traits: { conscientiousness: 0.7, agreeableness: 0.6, neuroticism: -0.3 },
        tags: ["sports", "outdoor", "teamwork"]
    },
    {
        name: "Bar Hopping",
        traits: { extroversion: 0.9, openness: 0.7, neuroticism: -0.6 },
        tags: ["nightlife", "social", "drinking"]
    },
    {
        name: "Karaoke Night",
        traits: { extroversion: 0.8, openness: 0.7, neuroticism: -0.5 },
        tags: ["music", "performance", "nightlife"]
    },
    {
        name: "Get Matching Tattoos",
        traits: { openness: 0.9, neuroticism: -0.7, conscientiousness: -0.5 },
        tags: ["adventure", "permanent", "rebellious"]
    },
    {
        name: "Video Game Tournament",
        traits: { competitiveness: 0.7, extroversion: 0.5, neuroticism: -0.3 },
        tags: ["gaming", "competition", "indoor"]
    },
    {
        name: "Beach Volleyball",
        traits: { extroversion: 0.7, agreeableness: 0.6, neuroticism: -0.4 },
        tags: ["sports", "outdoor", "beach"]
    },
    {
        name: "Music Festival",
        traits: { openness: 0.8, extroversion: 0.8, neuroticism: -0.5 },
        tags: ["music", "outdoor", "social"]
    },
    {
        name: "Paint & Sip Night",
        traits: { openness: 0.7, extroversion: 0.5, neuroticism: -0.3 },
        tags: ["art", "drinking", "social"]
    }
    // Add more activities as needed
];

export default function SuggestionsScreen() {
    const { groupMembers } = useGroup();
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sortedActivities, setSortedActivities] = useState([]);

    const calculateGroupStats = () => {
        const stats = {
            avgTraits: {
                extroversion: 0,
                openness: 0,
                conscientiousness: 0,
                agreeableness: 0,
                neuroticism: 0
            },
            interests: new Set()
        };

        groupMembers.forEach(member => {
            // Calculate average traits
            Object.keys(member.traits).forEach(trait => {
                stats.avgTraits[trait] += member.traits[trait] / groupMembers.length;
            });

            // Collect all interests
            if (member.interests) {
                member.interests.toLowerCase().split(',')
                    .map(i => i.trim())
                    .forEach(interest => stats.interests.add(interest));
            }
        });

        return stats;
    };

    const calculateActivityCompatibility = (activity, groupStats) => {
        let compatibilityScore = 0;
        let reasons = [];

        // Trait compatibility (70% of total score)
        let traitScoreTotal = 0;
        let traitCount = 0;
        Object.entries(activity.traits).forEach(([trait, value]) => {
            const normalizedGroupTrait = groupStats.avgTraits[trait] / 100;
            const traitCompatibility = 1 - Math.abs(value - normalizedGroupTrait);
            traitScoreTotal += traitCompatibility;
            traitCount++;
        });

        // Average trait score (normalized to 70%)
        compatibilityScore += (traitScoreTotal / traitCount) * 0.7;

        // Interest matching (30% of total score)
        const matchingInterests = activity.tags.filter(tag =>
            Array.from(groupStats.interests).some(interest =>
                interest.includes(tag) || tag.includes(interest)
            )
        ).length;

        // Normalize interest score (max 30%)
        const interestScore = Math.min((matchingInterests / activity.tags.length), 1) * 0.3;
        compatibilityScore += interestScore;

        // Cap final score at 100%
        compatibilityScore = Math.min(compatibilityScore, 1);

        // Generate compatibility reasons
        if (interestScore > 0) {
            reasons.push("Matches group interests");
        }

        const strongestTrait = Object.entries(activity.traits)
            .reduce((a, b) => Math.abs(b[1] - groupStats.avgTraits[b[0]] / 100) <
                Math.abs(a[1] - groupStats.avgTraits[a[0]] / 100) ? b : a);

        reasons.push(`Strong ${strongestTrait[0]} compatibility`);

        return {
            id: Math.random().toString(36).substr(2, 9),
            activity: activity.name,
            compatibility: compatibilityScore,
            reason: reasons.join(". ")
        };
    };

    const generateSuggestions = () => {
        setLoading(true);
        const groupStats = calculateGroupStats();

        if (currentIndex === 0 || sortedActivities.length === 0) {
            // Initial sort or reset
            const allSuggestions = ACTIVITIES.map(activity =>
                calculateActivityCompatibility(activity, groupStats)
            ).sort((a, b) => b.compatibility - a.compatibility);

            setSortedActivities(allSuggestions);
            setSuggestions(allSuggestions.slice(0, 5));
            setCurrentIndex(5);
        } else {
            // Get next 5 suggestions
            const nextIndex = currentIndex + 5;
            const nextSuggestions = sortedActivities.slice(currentIndex, nextIndex);

            // Reset if we reach the end
            if (nextSuggestions.length < 5) {
                setSuggestions(sortedActivities.slice(0, 5));
                setCurrentIndex(5);
            } else {
                setSuggestions(nextSuggestions);
                setCurrentIndex(nextIndex);
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        generateSuggestions();
    }, [groupMembers]);

    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" />;
    }

    return (
        <View style={styles.container}>
            <Button
                title="Shuffle Suggestions"
                onPress={generateSuggestions}
                style={styles.shuffleButton}
            />
            <FlatList
                data={suggestions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.suggestionCard}>
                        <Text style={styles.activityTitle}>{item.activity}</Text>
                        <Text style={styles.compatibility}>
                            Compatibility: {Math.round(item.compatibility * 100)}%
                        </Text>
                        <Text style={styles.reason}>{item.reason}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shuffleButton: {
        marginBottom: 16,
    },
    suggestionCard: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        elevation: 2,
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    compatibility: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    reason: {
        fontSize: 14,
        color: '#444',
    }
});