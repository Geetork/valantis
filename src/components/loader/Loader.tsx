import React from 'react';
import styles, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styles.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70vh;
    width: 100%;
`;

const Spinner = styles.div`
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 1s linear infinite;
`;

/**
 * Loader Component
 * 
 * A component for displaying a loading spinner.
 * 
 * @component
 * @returns {React.ReactElement} - Returns a React element representing the loader.
 * 
 */
const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};

export default Loader;