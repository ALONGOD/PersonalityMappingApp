import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useGroup } from '../store/GroupContext';

const ACTIVITIES = [
    {
        name: "Escape Room Adventure 🕵️‍♂️",
        traits: {
            ratings: {
                "Funny Level": 60,
                "Chill Level": 50,
                "Sus Level": 40,
                "Rizz Level": 50,
                "Main Character Energy": 60,
                "Emotional Intelligence": 70,
            },
            preferredTraits: ["Problem-Solver", "Leader", "Adventurous"]
        },
        tags: ["problem-solving", "teamwork", "communication"]
    },
    {
        name: "Game Night 🎲",
        traits: {
            ratings: {
                "Funny Level": 80,
                "Chill Level": 70,
                "Sus Level": 50,
                "Rizz Level": 40,
                "Main Character Energy": 50,
                "Emotional Intelligence": 60,
            },
            preferredTraits: ["Funny", "Competitive", "Social"]
        },
        tags: ["games", "social", "fun"]
    },
    {
        name: "Group Hiking Trip 🥾",
        traits: {
            ratings: {
                "Funny Level": 50,
                "Chill Level": 80,
                "Sus Level": 20,
                "Rizz Level": 40,
                "Main Character Energy": 70,
                "Emotional Intelligence": 60,
            },
            preferredTraits: ["Adventurous", "Nature-Lover", "Fitness-Oriented"]
        },
        tags: ["outdoor", "nature", "fitness"]
    },
    {
        name: "Board Game Night ♟️",
        traits: {
            ratings: {
                "Funny Level": 70,
                "Chill Level": 60,
                "Sus Level": 30,
                "Rizz Level": 30,
                "Main Character Energy": 50,
                "Emotional Intelligence": 60,
            },
            preferredTraits: ["Strategic", "Social", "Patient"]
        },
        tags: ["games", "strategy", "indoor"]
    },
    {
        name: "Cooking Class 👨‍🍳",
        traits: {
            ratings: {
                "Funny Level": 50,
                "Chill Level": 70,
                "Sus Level": 10,
                "Rizz Level": 30,
                "Main Character Energy": 40,
                "Emotional Intelligence": 80,
            },
            preferredTraits: ["Creative", "Team-Oriented", "Patient"]
        },
        tags: ["cooking", "learning", "teamwork"]
    },
    {
        name: "Improv Workshop 🎤",
        traits: {
            ratings: {
                "Funny Level": 90,
                "Chill Level": 40,
                "Sus Level": 60,
                "Rizz Level": 80,
                "Main Character Energy": 90,
                "Emotional Intelligence": 70,
            },
            preferredTraits: ["Confident", "Creative", "Social"]
        },
        tags: ["performance", "creativity", "communication"]
    },
    {
        name: "Volunteer Project 🛠️",
        traits: {
            ratings: {
                "Funny Level": 40,
                "Chill Level": 50,
                "Sus Level": 10,
                "Rizz Level": 20,
                "Main Character Energy": 60,
                "Emotional Intelligence": 90,
            },
            preferredTraits: ["Compassionate", "Team-Oriented", "Helpful"]
        },
        tags: ["community", "teamwork", "social"]
    },
    {
        name: "DIY Crafting Session ✂️",
        traits: {
            ratings: {
                "Funny Level": 50,
                "Chill Level": 70,
                "Sus Level": 20,
                "Rizz Level": 30,
                "Main Character Energy": 40,
                "Emotional Intelligence": 70,
            },
            preferredTraits: ["Creative", "Artistic", "Focused"]
        },
        tags: ["creative", "artistic", "hands-on"]
    },
    {
        name: "Team Sports Game ⚽",
        traits: {
            ratings: {
                "Funny Level": 70,
                "Chill Level": 50,
                "Sus Level": 30,
                "Rizz Level": 60,
                "Main Character Energy": 70,
                "Emotional Intelligence": 60,
            },
            preferredTraits: ["Competitive", "Team-Oriented", "Active"]
        },
        tags: ["sports", "competition", "teamwork"]
    },
    {
        name: "Poker Night 🃏",
        traits: {
            ratings: {
                "Funny Level": 60,
                "Chill Level": 70,
                "Sus Level": 60,
                "Rizz Level": 50,
                "Main Character Energy": 40,
                "Emotional Intelligence": 60,
            },
            preferredTraits: ["Strategic", "Social", "Competitive"]
        },
        tags: ["games", "social", "competitive"]
    },
    {
        name: "Bar Hopping 🍻",
        traits: {
            ratings: {
                "Funny Level": 90,
                "Chill Level": 50,
                "Sus Level": 70,
                "Rizz Level": 80,
                "Main Character Energy": 70,
                "Emotional Intelligence": 50,
            },
            preferredTraits: ["Extroverted", "Adventurous", "Social"]
        },
        tags: ["nightlife", "social", "drinking"]
    },
    {
        name: "Karaoke Night 🎶",
        traits: {
            ratings: {
                "Funny Level": 80,
                "Chill Level": 50,
                "Sus Level": 40,
                "Rizz Level": 70,
                "Main Character Energy": 80,
                "Emotional Intelligence": 60,
            },
            preferredTraits: ["Confident", "Performative", "Social"]
        },
        tags: ["music", "performance", "nightlife"]
    },
    {
        name: "Get Matching Tattoos 🖋️",
        traits: {
            ratings: {
                "Funny Level": 60,
                "Chill Level": 40,
                "Sus Level": 90,
                "Rizz Level": 80,
                "Main Character Energy": 70,
                "Emotional Intelligence": 50,
            },
            preferredTraits: ["Adventurous", "Daring", "Rebellious"]
        },
        tags: ["adventure", "permanent", "rebellious"]
    },
    {
        name: "Smoke Zaza 🌬️",
        traits: {
            ratings: {
                "Funny Level": 70,
                "Chill Level": 90,
                "Sus Level": 50,
                "Rizz Level": 40,
                "Main Character Energy": 40,
                "Emotional Intelligence": 50,
            },
            preferredTraits: ["Relaxed", "Chill", "Open-Minded"]
        },
        tags: ["relaxation", "social", "fun"]
    },
    {
        name: "Orgy Night 🍑",
        traits: {
            ratings: {
                "Funny Level": 50,
                "Chill Level": 30,
                "Sus Level": 100,
                "Rizz Level": 90,
                "Main Character Energy": 80,
                "Emotional Intelligence": 40,
            },
            preferredTraits: ["Sus", "Adventurous", "Open-Minded", "Confident"]
        },
        tags: ["intimacy", "social", "adventure"]
    },
    {
        name: "Mini Golf Tournament ⛳",
        traits: {
            ratings: {
                "Funny Level": 70,
                "Chill Level": 80,
                "Sus Level": 20,
                "Rizz Level": 40,
                "Main Character Energy": 50,
                "Emotional Intelligence": 60,
            },
            preferredTraits: ["Patient", "Strategic", "Competitive"]
        },
        tags: ["fun", "sports", "social"]
    },
    {
        name: "Beach Day 🏖️",
        traits: {
            ratings: {
                "Funny Level": 80,
                "Chill Level": 90,
                "Sus Level": 30,
                "Rizz Level": 50,
                "Main Character Energy": 60,
                "Emotional Intelligence": 50,
            },
            preferredTraits: ["Relaxed", "Adventurous", "Nature-Lover"]
        },
        tags: ["outdoor", "nature", "relaxation"]
    },
    {
        name: "Wine Tasting 🍷",
        traits: {
            ratings: {
                "Funny Level": 60,
                "Chill Level": 70,
                "Sus Level": 30,
                "Rizz Level": 60,
                "Main Character Energy": 50,
                "Emotional Intelligence": 70,
            },
            preferredTraits: ["Sophisticated", "Curious", "Social"]
        },
        tags: ["food", "drinks", "classy"]
    },
    {
        name: "Hot Air Balloon Ride 🎈",
        traits: {
            ratings: {
                "Funny Level": 40,
                "Chill Level": 90,
                "Sus Level": 10,
                "Rizz Level": 70,
                "Main Character Energy": 80,
                "Emotional Intelligence": 60,
            },
            preferredTraits: ["Adventurous", "Romantic", "Curious"]
        },
        tags: ["adventure", "scenic", "memorable"]
    },
    {
        name: "Trivia Night 📚",
        traits: {
            ratings: {
                "Funny Level": 70,
                "Chill Level": 50,
                "Sus Level": 30,
                "Rizz Level": 40,
                "Main Character Energy": 50,
                "Emotional Intelligence": 70,
            },
            preferredTraits: ["Smart", "Competitive", "Team-Oriented"]
        },
        tags: ["games", "intellectual", "social"]
    },
    {
        name: "Paintball Battle 🔫",
        traits: {
            ratings: {
                "Funny Level": 80,
                "Chill Level": 40,
                "Sus Level": 50,
                "Rizz Level": 60,
                "Main Character Energy": 90,
                "Emotional Intelligence": 50,
            },
            preferredTraits: ["Competitive", "Strategic", "Active"]
        },
        tags: ["action", "strategy", "teamwork"]
    },
    {
        name: "Camping Trip ⛺",
        traits: {
            ratings: {
                "Funny Level": 60,
                "Chill Level": 80,
                "Sus Level": 20,
                "Rizz Level": 40,
                "Main Character Energy": 70,
                "Emotional Intelligence": 70,
            },
            preferredTraits: ["Nature-Lover", "Adventurous", "Independent"]
        },
        tags: ["outdoor", "nature", "adventure"]
    },
    {
        name: "Comedy Club Night 🎭",
        traits: {
            ratings: {
                "Funny Level": 90,
                "Chill Level": 60,
                "Sus Level": 30,
                "Rizz Level": 50,
                "Main Character Energy": 60,
                "Emotional Intelligence": 50,
            },
            preferredTraits: ["Funny", "Social", "Relaxed"]
        },
        tags: ["entertainment", "laughter", "social"]
    },
    {
        name: "Horseback Riding 🐎",
        traits: {
            ratings: {
                "Funny Level": 50,
                "Chill Level": 70,
                "Sus Level": 20,
                "Rizz Level": 50,
                "Main Character Energy": 80,
                "Emotional Intelligence": 70,
            },
            preferredTraits: ["Nature-Lover", "Adventurous", "Calm"]
        },
        tags: ["outdoor", "animals", "scenic"]
    },
    {
        name: "Pottery Class 🏺",
        traits: {
            ratings: {
                "Funny Level": 60,
                "Chill Level": 70,
                "Sus Level": 10,
                "Rizz Level": 40,
                "Main Character Energy": 50,
                "Emotional Intelligence": 80,
            },
            preferredTraits: ["Creative", "Patient", "Focused"]
        },
        tags: ["creative", "hands-on", "relaxing"]
    },
    {
        name: "Haunted House Tour 👻",
        traits: {
            ratings: {
                "Funny Level": 70,
                "Chill Level": 30,
                "Sus Level": 60,
                "Rizz Level": 50,
                "Main Character Energy": 70,
                "Emotional Intelligence": 60,
            },
            preferredTraits: ["Adventurous", "Brave", "Energetic"]
        },
        tags: ["thrill", "fun", "adventure"]
    },
    {
        name: "Sushi Rolling Class 🍣",
        traits: {
            ratings: {
                "Funny Level": 50,
                "Chill Level": 80,
                "Sus Level": 10,
                "Rizz Level": 40,
                "Main Character Energy": 40,
                "Emotional Intelligence": 80,
            },
            preferredTraits: ["Creative", "Patient", "Team-Oriented"]
        },
        tags: ["cooking", "learning", "teamwork"]
    },
    {
        name: "Arcade Night 🕹️",
        traits: {
            ratings: {
                "Funny Level": 80,
                "Chill Level": 60,
                "Sus Level": 30,
                "Rizz Level": 50,
                "Main Character Energy": 60,
                "Emotional Intelligence": 50,
            },
            preferredTraits: ["Competitive", "Funny", "Energetic"]
        },
        tags: ["games", "fun", "social"]
    },
    {
        name: "Laser Tag Battle 🔦",
        traits: {
            ratings: {
                "Funny Level": 80,
                "Chill Level": 50,
                "Sus Level": 40,
                "Rizz Level": 60,
                "Main Character Energy": 80,
                "Emotional Intelligence": 50,
            },
            preferredTraits: ["Competitive", "Strategic", "Team-Oriented"]
        },
        tags: ["action", "strategy", "teamwork"]
    },
    {
        name: "Rock Climbing 🧗",
        traits: {
            ratings: {
                "Funny Level": 50,
                "Chill Level": 60,
                "Sus Level": 30,
                "Rizz Level": 60,
                "Main Character Energy": 90,
                "Emotional Intelligence": 70,
            },
            preferredTraits: ["Adventurous", "Fit", "Persistent"]
        },
        tags: ["fitness", "adventure", "outdoor"]
    },
    {
        name: "Ice Skating ⛸️",
        traits: {
            ratings: {
                "Funny Level": 70,
                "Chill Level": 70,
                "Sus Level": 20,
                "Rizz Level": 50,
                "Main Character Energy": 60,
                "Emotional Intelligence": 60,
            },
            preferredTraits: ["Graceful", "Patient", "Adventurous"]
        },
        tags: ["sports", "fun", "social"]
    },
    {
        name: "Zoo Scavenger Hunt 🦁",
        traits: {
            ratings: {
                "Funny Level": 60,
                "Chill Level": 70,
                "Sus Level": 20,
                "Rizz Level": 30,
                "Main Character Energy": 50,
                "Emotional Intelligence": 70,
            },
            preferredTraits: ["Curious", "Adventurous", "Observant"]
        },
        tags: ["outdoor", "animals", "teamwork"]
    },
    {
        name: "Baking Competition 🍪",
        traits: {
            ratings: {
                "Funny Level": 70,
                "Chill Level": 80,
                "Sus Level": 20,
                "Rizz Level": 40,
                "Main Character Energy": 50,
                "Emotional Intelligence": 80,
            },
            preferredTraits: ["Creative", "Patient", "Competitive"]
        },
        tags: ["cooking", "fun", "teamwork"]
    },
    {
        name: "Sunrise Yoga 🌅",
        traits: {
            ratings: {
                "Funny Level": 40,
                "Chill Level": 90,
                "Sus Level": 10,
                "Rizz Level": 30,
                "Main Character Energy": 50,
                "Emotional Intelligence": 90,
            },
            preferredTraits: ["Calm", "Mindful", "Healthy"]
        },
        tags: ["fitness", "relaxation", "mindfulness"]
    }
];



export default function SuggestionsScreen() {
    const { groupMembers } = useGroup();
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (groupMembers && groupMembers.length > 0) {
            generateSuggestions();
        }
    }, [groupMembers]);

    const calculateGroupStats = () => {
        const stats = {
            avgRatings: {
                "Funny Level": 0,
                "Chill Level": 0,
                "Sus Level": 0,
                "Rizz Level": 0,
                "Main Character Energy": 0,
                "Emotional Intelligence": 0
            },
            commonTraits: [],
            interests: new Set()
        };

        if (!groupMembers || groupMembers.length === 0) return stats;

        // Calculate average ratings
        groupMembers.forEach(member => {
            if (member.ratings) {
                Object.keys(stats.avgRatings).forEach(rating => {
                    const ratingValue = member.ratings[rating] || 0;
                    stats.avgRatings[rating] += ratingValue / groupMembers.length;
                });
            }

            // Collect traits
            if (member.selectedTraits && Array.isArray(member.selectedTraits)) {
                member.selectedTraits.forEach(trait => {
                    if (groupMembers.filter(m =>
                        m.selectedTraits &&
                        Array.isArray(m.selectedTraits) &&
                        m.selectedTraits.includes(trait)
                    ).length > 1) {
                        if (!stats.commonTraits.includes(trait)) {
                            stats.commonTraits.push(trait);
                        }
                    }
                });
            }

            // Collect interests
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

        // Rating compatibility (50% of total score)
        let ratingScore = 0;
        const ratingKeys = Object.keys(activity.traits.ratings);

        ratingKeys.forEach(key => {
            const groupAvg = groupStats.avgRatings[key] || 50;
            const activityRating = activity.traits.ratings[key];
            const ratingDiff = Math.abs(groupAvg - activityRating);
            ratingScore += (100 - ratingDiff) / 100;
        });

        compatibilityScore += (ratingScore / ratingKeys.length) * 0.5;

        // Trait matching (30% of total score)
        const matchingTraits = activity.traits.preferredTraits.filter(trait =>
            groupStats.commonTraits.includes(trait)
        );
        const traitScore = (matchingTraits.length / activity.traits.preferredTraits.length) * 0.3;
        compatibilityScore += traitScore;

        // Interest matching (20% of total score)
        const matchingInterests = activity.tags.filter(tag =>
            Array.from(groupStats.interests).some(interest =>
                interest.includes(tag) || tag.includes(interest)
            )
        );
        const interestScore = (matchingInterests.length / activity.tags.length) * 0.2;
        compatibilityScore += interestScore;

        // Generate reasons
        if (matchingTraits.length > 0) {
            reasons.push(`Matches group traits: ${matchingTraits.join(', ')}`);
        }
        if (matchingInterests.length > 0) {
            reasons.push(`Aligns with group interests`);
        }

        return {
            id: Math.random().toString(36).substr(2, 9),
            activity: activity.name,
            compatibility: Math.round(compatibilityScore * 100),
            reason: reasons.join('. ')
        };
    };

    const generateSuggestions = () => {
        const groupStats = calculateGroupStats();
        const activitySuggestions = ACTIVITIES.map(activity =>
            calculateActivityCompatibility(activity, groupStats)
        ).sort((a, b) => b.compatibility - a.compatibility);
        setSuggestions(activitySuggestions);
    };

    return (
        <ScrollView style={styles.container}>
            {suggestions.map(suggestion => (
                <View key={suggestion.id} style={styles.card}>
                    <Text style={styles.activityName}>{suggestion.activity}</Text>
                    <Text style={styles.compatibility}>
                        Compatibility: {suggestion.compatibility}%
                    </Text>
                    <Text style={styles.reason}>{suggestion.reason}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    activityName: {
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
        color: '#888',
    },
});