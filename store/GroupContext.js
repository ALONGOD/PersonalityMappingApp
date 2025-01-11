// store/GroupContext.js
import React, { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

export function GroupProvider({ children }) {
    const [groupMembers, setGroupMembers] = useState([]);

    const addMember = (memberData) => {
        // Convert selected traits and slider ratings into standardized trait scores
        const traits = {
            extroversion: calculateExtroversion(memberData),
            openness: calculateOpenness(memberData),
            conscientiousness: calculateConscientiousness(memberData),
            agreeableness: calculateAgreeableness(memberData),
            neuroticism: calculateNeuroticism(memberData)
        };

        const newMember = {
            id: memberData.id || Math.random().toString(36).substr(2, 9),
            name: memberData.name,
            traits: traits,
            interests: memberData.interests,
            selectedTraits: memberData.selectedTraits,
            ratings: memberData.ratings,
            analysis: memberData.analysis,
            color: generatePersonalityColor(traits)
        };

        setGroupMembers(prev => [...prev, newMember]);
    };

    // Helper functions to calculate big five traits from selected traits and ratings
    const calculateExtroversion = (data) => {
        let score = 50; // Base score
        if (data.selectedTraits.includes("Funny")) score += 10;
        if (data.selectedTraits.includes("Adventurous")) score += 10;
        if (data.ratings["Main Character Energy"]) {
            score += (data.ratings["Main Character Energy"] - 50) * 0.4;
        }
        return Math.min(100, Math.max(0, score));
    };

    const calculateOpenness = (data) => {
        let score = 50;
        if (data.selectedTraits.includes("Meme-Lord")) score += 10;
        if (data.selectedTraits.includes("Adventurous")) score += 15;
        if (data.ratings["Rizz Level"]) {
            score += (data.ratings["Rizz Level"] - 50) * 0.3;
        }
        return Math.min(100, Math.max(0, score));
    };

    const calculateConscientiousness = (data) => {
        let score = 50;
        if (data.selectedTraits.includes("Leader")) score += 15;
        if (data.selectedTraits.includes("Realistic")) score += 10;
        if (data.ratings["Emotional Intelligence"]) {
            score += (data.ratings["Emotional Intelligence"] - 50) * 0.3;
        }
        return Math.min(100, Math.max(0, score));
    };

    const calculateAgreeableness = (data) => {
        let score = 50;
        if (data.selectedTraits.includes("Empathetic")) score += 15;
        if (data.selectedTraits.includes("Caring")) score += 15;
        if (data.selectedTraits.includes("Chill")) score += 10;
        if (data.ratings["Chill Level"]) {
            score += (data.ratings["Chill Level"] - 50) * 0.3;
        }
        return Math.min(100, Math.max(0, score));
    };

    const calculateNeuroticism = (data) => {
        let score = 50;
        if (data.selectedTraits.includes("Sensitive")) score += 15;
        if (data.selectedTraits.includes("Sarcastic")) score += 10;
        if (data.ratings["Sus Level"]) {
            score += (data.ratings["Sus Level"] - 50) * 0.3;
        }
        return Math.min(100, Math.max(0, score));
    };

    // Keep existing functions
    const deleteMember = (memberId) => {
        setGroupMembers(prev => prev.filter(member => member.id !== memberId));
    };

    const getMember = (memberId) => {
        return groupMembers.find(member => member.id === memberId);
    };

    const generatePersonalityColor = (traits) => {
        const { extroversion, openness, conscientiousness, agreeableness, neuroticism } = traits;
        const r = Math.round((extroversion + neuroticism) * 1.27);
        const g = Math.round((agreeableness + conscientiousness) * 1.27);
        const b = Math.round((openness + (100 - neuroticism)) * 1.27);
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <GroupContext.Provider value={{
            groupMembers,
            addMember,
            deleteMember,
            getMember
        }}>
            {children}
        </GroupContext.Provider>
    );
}

export function useGroup() {
    const context = useContext(GroupContext);
    if (!context) {
        throw new Error('useGroup must be used within a GroupProvider');
    }
    return context;
}