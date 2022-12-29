import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native'

import Header from '../../components/Header'
import { Container, ListMovies } from './styles';
import { deleteMovie, getMoviesSave } from '../../utils/storage'
import FavoriteItem from '../../components/FavoriteItem';

export default function Movies() {

    const [movies, setMovies] = useState([])
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    useEffect(() => {
        let isActive = true

        async function getFavoriteMovie() {
            const result = await getMoviesSave('@primereact')

            if (isActive) {
                setMovies(result)
            }
        }
        if (isActive) {
            getFavoriteMovie()
        }

        return () => {
            isActive = false;
        }
    }, [isFocused])

    async function handleDeleteMovie(id) {
        const result = await deleteMovie(id)
        setMovies(result)
    }


    function navigateDetailPage(item) {
        navigation.navigate('Detail', { id: item.id })
    }

    return (
        <Container>
            <Header title="Meus filmes" />

            <ListMovies<React.ElementType>
                data={movies}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <FavoriteItem data={item}
                        deleteMovie={() => handleDeleteMovie(item.id)}
                        navigatePage={() => navigateDetailPage(item)}
                    />
                )}
            />
        </Container>

    )
}