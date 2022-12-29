import React from "react";
import { BannerImage, Container, Title, RateContainer, Rate } from "./styles";
import { Ionicons } from '@expo/vector-icons'

type MoviesProps = {
    title: string
    overview: string
    vote_average: number
    poster_path: string
}

type SliderProps = {
    data: MoviesProps
    navigatePage(item: MoviesProps): void
}

export default function SliderItem({ data, navigatePage }: SliderProps) {
    return (
        <Container activeOpacity={0.7} onPress={() => navigatePage(data)}>
            <BannerImage
                source={{
                    uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`
                }}
            />
            <Title numberOfLines={1}>{data.title}</Title>
            <RateContainer>
                <Ionicons name="md-star" size={12} color="#E7A74e" />
                <Rate>{data.vote_average}/10</Rate>
            </RateContainer>
        </Container>
    )
}