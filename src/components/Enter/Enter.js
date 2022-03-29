import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import styled from 'styled-components';

const EnterScreen = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Logo = styled.h1`
    font-size: 30px;
    font-weight: 700;
    margin-top: 70px;
    margin-bottom: 30px;
`

const InputsComponent = styled.div`
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;

    * {
        font-weight: 400;
        font-size: 20px;
    }
`

export default function Enter({ children }) {
    return (
        <EnterScreen>
            <Logo>TrackIt</Logo>
            <InputsComponent>
                {children}
            </InputsComponent>
        </EnterScreen>
    )
}