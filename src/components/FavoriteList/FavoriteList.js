import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FavoriteList(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [hasFavorites, setHasFavorites] = useState(true);

  useEffect(() => {
      const newChecked = [];
      props.planets && props.planets.map(planet => {
          newChecked.push(planet.isFavourite);
        });
        setChecked(newChecked);
      checkHasFavorites();
  }, [props.planets]);

  const checkHasFavorites = () => {
    let flag = 0;
    for(let i of props.planets) {
        if(i.isFavourite === true) {
            flag = 1;
            break;
        }
    }
    flag === 0 ? setHasFavorites(false) : setHasFavorites(true); 
  }
  const handleToggle = (value) => () => {
    const planets = [...props.planets];
    planets[value].isFavourite = !planets[value].isFavourite;
    props.setPlanets(planets);
    const newChecked = [...checked];
    newChecked[value] = !checked[value];
    setChecked(newChecked);
    checkHasFavorites();
  };

  return (
      hasFavorites? 
    (<List className={classes.root}>
      {props.planets && props.planets.map((planet, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          planet.isFavourite && 
          <ListItem key={planet.id} role={undefined} dense button 
          style={{marginLeft: "50px"}}>
            <ListItemText id={labelId} primary={planet.name} />
            <ListItemIcon onClick={handleToggle(index)}>
                <Close/>
            </ListItemIcon>
          </ListItem>
        );
      })}
    </List>)
    :
    (<div>
        No Favorite planets
    </div>)
  );
}
