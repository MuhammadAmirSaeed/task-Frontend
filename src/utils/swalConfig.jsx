import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { Alert } from "@mui/material";

const useSnackbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState("");
  const [title, setTitle] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };

  const showSnackbar = (variant, title) => {
    setVariant(variant);
    setTitle(title);
    setIsOpen(true);
  };

  const SnackbarComponent = (
    <Snackbar
      open={isOpen}
      onClose={handleClose}
      sx={{ borderRadius: "4px" }}
      TransitionComponent={Slide}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={variant}
        variant="outlined"
        sx={{ width: "100%", bgcolor: "background.paper" }}
      >
        {title}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
};

export default useSnackbar;
