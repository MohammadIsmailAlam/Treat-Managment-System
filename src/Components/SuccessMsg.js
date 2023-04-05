import Modal from "@mui/joy/Modal";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router";

export default function BasicModal({ showSucccess, setShowSuccess }) {
  const navigate = useNavigate();
  const handleClose = () => {
    setShowSuccess(false);
    navigate("/dashboard");
  };

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={showSucccess}
        // onClose={() => setShowSuccess(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CheckCircleIcon />
          </IconButton>
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Successfull
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Your action was completed successfully.
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
}
