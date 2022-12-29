import React from "react";
import { Text } from 'react-native'
import { Container } from "./styles";

export default function Genres({ data }) {
    return (
        <Container>
            <Text>{data.name}</Text>
        </Container>
    )
}