import React, { lazy, Suspense, useMemo } from 'react';
import './App.css';
import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from './redux/store';
import ApiAlert from './Utils/ApiAlert';

const LazyWelcome = lazy(() => import('./Components/Welcome/Renderer'));
const LazySimpleForm = lazy(() => import('./Components/SimpleForm/Renderer'))

const App: React.FC = () => {
  const hasGlobalError = useAppSelector(state => state.main.globalError.hasError);
  const hasGlobalSuccess = useAppSelector(state => state.main.globalSuccess.hasSuccess);

  const isGlobalLoading = useAppSelector(state => state.main.stateLoader.isLoading);

  const fallback = useMemo(() => <CircularProgress />, []);

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Suspense fallback={fallback}>
        <LazyWelcome header={'Welcome'} text={'This text comes from the parent component'} />
      </Suspense>
      <Suspense fallback={fallback}>
        <LazySimpleForm />
      </Suspense>

      {(hasGlobalError || hasGlobalSuccess) && <ApiAlert />}

      {isGlobalLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 9999,
          pointerEvents: 'none' 
        }}>
          <CircularProgress />
        </div>
      )}
    </Box>
  );
};

export default App;
