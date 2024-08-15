import React, { useEffect } from 'react';
import { WelcomeProps } from './Types';
import { Button, ButtonGroup, Card, Grid, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setGlobalError, setStateLoader } from '../../redux/features/mainSlice';
import { fetchUsersAsync } from './Apis';
import { apiHandler } from '../../Utils/ApiErrorHandler';

const Welcome: React.FC<WelcomeProps> = ({ header, text }) => {
  const accessToken = useAppSelector(state => state.main.accessToken)
  const dispatch = useAppDispatch()

  const getUsers = async () => {
    const response = await apiHandler(
      () => fetchUsersAsync(accessToken),
      (isLoading) => dispatch(setStateLoader({ isLoading })),
      (errorMessage) => dispatch(setGlobalError({ hasError: true, errorMessage })),
      (users) => {
        // do something with users
        console.log(users);
      } 
    );
  
    if (response) {
      console.log(response);
    }
  };

  useEffect(() => {
    if (accessToken.length > 0) {
      getUsers();
    }
  }, [accessToken]);

  return (
    <Card>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h2'>{header}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>{text}</Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup>
            <Button onClick={getUsers}>Fetch Users</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Welcome;
