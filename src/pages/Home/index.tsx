import React, { useState, useEffect } from 'react'
import { ScrollView, ActivityIndicator, Alert } from 'react-native';
import {
    Container,
    SearchContainer,
    Input,
    SearchButton,
    Title,
    Banner,
    BannerButton,
    SliderMovie,
    Loading
} from './styles';

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { api, key } from '../../services/api'
import { getListMovies, randomBanner } from '../../utils/movie';

type MoviesProps = {
    id: number
    title: string
    overview: string
    vote_average: number
    poster_path: string
    genres: [{ id: number, name: string }],
}

export default function Home() {

    const [nowMovies, setNowMovies] = useState<MoviesProps[]>([]);
    const [popularMovies, setPopularMovies] = useState<MoviesProps[]>([]);
    const [topMovies, setTopMovies] = useState<MoviesProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [bannerMovie, setBannerMovie] = useState<MoviesProps>({
        id: 0,
        overview: '',
        title: '',
        poster_path: '',
        vote_average: 0,
        genres: [{ id: 0, name: '' }],
    });
    const [input, setInput] = useState('');

    const navigation = useNavigation();


    useEffect(() => {
        let isActive: boolean = true;
        const ac = new AbortController();

        async function getMovies() {

            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1
                    }
                }),
                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1
                    }
                })])

            if (isActive) {
                const nowList = getListMovies(10, nowData.data.results)
                const popularList = getListMovies(5, popularData.data.results)
                const topList = getListMovies(5, topData.data.results)

                setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)])
                setNowMovies(nowList)
                setPopularMovies(popularList)
                setTopMovies(topList)

                setLoading(false)
            }
        }

        getMovies()

        return () => {
            isActive = false
            ac.abort();
        }

    }, [])

    function navigateDetailPage(item: MoviesProps) {
        navigation.navigate('Detail', { id: item.id })
    }


    function handleSearchMovie() {
        if (input === '') return;

        navigation.navigate('Search', { name: input })
        setInput('')
    }


    if (loading) {
        return (
            <Container>
                <Loading>
                    <ActivityIndicator size="large" color="#ffffff" />
                </Loading>
            </Container>
        )
    }

    return (
        <Container>
            <Header title="React Prime" />
            <SearchContainer>
                <Input
                    placeholder="Ex Vingadores"
                    placeholderTextColor="#DDD"
                    value={input}
                    onChangeText={(text: string) => setInput(text)}
                />
                <SearchButton onPress={handleSearchMovie}>
                    <Feather name="search" size={38} color="#FFFFFF" />
                </SearchButton>
            </SearchContainer>

            <ScrollView>
                <Title>
                    Em Cartaz
                </Title>
                <BannerButton activeOpacity={0.9} onPress={() => navigateDetailPage(bannerMovie)}>
                    <Banner
                        resizeMethod="resize"
                        source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
                    />
                </BannerButton>

                <SliderMovie<React.ElementType>
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({ item }: { item: MoviesProps }) =>
                        <SliderItem data={item} navigatePage={() => navigateDetailPage(item)} />}
                    keyExtractor={(item: MoviesProps) => String(item.id)}
                />

                <Title>Populares</Title>
                <SliderMovie<React.ElementType>
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({ item }: { item: MoviesProps }) =>
                        <SliderItem data={item} navigatePage={() => navigateDetailPage(item)} />}
                    keyExtractor={(item: MoviesProps) => String(item.id)}
                />

                <Title>Mais votados</Title>
                <SliderMovie<React.ElementType>
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({ item }: { item: MoviesProps }) =>
                        <SliderItem data={item} navigatePage={() => navigateDetailPage(item)} />}
                    keyExtractor={(item: MoviesProps) => String(item.id)}
                />
            </ScrollView>
        </Container>
    )
}