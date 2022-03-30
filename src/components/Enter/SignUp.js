import React, { useState, useContext, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import styled from "styled-components";

import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';


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

    padding: 0 10px;

    &:disabled,
    &[disabled]{
        background-color: #F2F2F2;
        color: #AFAFAF;
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

  display: flex;
    align-items: center;
    justify-content: center;

  &:disabled,
    &[disabled]{
        opacity: 70%;
    }
`;
const Clickable = styled.div`
    a {
        font-size: 16px;
        color: #52B6FF;
    }
`

export default function SignUp({ }) {

  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");


  let navigate = useNavigate();

  function validateAndSendToAPI() {
    if (validateInputs()) {
      sendToAPI();
    } else {
      alert("Algum input não é válido!");
    }
  }

  function validateInputs() {
    return (email !== "" && password !== "" && name !== "" && isValidHttpUrl(image));
  }

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }
  



  const sendToAPI = () => {
    let link = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`;
    let obj = {
      email: email,
      password: password,
      image: image,
      name: name,
    }

    setIsDisabled(true);
    const promise = axios.post(link, obj);
    promise.then(a => {
      console.log(a.data);
      navigate('/');
    }).catch(e => {
      alert('Não foi possível cadastrar o usuário.');
      setIsDisabled(false);
    });
  }

  function onChangeSetState(event, setStateFunction) {
    setStateFunction(event.target.value);
  }


  return (
    <Enter>
      <InputsWrapper>
        <Input placeholder="email" disabled={isDisabled} value={email} onChange={e => { onChangeSetState(e, setEmail) }}></Input>
        <Input placeholder="senha" disabled={isDisabled} value={password} onChange={e => { onChangeSetState(e, setPassword) }}></Input>
        <Input placeholder="nome" disabled={isDisabled} value={name} onChange={e => { onChangeSetState(e, setName) }}></Input>
        <Input placeholder="foto" disabled={isDisabled} value={image} onChange={e => { onChangeSetState(e, setImage) }}></Input>
        <Button onClick={validateAndSendToAPI} disabled={isDisabled}>
          {isDisabled
            ? <ThreeDots color="#fff" height={50} width={50} />
            : "Cadastrar"}
        </Button>
      </InputsWrapper>
      <Clickable><Link to={"/"}>Já tem uma conta? Faça login!</Link></Clickable>

    </Enter>
  );
}
