import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';
import { useGroup } from '../store/GroupContext';

export default function GroupMapScreen() {
    const { groupMembers } = useGroup();
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const calculateCompatibility = (member1, member2) => {
        let score = 5; // Base compatibility score

        // Calculate shared traits bonus
        const sharedTraits = member1.selectedTraits.filter(trait =>
            member2.selectedTraits.includes(trait)
        );
        score += sharedTraits.length * 0.5;

        // Calculate rating compatibility
        const ratingKeys = [
            "Funny Level",
            "Chill Level",
            "Sus Level",
            "Rizz Level",
            "Main Character Energy",
            "Emotional Intelligence"
        ];

        ratingKeys.forEach(key => {
            if (member1.ratings[key] && member2.ratings[key]) {
                const diff = Math.abs(member1.ratings[key] - member2.ratings[key]);
                // Add compatibility bonus for similar ratings
                score += (100 - diff) * 0.01;
            }
        });

        // Interest compatibility
        if (member1.interests && member2.interests) {
            const interests1 = member1.interests.toLowerCase().split(',').map(i => i.trim());
            const interests2 = member2.interests.toLowerCase().split(',').map(i => i.trim());
            const commonInterests = interests1.filter(i => interests2.includes(i));
            score += commonInterests.length * 0.5;
        }

        // Cap final score between 1-10
        return Math.min(Math.max(Math.round(score), 1), 10);
    };

    const calculatePositions = (members) => {
        const radius = Math.min(screenWidth, screenHeight) * 0.3;
        const center = { x: screenWidth / 2, y: screenHeight / 2 };
        const positions = {};

        members.forEach((member, index) => {
            const angle = (2 * Math.PI * index) / members.length;
            positions[member.id] = {
                x: center.x + radius * Math.cos(angle),
                y: center.y + radius * Math.sin(angle)
            };
        });

        return positions;
    };

    const positions = calculatePositions(groupMembers);

    const renderConnections = () => {
        const connections = [];

        for (let i = 0; i < groupMembers.length; i++) {
            for (let j = i + 1; j < groupMembers.length; j++) {
                const member1 = groupMembers[i];
                const member2 = groupMembers[j];
                const compatibility = calculateCompatibility(member1, member2);
                const pos1 = positions[member1.id];
                const pos2 = positions[member2.id];

                // Calculate midpoint for score text
                const midX = (pos1.x + pos2.x) / 2;
                const midY = (pos1.y + pos2.y) / 2;

                connections.push(
                    <React.Fragment key={`${member1.id}-${member2.id}`}>
                        <Line
                            x1={pos1.x}
                            y1={pos1.y}
                            x2={pos2.x}
                            y2={pos2.y}
                            stroke={`rgba(0,0,0,${compatibility / 10})`}
                            strokeWidth={compatibility}
                        />
                        <SvgText
                            x={midX}
                            y={midY}
                            fill="black"
                            fontSize="16"
                            textAnchor="middle"
                        >
                            {compatibility}
                        </SvgText>
                    </React.Fragment>
                );
            }
        }
        return connections;
    };

    const renderMembers = () => {
        return groupMembers.map(member => {
            const pos = positions[member.id];
            return (
                <React.Fragment key={member.id}>
                    <Circle
                        cx={pos.x}
                        cy={pos.y}
                        r={30}
                        fill={member.color}
                    />
                    <SvgText
                        x={pos.x}
                        y={pos.y + 50}
                        fill="black"
                        fontSize="14"
                        textAnchor="middle"
                    >
                        {member.name}
                    </SvgText>
                </React.Fragment>
            );
        });
    };

    return (
        <View style={styles.container}>
            <Svg width={screenWidth} height={screenHeight}>
                {renderConnections()}
                {renderMembers()}
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});