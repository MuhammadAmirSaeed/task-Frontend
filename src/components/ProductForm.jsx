import React, { useState } from 'react';
import { Button, TextField, Grid ,Box, Typography} from '@mui/material';
import axiosInstance from '../utils/axiosConfig';
import useSnackbar from "../utils/swalConfig";

const ProductForm = () => {
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [loading,setLoading] = useState(false)

  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    pictures: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [imageInputs, setImageInputs] = useState([true]); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure quantity and price are not less than 1
    if (name === 'quantity' || name === 'price') {
      const parsedValue = parseInt(value, 10);
      if (parsedValue < 1) {
        setProduct(prevProduct => ({
          ...prevProduct,
          [name]: '1', // Set to 1 if value is less than 1
        }));
      } else {
        setProduct(prevProduct => ({
          ...prevProduct,
          [name]: value,
        }));
      }
    } else {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    setProduct(prevProduct => ({
      ...prevProduct,
      pictures: [...prevProduct.pictures, file],
    }));

    const imagePreview = URL.createObjectURL(file);
    setPreviewImages(prevPreviewImages => [...prevPreviewImages, imagePreview]);
  };

  const handleAddImageInput = () => {
    if (imageInputs.length < 6) {
      setImageInputs(prevImageInputs => [...prevImageInputs, true]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    product.pictures.forEach(picture => {
      formData.append('pictures', picture);
    });
 setLoading(true)
    try {
      const response = await axiosInstance.post('api/v1/product/create-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      
      });
      setProduct({
        name: '',
        price: '',
        quantity: '',
        pictures: [],
      });
      
      showSnackbar("success", "Product created successfully");
    } catch (error) {
      console.error('Error uploading product:', error);
      showSnackbar("error", "Failed to create product");
    }
    setLoading(false)
    setPreviewImages([])
  };

  return (
    <form onSubmit={handleSubmit} style={{margin:"20px"}}>
    <Typography sx={{
      fontWeight:600,
      fontSize:"30px",
      marginBottom:'20px'
    }}>
      Upload a New Product
    </Typography>
      <Box  spacing={2}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { xs: 'center', md: 'space-between' },
        gap: '5px',
        width: { xs: '100%', md: 'auto' },}}>
    <Box> <Grid item spacing={2} container xs={12} >
        <Grid item xs={12} >
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            fullWidth
            minLength={3}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid></Grid> </Box> 
        <Grid item xs={12} md={8}>
          {imageInputs.map((input, index) => (
            <div key={index}>
              <input
                type="file"
                name={`pictures-${index}`}
                onChange={(e) => handleFileChange(e, index)}
                accept="image/*"
                required
                style={{ display: 'none' }}
                id={`raised-button-file-${index}`}
              />
              <label htmlFor={`raised-button-file-${index}`}>
                <Button variant="contained" component="span">
                  Upload Picture {index + 1}
                </Button>
              </label>
              {previewImages[index] && (
                <img
                  src={previewImages[index]}
                  alt={`Preview ${index}`}
                  width={100}
                  style={{ margin: '5px', borderRadius: 5 , maxWidth:"400px" ,
                    width: "100%"}}
                />
              )}
            </div>
          ))}
          {product.pictures.length > 0 && imageInputs.length < 6 && (
            <Button onClick={handleAddImageInput} variant="contained" color="primary">
              Add More Pictures
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
        {!loading ?( <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>) :( <Button type="submit" variant="contained" color="primary">
            Submitting....
          </Button>)} 
        </Grid>
      </Box>
      {SnackbarComponent}
    </form>
  );
};

export default ProductForm;
