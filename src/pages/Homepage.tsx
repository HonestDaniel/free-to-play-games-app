import React from 'react';
import {useState, useEffect} from "react";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Games from "../components/Games";
import { useSelector, useDispatch } from "react-redux";
import { setSortBy, setCategorizeBy, setPlatform } from "../redux/slices/filterSlice";
import {categories} from "../shared/categories";

export default function Homepage() {
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false);
    const dispatch =  useDispatch()

    const handleChangeSort = (event: SelectChangeEvent) => {
        dispatch(setSortBy(event.target.value))
    };

    const handleChangeCategory = (event: SelectChangeEvent) => {
        dispatch(setCategorizeBy(event.target.value))
    };

    const handleChangePlatform = (event: SelectChangeEvent) => {
        dispatch(setPlatform(event.target.value))
    };

    const { sortBy, categorizeBy, platform } = useSelector((state: any) => state.filter)

    useEffect(() => {
        fetch(`https://www.freetogame.com/api/games?sort-by=${sortBy}&category=${categorizeBy}&platform=${platform}`, {
            method: 'GET',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(json => {
                setGames(json)
                setIsLoading(false)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setError(true);
                setIsLoading(false);
            })
    }, [sortBy, categorizeBy, platform])

    return (
        <div className='wrapper'>
            {
                error ? (
                    <h1 style={{fontWeight: 'normal', textAlign: 'center'}}>
                        There was an error loading the data. Please try again later.
                    </h1>
                ) : (
                    <>
                    <div className='filters'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">Sort by</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={sortBy}
                                onChange={handleChangeSort}
                                label="Sort by"
                            >
                                <MenuItem value='relevance'>Relevance</MenuItem>
                                <MenuItem value='release-date'>Release date</MenuItem>
                                <MenuItem value='popularity'>Popularity</MenuItem>
                                <MenuItem value='alphabetical'>Alphabetical</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">Categorize by</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={categorizeBy}
                                onChange={handleChangeCategory}
                                label="Categorize by"
                            >
                                {categories.map(category => (
                                    <MenuItem key={category.value} value={category.value}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">Platform</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={platform}
                                onChange={handleChangePlatform}
                                label="Platform"
                            >
                                <MenuItem value='all'>All</MenuItem>
                                <MenuItem value='pc'>PC</MenuItem>
                                <MenuItem value='browser'>Browser</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
            {
                isLoading ?
                <CircularProgress
                style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
                height: '50vh'
            }}
                /> : <Games games={ games }/>
            }
                    </>
                )
            }
        </div>
    );
};