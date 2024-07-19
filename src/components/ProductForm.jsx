import React, { useState ,useEffect} from "react";
import { Button, TextField, Grid, Box, Typography } from "@mui/material";
import axiosInstance from "../utils/axiosConfig";
import useSnackbar from "../utils/swalConfig";

const ProductForm = () => {
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [count,setCount] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    pictures: [],
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  useEffect(() => {
    if (selectedFiles.length > 6) {
      setCount(true); 
    } else {
      setCount(false); 
    }
  }, [selectedFiles]); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" || name === "price") {
      const parsedValue = parseInt(value, 10);
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: parsedValue < 1 ? "1" : value,
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const ImageHandle = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((pre)=>pre.concat(files)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    selectedFiles.forEach((file) => {
      formData.append("pictures", file); // Append file objects directly
    });

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "api/v1/product/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response>>>>", response);
      setProduct({
        name: "",
        price: "",
        quantity: "",
        pictures: [],
      });
      showSnackbar("success", "Product created successfully");
    } catch (error) {
      console.error("Error uploading product:", error.message);
      showSnackbar("error", error.message);
    }
    setLoading(false);
    setSelectedFiles([]);
  };

  return (
    <Box >
    
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <Typography
        sx={{ fontWeight: 600, fontSize: "30px", marginBottom: "20px" }}
      >
        Upload a New Product
      </Typography>
      <Box
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-between" },
          gap: "5px",
          width: { xs: "100%", md: "auto" },
        }}
      >
        <Grid item spacing={2} container md={7} xs={12}>
          <Grid item xs={12}>
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
          <Grid item xs={12} md={2}>
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
          <Grid item xs={12} md={2}>
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
          </Grid>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                mt: "100px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap:"30px"
              }}
            >
              {selectedFiles.map((file, index) => {
                return (
                  <div key={file} >
                    <img
                     
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      // width={100}
                      height= "200"
                      style={{
                        margin: "5px",
                        borderRadius: 5,
                        maxWidth: "220px",
                        width: "100%",
                        
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{fontSize:"20px",  fontWeight:500}}>{index + 1}</div>
                      <button
                        style={{
                          padding: "10px",
                          color: "white",
                          borderRadius: "10px",
                          backgroundColor: "red",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setSelectedFiles(
                            selectedFiles.filter((image) => image !== file)
                          )
                        }
                      >
                        delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </Box>
          </Grid>
        </Grid>
        <Typography>
      {selectedFiles.length >0 &&(
        
        selectedFiles.length > 6 &&( <><Typography sx={{ color:"red" , fontSize:'20px', fontWeight:500}}>
          Selected files count is more than 6. Please select only 6 files at a time.
        </Typography> 
        </>)
      )}
    </Typography>
        <Grid item xs={12}>
         {!count &&<Box>
            <label
              htmlFor="images"
              style={{
                border: "3px dotted black",
                padding: "30px 40px 30px 40px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                flexDirection: "column",
              }}
            >
              + Upload Images
              <br />
              <span style={{ fontSize: "12px" }}>upto 6 images</span>
              <input
                type="file"
                multiple
                id="images"
                name="images"
                onChange={ImageHandle}
                accept="image/jpeg, image/png, image/webp"
                style={{ display: "none" }}
              />
            </label>
          </Box>}
        </Grid>
        {!count &&    <Grid item xs={12}>
          {!loading ? (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Submitting....
            </Button>
          )}
        </Grid>}
      
      </Box>
      {SnackbarComponent}
    </form>
    </Box>
  );
};

export default ProductForm;
