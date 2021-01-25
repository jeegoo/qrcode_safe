import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import green from "@material-ui/core/colors/green";
import {blue} from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const images = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SingleLineGridList({images,setImages,...rest}) {
  const classes = useStyles();
  const handleImageDeleteIconClicked =(event,index)=>{
        setImages(oldImages=>oldImages.slice(0,index).concat(oldImages.slice(index+1,oldImages.length)));
  }

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {images.map((img) => (
          <GridListTile key={img.title}>
            <img src={img.src} alt={img.title} />
            <GridListTileBar
              title={img.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${img.title}`}
                onClick={(event)=>handleImageDeleteIconClicked(event,img.title)}
                >
                    <DeleteIcon style={{ color: blue[200] }} />

                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
