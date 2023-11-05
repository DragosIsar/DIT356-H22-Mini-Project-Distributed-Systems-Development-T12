import React from 'react';
import { useEffect, useRef, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Grid, IconButton } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    maxWidth: 230,
    position: 'relative',
    zIndex: 1001,
  },
  media: {
    height: 100,
  },
  close: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1001,
    background: 'white',
    width: '25px',
    height: '25px'
  }
});

type ClinicCardProps = {
  name: string
  dentists: number
  address: string
  city: string
  handleClose: () => void
}

export default function ClinicCard(props: ClinicCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
       <IconButton className={classes.close} aria-label="close" onClick={props.handleClose}>
        <CloseIcon />
      </IconButton>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title={props.name}
        />
        <CardContent>
          <Typography variant="body2" component="h2">
            {props.address}
          </Typography>
          <Grid container spacing={1}>
            <Grid item container xs={6} spacing={0} alignItems='center'>
              <Typography variant="body2" component="h4">
                Dentists: {props.dentists}
              </Typography>
            </Grid>
            <Grid item container xs={6} spacing={1} alignItems='center'>
            </Grid>
            <Grid item container xs={3} spacing={1} alignItems='center'>
              <Grid item xs={8}><LocationOnIcon /></Grid>
              <Grid item xs={4}>{props.address},{props.city}</Grid>
            </Grid>
          </Grid>
          
          {/* <Typography variant="body2" color="textSecondary" component="p">
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}