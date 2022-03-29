import React, { useState, useContext, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import styled from "styled-components";

import Enter from "./Enter";

const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  a {
    width: 100%;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
`;
const Button = styled.button`
  width: 100%;
  height: 45px;
  background-color: #52b6ff;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;
const Clickable = styled.div`
  font-size: 16px;
  color: #52b6ff;
`;

export default function SignUp({}) {
  return (
    <Enter>
      <InputsWrapper>
        <Input></Input>
        <Input></Input>
        <Input></Input>
        <Input></Input>
        <Link to={"/"}>
          <Button>Cadastrar</Button>
        </Link>
      </InputsWrapper>
      <Link to={"/"}>
        <Clickable>Já tem uma conta? Faça login!</Clickable>
      </Link>
    </Enter>
  );
}
