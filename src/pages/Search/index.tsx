import React, { useState, useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Container, ListMovies } from './styles'
import { api, key } from '../../services/api'
import SearchItem from '../../components/SearchItem';

type RouteProps = {
    name: string
}

type MoviesProps = {
    id: number
    title: string
    vote_average: number
    poster_path: string
    release_date: string
}

export default function Search() {
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, RouteProps>, string>>();

    useEffect(() => {
        let isActive: boolean = true;

        async function getSearchMovie() {
            const response = await api.get('/search/movie', {
                params: {
                    api_key: key,
                    language: 'pt-BR',
                    query: route.params?.name
                }
            })

            console.log(response.data)

            if (isActive) {
                setMovie(response.data.results)
                setLoading(false)
            }
        }

        if (isActive) {
            getSearchMovie()
        }

        return () => {
            isActive = false
        }
    }, [])

    if (loading) {
        return (
            <Container>

            </Container>
        )
    }

    return (
        <Container>
            <ListMovies<React.ElementType>
                data={movie}
                showsVerticalScrollIndicator={false}
                keyExtractor={({ item }: { item: MoviesProps }) => String(item?.id)}
                renderItem={({ item }: { item: MoviesProps }) => <SearchItem data={item} />}
            />
        </Container>
    )
}