import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Detail from "../pages/Detail"
import Home from "../pages/Home"
import Search from "../pages/Search"

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
                options={{
                    headerShown: false,
                    title: 'Detalhes'
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    title: 'Sua Busca',
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        color: '#FFFFFF',
                    },
                    headerStyle: {
                        backgroundColor: '#141a29'
                    }
                }}
            />
        </Stack.Navigator>
    )

}