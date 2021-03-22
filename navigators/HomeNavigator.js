import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../app/HomeScreen';
import SingleMarket from '../app/SingleMarket';
import MarketList from '../app/MarketList';
import AddMarket from '../app/AddMarket';
import Info from '../app/Info';

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
            <Stack.Screen
                name='Market List'
                component={ MarketList }
            />
            <Stack.Screen
                name='Add Market'
                component={ AddMarket }
            />
            <Stack.Screen
                name='Info'
                component={ Info }
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />
}