import React from 'react';
import { Button, ButtonGroup, Card, FormControl, Grid, Input, InputLabel, Stack, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setGlobalError, setGlobalSuccess, setStateLoader } from '../../redux/features/mainSlice';
import { apiHandler } from '../../Utils/ApiErrorHandler';
import { GlobalError } from '../../redux/stateTypes';
import { isValidEmail } from './Functions';
import { setEmail, setName } from '../../redux/features/simpleFormSlice';
import { createUserAsync } from './Apis';

const SimpleForm: React.FC = () => {
  const accessToken = useAppSelector(state => state.main.accessToken)
  const localState = useAppSelector(state => state.simpleForm)
  const dispatch = useAppDispatch()

  const verifyFields = (): GlobalError => {
    let result: GlobalError = {
      hasError: false,
      errorMessage: ''
    }

    if (localState.name.length === 0) {
      result = {
        hasError: true,
        errorMessage: "Client name cannot be empty!"
      }
      return result
    }

    if (localState.email.length === 0) {
      result = {
        hasError: true,
        errorMessage: "Email cannot be empty!"
      }
      return result
    }

    if (!isValidEmail(localState.email)) {
      result = {
        hasError: true,
        errorMessage: "Email is not valid!"
      }
      return result
    }

    return result
  }

  const handleChangeName = (name: string): void => {
    dispatch(setName(name))
  }

  const handleChangeEmail = (name: string): void => {
    dispatch(setEmail(name))
  }

  const createUser = async () => {
    const validationResult = verifyFields()

    if (!validationResult.hasError) {
      const response = await apiHandler(
        () => createUserAsync(localState, accessToken),
        (isLoading) => dispatch(setStateLoader({ isLoading })),
        (errorMessage) => dispatch(setGlobalError({ hasError: true, errorMessage })),
        (apiResponse) => dispatch(setGlobalSuccess({ hasSuccess: true, successMessage: apiResponse.message }))
      );

      if (response) {
        console.log(response);
      }
    } else (
      dispatch(setGlobalError(validationResult))
    )
  };

  return (
    <Card>
      <Grid container>
        <Grid item xs={12}>
          <Typography textAlign={"center"}>
            Simple Form
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"column"} spacing={2} justifyContent={"space-around"}>
            <Stack direction={"row"} spacing={2} width={"100%"}>
              <FormControl
                variant="standard"
                fullWidth
              >
                <InputLabel
                  htmlFor="Name-simple"
                >
                  Name
                </InputLabel>
                <Input
                  id="Name-simple"
                  error={localState.email.length === 0 || !isValidEmail(localState.email)}
                  value={localState.name}
                  onChange={e => handleChangeName(e.target.value)}
                />
              </FormControl>
              <FormControl
                variant="standard"
                fullWidth
              >
                <InputLabel
                  htmlFor="City-simple"
                >
                  Email
                </InputLabel>
                <Input
                  id="City-simple"
                  error={localState.email.length == 0}
                  value={localState.email}
                  onChange={e => handleChangeEmail(e.target.value)}
                />
              </FormControl>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup>
            <Button onClick={createUser}>Create User</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SimpleForm;
