import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';
import { useGroup } from '../store/GroupContext';

export default function GroupMapScreen() {
    const { groupMembers } = useGroup();
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const calculateCompatibility = (member1, member2) => {
        const traits = ['extroversion', 'openness', 'conscientiousness', 'agreeableness', 'neuroticism'];
        let score = 0;

        // Calculate base compatibility from traits
        traits.forEach(trait => {
            const diff = Math.abs(member1.traits[trait] - member2.traits[trait]);
            if (trait === 'extroversion') {
                // Similar extroversion levels are good
                score += (100 - diff) * 0.02;
            } else if (trait === 'openness') {
                // Higher openness is generally better for group dynamics
                score += ((member1.traits[trait] + member2.traits[trait]) / 2) * 0.015;
            } else if (trait === 'conscientiousness') {
                // Balance of conscientiousness is good
                score += (100 - diff) * 0.015;
            } else if (trait === 'agreeableness') {
                // Higher agreeableness is better for compatibility
                score += ((member1.traits[trait] + member2.traits[trait]) / 2) * 0.02;
            } else if (trait === 'neuroticism') {
                // Lower neuroticism is better for group stability
                score += (200 - (member1.traits[trait] + member2.traits[trait])) * 0.01;
            }
        });

        // Interest compatibility bonus
        if (member1.interests && member2.interests) {
            const interests1 = member1.interests.toLowerCase().split(',').map(i => i.trim());
            const interests2 = member2.interests.toLowerCase().split(',').map(i => i.trim());
            const commonInterests = interests1.filter(i => interests2.includes(i));
            score += commonInterests.length * 0.5;
        }

        // Convert to 1-10 scale and cap
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