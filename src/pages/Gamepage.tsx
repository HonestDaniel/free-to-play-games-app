import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, CircularProgress} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Screenshot {
    id: number,
    image: string
}

export default function Gamepage() {
    const { id } = useParams()
    const [gameInfo, setGameInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`https://www.freetogame.com/api/game?id=${id}`, {
            method: 'GET',
        }).then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
            .then(json => {
            setGameInfo(json)
                console.log(json)
                setIsLoading(false)
        })
            .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
                setError(true);
                setIsLoading(false);
        })
    }, [id])

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            {
                error ? (
                    <h1 style={{fontWeight: 'normal', textAlign: 'center'}}>
                        There was an error loading the data. Please try again later.
                    </h1>
                ) : (
                    isLoading ?
                        <CircularProgress
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '0 auto',
                                height: '80vh'
                            }}
                        /> :
                        <div className='game-page'>
                            <Button variant="outlined" onClick={() => {navigate(`/`)}}>Назад к списку игр</Button>
                            <h1 style={{fontWeight: "normal", paddingLeft: '20px', fontSize: '1.7rem'}}>
                                {gameInfo.title}
                            </h1>
                            <div className='first-row'>
                                <div className='screens-slider'>
                                    <Slider {...sliderSettings} arrows={false}>
                                        {
                                            gameInfo.screenshots.map((screenshot: Screenshot, index: number) => (
                                                <div key={screenshot.id}>
                                                    <img src={screenshot.image} alt={`Screenshot ${index}`} style={{maxHeight: '450px', maxWidth: '100%'}}/>
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>
                                <div className='game-info'>
                                    <div style={{maxHeight: '206px'}}>
                                        <img src={gameInfo.thumbnail} alt="" style={{width: '100%'}}/>
                                    </div>
                                    <div className='short_description' style={{padding: '10px', fontSize: '1rem'}}>
                                        {gameInfo.short_description}
                                    </div>
                                    <div style={{marginBottom: '10px'}}>
                                        <div style={{padding: '1px 10px', fontSize: '1rem'}}>
                                            Publisher: {gameInfo.publisher}
                                        </div>
                                        <div style={{padding: '1px 10px', fontSize: '1rem'}}>
                                            Developer: {gameInfo.developer}
                                        </div>
                                        <div style={{padding: '1px 10px', fontSize: '1rem'}}>
                                            Genre: {gameInfo.genre}
                                        </div>
                                        <div style={{padding: '1px 10px', fontSize: '1rem'}}>
                                            Release date: {gameInfo.release_date.split('-').reverse().join('.')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='second-row'>
                                {
                                    gameInfo.minimum_system_requirements ? (
                                        <>
                                            <h2 style={{fontWeight: 'normal'}}>
                                                Minimum system requirements:
                                            </h2>
                                            <div>
                                                <ul>
                                                    <li>
                                                        OS: {gameInfo.minimum_system_requirements.os}
                                                    </li>
                                                    <li>
                                                        Processor: {gameInfo.minimum_system_requirements.processor}
                                                    </li>
                                                    <li>
                                                        Graphics: {gameInfo.minimum_system_requirements.graphics}
                                                    </li>
                                                    <li>
                                                        Memory: {gameInfo.minimum_system_requirements.memory}
                                                    </li>
                                                    <li>
                                                        Storage: {gameInfo.minimum_system_requirements.storage}
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    ) : <h2 style={{fontWeight: 'normal'}}>No information about system requirements</h2>
                                }
                            </div>
                        </div>
                )
            }
        </>
    );
};
