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

const EditTitleInput = styled.input`
    height: 45px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-size: 20px;
    color: #666;

    &::placeholder {
        color: #DBDBDB;
    }

    padding: 0 10px;
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

const SaveContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 20px;
`

const SaveButton = styled.button`
    border: none;
    border-radius: 5px;
    height: 35px;
    padding: 0 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #52B6FF;
    color: white;
    font-size: 16px;
    cursor: pointer;
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

const CancelButton = styled.button`
    border: none;
    border-radius: 5px;
    height: 35px;
    padding: 0 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #52B6FF;
    font-size: 16px;
    cursor: pointer;
`



const daysOfTheWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export default function Habit({id, name, days, saved}) {

    return (
    <Container>
        <TitleContainer>
            <h1>{name}</h1>
            <DeleteButton>
                <ion-icon name="trash-outline"></ion-icon>
            </DeleteButton>
        </TitleContainer>
        <EditTitleInput placeholder={"nome do hábito"}></EditTitleInput>
        <DaysContainer>
            {daysOfTheWeek.map((day, index) => {
                let classNameVal = ""
                if (days.indexOf(index) > 0) {
                    classNameVal = "selected";
                }

                return (<SelectDay key={index} className={classNameVal}>{day}</SelectDay>)
            })}
        </DaysContainer>
        <SaveContainer>
            <CancelButton>Cancelar</CancelButton>
            <SaveButton>Salvar</SaveButton>
        </SaveContainer>

    </Container>
    )
}