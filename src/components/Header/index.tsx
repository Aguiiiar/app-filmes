import React from 'react';
import { Container, MenuButton, Title } from './styles';
import { Feather } from '@expo/vector-icons'
import { useNavigation, DrawerActions } from '@react-navigation/native'

type HeaderProps = {
    title: string
}

export default function Header({ title }: HeaderProps) {
    const navigation = useNavigation();
    return (
        <Container>
            <MenuButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Feather name='menu' size={36} color="#FFFFFF" />
            </MenuButton>
            <Title>{title}</Title>
        </Container>
    )
}