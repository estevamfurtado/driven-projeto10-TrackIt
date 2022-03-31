import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

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
    color: white;

    font-size: 40px;

    &.checked {
        color: white;
        background-color: #8FC549;
    }
`


const daysOfTheWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];


export default function Habit({ id, name, done, currentSequence, highestSequence, toggleCheckHook, waitingAnswer }) {

    function checkButtonHandler() {
        toggleCheckHook(id);
    }

    return (
        <Container>
            <div>
                <h1>{name}</h1>
                <div className="ps">
                    <p>Sequência atual: <span className={done ? "checked" : ""}>{currentSequence}</span></p>
                    <p>Recorde: <span className={
                        (currentSequence >= highestSequence && done)
                            ? "checked"
                            : ""}>{highestSequence}</span></p>
                </div>
            </div>
            <Check className={done ? "checked" : ""} onClick={() => { checkButtonHandler() }}>
                {(waitingAnswer)
                ? <ThreeDots color="#fff" height={50} width={50} />
                : <ion-icon name="checkmark-outline"></ion-icon>}
            </Check>
        </Container>
    )
}