import React, { useEffect, useState } from 'react';
import Stars from 'react-native-stars'
import { Alert } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { ScrollView, Modal } from 'react-native'
import {
    Container,
    Title,
    Header,
    HeaderButton,
    Banner,
    BannerLink,
    ContentArea,
    Rate,
    ListGenres,
    Description
} from './styles';
import { api, key } from '../../services/api';
import Genres from '../../components/Genres'
import ModalLink from '../../components/ModalLink'
import { saveMovie, hasMovie, deleteMovie } from '../../utils/storage'


type MoviesProps = {
    id: number
    title: string
    overview: string
    vote_average: number
    poster_path: string
    genres: [{ id: number, name: string }],
}


export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, MoviesProps>, string>>();

    const [movie, setMovie] = useState<MoviesProps>({
        id: 0,
        overview: '',
        title: '',
        poster_path: '',
        vote_average: 0,
        genres: [{ id: 0, name: '' }],
    });

    const [favoriteMovie, setFavoriteMovie] = useState(false);

    const [openLink, setOpenLink] = useState(false);

    useEffect(() => {
        let isActive: boolean = true;

        async function getMovie() {
            try {
                const response = await api.get(`/movie/${route.params?.id}`, {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                    }
                })

                if (isActive) {
                    setMovie(response.data)
                    const isFavorite = await hasMovie(response.data)
                    setFavoriteMovie(isFavorite)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (isActive) {
            getMovie()
        }
        return () => {
            isActive = false
        }
    }, [])

    async function handleFavoriteMovie(movie: MoviesProps) {

        if (favoriteMovie) {
            await deleteMovie(movie.id)
            setFavoriteMovie(false);
            Alert.alert('Aviso', 'Filme removido da sua lista')
            return
        } else {
            await saveMovie('@primereact', movie)
            Alert.alert('Aviso', 'Filme salvo na sua lista');
            setFavoriteMovie(true);
        }
    }


    return (
        <Container>
            <Header>
                <HeaderButton>
                    <Feather name="arrow-left" size={28} color="#FFFFFF" onPress={() => navigation.goBack()} />
                </HeaderButton>
                <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
                    {favoriteMovie ? (
                        <Ionicons name={"bookmark"} size={28} color="#FFFFFF" />
                    ) : (
                        <Ionicons name={"bookmark-outline"} size={28} color="#FFFFFF" />
                    )}
                </HeaderButton>
            </Header>

            <Banner
                resizeMethod='resize'
                source={{
                    uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                }}
            />
            <BannerLink onPress={() => setOpenLink(true)}>
                <Feather name="link" size={24} color="#FFFFFF" />
            </BannerLink>

            <Title numberOfLines={2}>{movie.title}</Title>

            <ContentArea>
                <Stars
                    default={movie.vote_average}
                    count={10}
                    half={true}
                    starSize={20}
                    fullStar={<Ionicons name="md-star" size={24} color="#E7A74e" />}
                    emptyStar={<Ionicons name="md-star-outline" size={24} color="#E7A74e" />}
                    halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74e" />}
                    disabled={true}
                />
                <Rate>{movie.vote_average.toFixed(1)}/10</Rate>
            </ContentArea>

            <ListGenres<React.ElementType>
                data={movie.genres}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={({ item }: { item: MoviesProps }) => String(item?.id)}
                renderItem={({ item }) => <Genres data={item} key={item.id} />}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Descrição</Title>
                <Description>
                    {movie?.overview}
                </Description>
            </ScrollView>

            <Modal animationType="slide" visible={openLink} transparent={true}>
                <ModalLink
                    id={movie.id}
                    title={movie.title}
                    closeModal={() => setOpenLink(false)}
                />
            </Modal>
        </Container>
    )
}