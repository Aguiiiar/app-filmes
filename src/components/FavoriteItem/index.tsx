import React from "react";
import { Ionicons, Feather } from '@expo/vector-icons'
import {
    Container,
    Title,
    RateContaier,
    Rate,
    ActionContainer,
    DetailButton,
    DeleteButton
} from "./styles";

export default function FavoriteItem({ data, deleteMovie, navigatePage }) {

    return (
        <Container>
            <Title size={22}>{data.title}</Title>
            <RateContaier>
                <Ionicons name="md-star" size={12} color="#E7A74e" />
                <Rate>{data.vote_average.toFixed(1)}/10</Rate>
            </RateContaier>
            <ActionContainer>
                <DetailButton activeOpacity={0.9} onPress={() => navigatePage(data)}>
                    <Title size={14}>Ver Detalhes</Title>
                </DetailButton>

                <DeleteButton activeOpacity={0.8} onPress={() => deleteMovie(data.id)}>
                    <Feather name="trash" size={24} color="#ffffff" />
                </DeleteButton>
            </ActionContainer>
        </Container >
    )
}