// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useGroup } from '../store/GroupContext';

export default function HomeScreen({ navigation }) {
    const { groupMembers } = useGroup();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Group</Text>
            <FlatList
                data={groupMembers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.memberCard, { backgroundColor: item.color }]}>
                        <Text style={styles.memberName}>{item.name}</Text>
                    </View>
                )}
            />
            <Button
                title="Add Group Member"
                onPress={() => navigation.navigate('AddPerson')}
            />
            {groupMembers.length > 1 && (
                <>
                    <Button
                        title="View Group Dynamics"
                        onPress={() => navigation.navigate('GroupMap')}
                    />
                    <Button
                        title="Get Group Suggestions"
                        onPress={() => navigation.navigate('Suggestions')}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    memberCard: {
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
    },
    memberName: {
        fontSize: 18,
        color: '#fff',
    },
});