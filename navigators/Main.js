import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from './HomeNavigator';
import MarketList from '../app/MarketList';
import AddMarket from '../app/AddMarket';
import Info from '../app/Info';

const Tab = createBottomTabNavigator();

const Main = () => {

    return (
        <Tab.Navigator 
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: '#e91e63'
            }}
        > 
            <Tab.Screen
                name="Search"
                component={ HomeNavigator }
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="search"
                            style={{ position: "relative" }}
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Add"
                component={ AddMarket }
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="plus"
                            style={{ position: "relative" }}
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Home"
                component={ HomeNavigator }
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="home"
                            style={{ position: "relative" }}
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="List"
                component={ MarketList }
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="list"
                            style={{ position: "relative" }}
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="About"
                component={ Info }
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="info"
                            style={{ position: "relative" }}
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
        </Tab.Navigator> 
    )
}

export default Main;