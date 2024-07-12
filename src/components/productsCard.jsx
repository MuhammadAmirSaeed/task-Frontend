// ProductCard.js
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardActionArea>
        {product.pictures.length > 0 && (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <CardMedia
                component="img"
                height="200"
                image={product.pictures[0]}
                alt={product.name}
              />
            </Grid>
            {product.pictures.length > 1 && (
              <Grid item container spacing={1} justifyContent="center" alignItems="center">
                {product.pictures.slice(1).map((picture, index) => (
                  <Grid item key={index}>
                    <CardMedia
                      component="img"
                      height="80"
                      width="80"
                      image={picture}
                      alt={`${product.name} - Image ${index + 2}`}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        )}
        {product.pictures.length === 0 && (
          <CardMedia
            component="img"
            height="200"
            image="https://via.placeholder.com/200"
            alt={product.name}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity: {product.quantity}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
