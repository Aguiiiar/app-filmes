import React, { useState } from "react";
import WebView from "react-native-webview";
import { Feather } from '@expo/vector-icons'
import { BackButton, Name } from "./styles";
import { api, key } from "../../services/api";

type ModalProps = {
    id: number;
    title: string;
    closeModal(): void
}

type MoviesProps = {
    homepage: string
}

export default function ModalLink({ id, title, closeModal }: ModalProps) {

    const [movie, setMovie] = useState<MoviesProps>({
        homepage: ''
    })

    async function getMovie() {
        try {
            const response = await api.get(`/movie/${id}`, {
                params: {
                    api_key: key,
                    language: 'en-US',
                }
            })
            setMovie(response.data)
        } catch (error) {
            console.log(error)
        }

    }
    getMovie()
    return (
        <>
            <BackButton onPress={closeModal}>
                <Feather name="x" size={35} color="#FFFFFF" />
                <Name numberOfLines={1}>{title}</Name>
            </BackButton>

            {<WebView
            source={{ uri: `${movie.homepage}` }}
            />}
        </>
    )
}