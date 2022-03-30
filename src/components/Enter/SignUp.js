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
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-size: 20px;
    color: #666;

    &::placeholder {
        color: #DBDBDB;
    }
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
    a {
        font-size: 16px;
        color: #52B6FF;
    }
`

export default function SignUp({ }) {
  return (
    <Enter>
      <InputsWrapper>
        <Input placeholder="email"></Input>
        <Input placeholder="senha"></Input>
        <Input placeholder="nome"></Input>
        <Input placeholder="foto"></Input>
        <Link to={"/"}>
          <Button>Cadastrar</Button>
        </Link>
      </InputsWrapper>
      <Clickable><Link to={"/"}>Já tem uma conta? Faça login!</Link></Clickable>

    </Enter>
  );
}
