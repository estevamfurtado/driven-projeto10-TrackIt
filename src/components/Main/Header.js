import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Banner = styled.header`
    height: 70px;
    width: 100%;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px 0px #00000026;
    display: flex;
    justify-content: center;
    flex: 0 0 auto;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 375px;
    padding: 0px 18px;
`
const Logo = styled.div`
    color: white;
`

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50px;
`

export default function Header({}) {
    return (
    <Banner>
        <Wrapper>
            <Logo>TrackIt</Logo>
            <Image src="https://media-exp1.licdn.com/dms/image/C4E03AQF6yExoKJcN6Q/profile-displayphoto-shrink_200_200/0/1598619452638?e=1652918400&v=beta&t=YSq5sqQJrgk3kvF1Jm9G2vII6-0KwmzYsvk6aC7Zt84" />
        </Wrapper>
    </Banner>
    )
}