import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
    background-color: white;
    border-radius: 5px;
    width: 100%;
    padding: 16px;
    gap: 8px;
    display: flex;
    width: 100%;
    justify-content: space-between;

    h1 {
        font-size: 20px;
        color: #666666;
    }

    p {
        font-size: 13px;
    }

    .ps {
        margin-top: 7px;
    }

    .checked {
        color: #8FC549;
    }
`


const Check = styled.div`
    width: 70px;
    height: 70px;
    background-color: #EBEBEB;
    border-radius: 5px;
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`


const daysOfTheWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];



export default function Habit({id, name, days}) {
    return (
    <Container>
        <div>
            <h1>{name}</h1>
            <div className="ps">
                <p>Sequência atual: <span className={"checked"}>5 dias</span></p>
                <p>Recorde: <span className={"checked"}>5 dias</span></p>
            </div>
        </div>
        <Check></Check>
    </Container>
    )
}