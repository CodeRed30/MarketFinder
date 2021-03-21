import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

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
                name="Home"
                component={}
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
        </Tab.Navigator> 
    )
}

export default Main;