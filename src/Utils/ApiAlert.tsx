import { Alert, AlertTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { setGlobalError, setGlobalSuccess } from "../redux/features/mainSlice"; 

const ApiAlert = () => {
  const globalError = useAppSelector(state => state.main.globalError);
  const globalSuccess = useAppSelector(state => state.main.globalSuccess);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (globalError.hasError) {
      dispatch(setGlobalError({ hasError: false, errorMessage: "" }));
    } else if (globalSuccess.hasSuccess) {
      dispatch(setGlobalSuccess({ hasSuccess: false, successMessage: "" }));
    }
  };

  const severity = globalError.hasError ? "error" : "success";
  const message = globalError.hasError ? globalError.errorMessage : globalSuccess.successMessage;

  if (!globalError.hasError && !globalSuccess.hasSuccess) {
    return null; 
  }

  return (
    <Alert
      sx={{
        zIndex: 10000,
        position: "fixed",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "auto",
        transition: "ease-in",
        textAlign: "center"
      }}
      severity={severity}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={handleClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle>{severity === "error" ? "Error" : "Success"}</AlertTitle>
      {message}
    </Alert>
  );
};

export default ApiAlert;