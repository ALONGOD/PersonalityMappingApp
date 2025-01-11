import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

export default function SuggestionsScreen({ route }) {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        generateSuggestions();
    }, []);

    const generateSuggestions = async () => {
        try {
            // TODO: Implement AI suggestion generation
            // Mock data for now
            setSuggestions([
                {
                    id: '1',
                    activity: 'Escape Room Adventure',
                    compatibility: 0.85,
                    reason: 'Combines problem-solving skills of analytical members with communication needs of social members'
                },
                // Add more suggestions...
            ]);
            setLoading(false);
        } catch (error) {
            console.error('Error generating suggestions:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" />;
    }

    return (
        <View style={styles.container}>
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
    },
});