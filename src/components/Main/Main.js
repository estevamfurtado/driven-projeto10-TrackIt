import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F2F2F2;
`
const MainDiv = styled.main`
    flex: 2 1 auto;
    width: 100%;
    max-width: 375px;
    padding: 20px 17px 50px 17px;
    overflow-y: scroll;
    line-height: 1.25;

    display: flex;
    flex-direction: column;
    gap: 20px;

    h1 {
        font-size: 23px;
        color: #126BA5;
    }

    h3 {
        font-size: 18px;
        color: #BABABA;
    }

    .color-green {
        color: #8FC549;
    }

    p {
        font-size: 18px;
        color: #666;
    }
`


export default function Main({ children }) {
    return (
        <Wrapper>
            <Header />
            <MainDiv>
                {children}
            </MainDiv>
            <Footer />
        </Wrapper>
    )
}