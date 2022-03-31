import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';

const Container = styled.div`
    background-color: white;
    border-radius: 5px;
    width: 100%;
    padding: 16px;
    gap: 8px;
    display: flex;
    flex-direction: column;
    width: 100%;
`

const TitleContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    h1 {
        font-size: 20px;
        color: #666666;
    }
`

const DaysContainer = styled.div`
    display: flex;
    gap: 4px;
`
const SelectDay = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #DBDBDB;
    font-size: 20px;
    cursor: pointer;

    &.selected {
        background-color: #CFCFCF;
        color: white;
    }
`

const DeleteButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
        background-color: #EEE;
    }
`




const daysOfTheWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export default function Habit({ id, name, days, deleteHabitHook }) {

    const { user, getDayHabits } = useContext(UserContext);

    function deleteButtonHandler() {
        if (window.confirm("Você tem certeza?")) {
            deleteHabitHook(id);
        }
    }

    // Small Components

    const titleContainer = (
        <TitleContainer>
            <h1>{name}</h1>
            <DeleteButton onClick={()=>{deleteButtonHandler()}}>
                <ion-icon name="trash-outline"></ion-icon>
            </DeleteButton>
        </TitleContainer>
    )

    const daysComponent = (
        <DaysContainer>
            {daysOfTheWeek.map((day, index) => {
                let classNameVal = ""
                if (days.indexOf(index) > -1) {
                    classNameVal = "selected";
                }
                return (
                    <SelectDay key={index} className={classNameVal} onClick={() => {}} >
                        {day}
                    </SelectDay>)
            })}
        </DaysContainer>
    )

    return (
        <Container>
            {titleContainer}
            {daysComponent}
        </Container>
    )
}