import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  useEffect(() => {
      setChecked(props.planets && props.planets.map(planet => planet.isFavourite));
  }, [props.planets]);

  const handleToggle = (value) => () => {
    const planets = [...props.planets];
    planets[value].isFavourite = !planets[value].isFavourite;
    props.setPlanets(planets);
    const newChecked = [...checked];
    newChecked[value] = checked[value];
    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {props.planets && props.planets.map((planet, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={planet.id} role={undefined} dense button onClick={handleToggle(index)}
          style={{marginLeft: "50px"}}>
            <ListItemIcon>
              <Checkbox
              icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                edge="start"
                checked={checked[index] || planet.isFavourite}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={planet.name} />
          </ListItem>
        );
      })}
    </List>
  );
}
