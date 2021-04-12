import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Grid, Card, CardActionArea, Typography, CardMedia, CardContent, IconButton, CardHeader } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import DeleteIcon from '@material-ui/icons/Delete';

import operations from "../../state/ducks/user/operations";

const useStyles = makeStyles((theme) => ({
    link: {
      textDecoration: 'none',
      color: '#3f51b5',
      ':visited': {
        textDecoration: 'none',
        color: '#3f51b5'
      },
      ':link': {
        textDecoration: 'none',
        color: '#3f51b5'
      }
    },
    root: {
      width: '100%',
      height: '100%'
    },
    media: {
      height: '200px',
    },
    cont: {
      paddingLeft: '20px',
      paddingRight: '20px'
    },
    delete: {
      padding: '8px',
    },
    header: {
      padding: '8px 8px 0 8px'
    }
  }));

function Favorites({favorites, userData, getFavorites, delFavorite}) {
  const history = useHistory();

    useEffect(async () => {
        if(userData !== ''){
          console.log(userData._id);
          await getFavorites(userData._id);
        }else{
          history.push(``);
        }
    }, []);

    const classes = useStyles();

  return (
    <Grid item container spacing={2} item xs={12} sm={10} className={classes.cont}>
      {favorites.map(item => {
          if(item.thumbnail && item.title){
          return (
            <Grid key={item.id} item  xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardHeader className={classes.header} 
                    action={
                      <IconButton className={classes.delete} onClick={async (e) => {
                        await delFavorite(userData._id, item.id);
                      }}>
                        <DeleteIcon fontSize="small"/>
                      </IconButton>
                    }
                  />
                <Link to={`/video?id=${item.id}`} className={classes.link}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={item.thumbnail}
                      title={item.title}
                    />
                    <CardContent>
                      <Typography variant="body2" component="p" style={{color: 'black'}}>
                        {item.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  </Link>
                </Card>
            </Grid>
          );
          }
      })}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    userData :state.userData
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      getFavorites: (data) => {
        dispatch(operations.getFavorites(data));
      },
      delFavorite: (user, video) => {
        dispatch(operations.delFavorite(user, video));
      },
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
