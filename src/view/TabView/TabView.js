import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PlanetsTab from '../../components/Tab/Tab';
import './TabView.css';

const TabView = props => {
    const [planets, setPlanets] = useState([]);
    useEffect(() => {
        fetch('https://assignment-machstatz.herokuapp.com/planet').then((result) => {
            result.json().then(data => {
                setPlanets(data);
                console.log(data);
            })
        }).catch(error => {
            console.log(error);
        });
    }, [])
    return (
        <div className="TabView">
            <Grid container
                >
                <span className="Header">
                    <h1>The Planets List</h1>
                </span>
                <Grid item xs={12}>
                    <PlanetsTab planets={planets} setPlanets={setPlanets} />
                </Grid>
            </Grid>
        </div>
    )
}

export default TabView;