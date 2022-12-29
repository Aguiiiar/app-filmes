import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'

import Movies from '../pages/Movies'
import StackRoutes from './StackRoutes';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Drawer = createDrawerNavigator();

export default function Routes() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false, 

                drawerStyle: {
                    backgroundColor: '#090A0E',
                    paddingTop: 20
                },

                drawerActiveBackgroundColor: '#E72F49',
                drawerActiveTintColor: '#FFFFFF',
                drawerInactiveTintColor: '#FFFFFF'
            }}
        >
            <Drawer.Screen 
            name="HomeDrawer" 
            component={StackRoutes} 
            options={{
                title: 'Home',
                drawerIcon: ({focused, size, color}) => {
                    return <MaterialCommunityIcons
                        name={focused ? 'movie-open' : 'movie-outline'}
                        size={size}
                        color={color} />;
                }

            }}
            />

            <Drawer.Screen 
                name="Movies" 
                component={Movies} 
                options={{
                    title: 'Meus filmes',
                    drawerIcon: ({focused, size, color}) => {
                        return <MaterialCommunityIcons
                            name={focused ? 'archive' : 'archive-outline'}
                            size={size}
                            color={color} />;
                    }
                }}
                />
        </Drawer.Navigator>
    )
}