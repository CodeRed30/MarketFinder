import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../app/HomeScreen';
import SingleMarket from '../app/SingleMarket';

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={ HomeScreen }
            />
            <Stack.Screen
                name='Market Details'
                component={ SingleMarket }
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />
}