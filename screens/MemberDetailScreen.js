import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useGroup } from '../store/GroupContext';

export default function MemberDetailScreen({ route, navigation }) {
    const { getMember, deleteMember } = useGroup();
    const { memberId } = route.params;
    const member = getMember(memberId);

    const handleDelete = () => {
        Alert.alert(
            "Delete Member",
            `Are you sure you want to remove ${member.name} from the group?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        deleteMember(memberId);
                        navigation.goBack();
                    },
                    style: "destructive"
                }
            ]
        );
    };

    if (!member) return null;

    return (
        <View style={styles.container}>
            <View style={[styles.header, { backgroundColor: member.color }]}>
                <Text style={styles.name}>{member.name}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personality Analysis</Text>
                <Text style={styles.analysis}>{member.analysis}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Traits</Text>
                {Object.entries(member.traits).map(([trait, value]) => (
                    <Text key={trait} style={styles.trait}>
                        {trait.charAt(0).toUpperCase() + trait.slice(1)}: {value}
                    </Text>
                ))}
            </View>

            {member.interests && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Interests</Text>
                    <Text style={styles.interests}>{member.interests}</Text>
                </View>
            )}

            <Button
                title="Delete Member"
                onPress={handleDelete}
                color="#ff4444"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    section: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    analysis: {
        fontSize: 16,
        lineHeight: 24,
    },
    trait: {
        fontSize: 16,
        marginVertical: 4,
    },
    interests: {
        fontSize: 16,
    }
});