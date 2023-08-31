import React from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface Params {
    id: number,
    title: string,
    release_date: string,
    publisher: string,
    genre: string,
    thumbnail: string,
}


const Game = React.memo(({ id, title, release_date, publisher, genre, thumbnail }: Params) => {
    const navigate = useNavigate();

    return (
        <Card sx={{maxWidth: 250}}
              onClick={() => {navigate(`/game/${id}`)}}>
            <CardActionArea
                style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={thumbnail}
                    alt="game image"
                />
                <CardContent style={{flex: 1}}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div style={{margin: '5px 0'}}>
                            <span style={{marginRight: '10px'}}>Publisher:</span><span>{publisher}</span>
                        </div>
                        <div style={{margin: '5px 0'}}>
                            <span style={{marginRight: '10px'}}>Release date:</span>
                            <span>{release_date.split('-').reverse().join('.')}</span>
                        </div>
                    </Typography>
                </CardContent>
                <CardActions style={{alignSelf: 'flex-start'}}>
                    <Chip style={{marginLeft: 0}} label={genre} variant="outlined"/>
                </CardActions>
            </CardActionArea>
        </Card>
        )
});

export default Game;
