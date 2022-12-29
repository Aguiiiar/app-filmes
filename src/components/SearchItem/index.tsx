import React from "react";
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Alert } from 'react-native'
import { Banner, Container, Title, RateContainer, Rate } from "./styles";

type MoviesProps = {
    id: number
    title: string
    vote_average: number
    poster_path: string
    release_date: string
}

export default function SearchItem({ data }: { data: MoviesProps }) {

    const navigation = useNavigation();
    console.log(data.release_date)

    function navigateDetailPage(item: MoviesProps) {
        if (item.release_date === '') {
            Alert.alert('Aviso', 'Filme ainda não lançado')
            return;
        };
        navigation.navigate('Detail', { id: item.id })
    }


    return (
        <Container activeOpacity={0.7} onPress={() => navigateDetailPage(data)}>
            {data?.poster_path ? (
                <Banner
                    resizeMethod="resize"
                    source={{ uri: `https://image.tmdb.org/t/p/original/${data.poster_path}` }} />
            ) : (
                <Banner source={require('../../assets/semfoto.png')} />
            )}
            <Title>{data?.title}</Title>
            <RateContainer>
                <Ionicons name="md-star" size={12} color="#E7A748" />
                <Rate>{data?.vote_average}/10</Rate>
            </RateContainer>
        </Container>
    )

}