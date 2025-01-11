// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useGroup } from '../store/GroupContext';

export default function HomeScreen({ navigation }) {
    const { groupMembers } = useGroup();

    const renderMemberCard = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('MemberDetail', { memberId: item.id })}
            style={[styles.memberCard, { backgroundColor: item.color }]}
        >
            <Text style={styles.memberName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Group</Text>
            <FlatList
                data={groupMembers}
                keyExtractor={(item) => item.id}
                renderItem={renderMemberCard}
                style={styles.list}
            />

            <View style={styles.buttonContainer}>
                <Button
                    title="Add Group Member"
                    onPress={() => navigation.navigate('AddPerson')}
                />

                {groupMembers.length > 1 && (
                    <>
                        <View style={styles.buttonSpacer} />
                        <Button
                            title="View Group Dynamics"
                            onPress={() => navigation.navigate('GroupMap')}
                        />
                        <View style={styles.buttonSpacer} />
                        <Button
                            title="Get Group Suggestions"
                            onPress={() => navigation.navigate('Suggestions')}
                        />
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    list: {
        flex: 1,
        marginBottom: 20,
    },
    memberCard: {
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    memberName: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
    buttonContainer: {
        marginTop: 10,
    },
    buttonSpacer: {
        height: 10,
    }
});