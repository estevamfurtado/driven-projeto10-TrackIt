import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';

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

const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const LogOutButton = styled.button`
    background: rgba(0,0,0,0.5);
    padding: 10px;
    border-radius: 5px;
    color: white;
    border: none;
`

export default function Header({}) {

    const [tappedLogo, setTappedLogo] = useState(false);
    const { user, setUser, clearLocalStorage } = useContext(UserContext);
    let imageUrl = "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj";

    const navigate = useNavigate();

    if (user) {
        imageUrl = user.image;
	}

    function clickLogoHandler() {
        setTappedLogo(!tappedLogo);
    }

    function logOutHandler() {
        if (window.confirm("Você quer sair?")) {
            clearLocalStorage()
            setUser(null);
            navigate("/");
        } else {
            setTappedLogo(false);
        }
    }

    return (
    <Banner>
        <Wrapper>
            <LeftContainer>
                {tappedLogo ? <LogOutButton onClick={()=>{logOutHandler()}}>Sair</LogOutButton> : <></>}
                <Logo onClick={()=>{clickLogoHandler()}}>TrackIt</Logo>
            </LeftContainer>
            <Image src={imageUrl} />
        </Wrapper>
    </Banner>
    )
}