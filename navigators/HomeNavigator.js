import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../app/HomeScreen';

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={ HomeScreen }
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />
}