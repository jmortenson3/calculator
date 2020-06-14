import React, { useState } from 'react';
import styled from 'styled-components';

const CalculationForm = styled.form`
  margin: 25px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 2px;
  background-color: lightcoral;
  margin-top: 10px;
`;

const Label = styled.label`
  font-size: 18px;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  font-family: consolas;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Form = ({ websocket, errorMessage, setErrorMessage }) => {
  const [caluclation, setCalculation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(caluclation);
      setErrorMessage('');
    } else {
      console.log(`the websocket is not connected`);
      setErrorMessage('Lost connection...try refreshing your browser');
    }
  };

  const handleChange = (e) => {
    setCalculation(e.target.value);
  };

  return (
    <CalculationForm onSubmit={handleSubmit}>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Label htmlFor="calculation">Enter Calculation</Label>
      <Input
        name="calculation"
        placeholder="Ex. (2 + 4 / 3)"
        onChange={handleChange}
      />
      <Button type="submit">Calculate ⚡</Button>
    </CalculationForm>
  );
};

export default Form;
