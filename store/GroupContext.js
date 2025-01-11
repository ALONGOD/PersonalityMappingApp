// store/GroupContext.js
import React, { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

export function GroupProvider({ children }) {
    const [groupMembers, setGroupMembers] = useState([]);

    const addMember = (memberData) => {
        const newMember = {
            id: Math.random().toString(36).substr(2, 9),
            ...memberData,
            color: generatePersonalityColor(memberData.traits),
        };
        setGroupMembers((prevMembers) => [...prevMembers, newMember]);
    };

    const deleteMember = (memberId) => {
        setGroupMembers((prevMembers) =>
            prevMembers.filter(member => member.id !== memberId)
        );
    };

    const getMember = (memberId) => {
        return groupMembers.find(member => member.id === memberId);
    };

    const generatePersonalityColor = (traits) => {
        const { extroversion, openness, conscientiousness, agreeableness, neuroticism } = traits;

        // Color generation based on personality traits
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