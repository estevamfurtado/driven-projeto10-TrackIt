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

    &:disabled,
    &[disabled]{
        background-color: #F2F2F2;
        color: #AFAFAF;
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

    &:disabled,
    &[disabled]{
        opacity: 70%;
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
    
    &:disabled,
    &[disabled]{
        opacity: 70%;
    }
`



const daysOfTheWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export default function Habit({ id, name, days, editing, hideEditingHook, deleteHabitHook }) {

    const [editingName, setEditingName] = useState(name);
    const [editingDays, setEditingDays] = useState([...days]);
    const [isSendingData, setIsSendingData] = useState(false);
    
    const { user } = useContext(UserContext);



    function toggleDay(canEdit, day) {
        if (canEdit) {
            const newDays = [...editingDays];
            if (newDays.indexOf(day) > -1) {
                newDays.splice(newDays.indexOf(day), 1);
            } else {
                newDays.push(day);
            }
            setEditingDays(newDays);
        }
    }

    function saveNewHabitAPI() {
        if (user && editing) {

            setIsSendingData(true);

            let url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
            const config = {
				headers: { Authorization: `Bearer ${user.token}` }
			};
            const obj = {
                name: editingName,
                days: editingDays,
            }
			
			const promise = axios.post(url, obj, config);
			promise.then(a => {
                clearEditing();
                hideEditingHook(a.data);

                setIsSendingData(false);
			});
			promise.catch(() => {
                setIsSendingData(false);
                alert("Não foi possível salvar o novo hábito!");
            })
        }
    }

    function cancelNewHabit() {
        hideEditingHook(null);
    }

    function clearEditing() {
        setEditingName("");
        setEditingDays([]);
    }

    function deleteButtonHandler() {
        if (window.confirm("Você tem certeza?")) {
            deleteHabitHook(id);
        }
    }


    // Small Components

    const titleContainer = (
        <TitleContainer>
            <h1>{editingName}</h1>
            <DeleteButton onClick={()=>{deleteButtonHandler()}}>
                <ion-icon name="trash-outline"></ion-icon>
            </DeleteButton>
        </TitleContainer>
    )

    const nameInput = (
        <EditTitleInput
            disabled={isSendingData}
            placeholder={"nome do hábito"}
            value={editingName}
            onChange={e => { setEditingName(e.target.value) }}
        >
        </EditTitleInput>
    )

    const daysComponent = (
        <DaysContainer>
            {daysOfTheWeek.map((day, index) => {
                let classNameVal = ""
                if (editingDays.indexOf(index) > -1) {
                    classNameVal = "selected";
                }
                return (
                    <SelectDay
                        key={index} className={classNameVal}
                        onClick={() => {
                            toggleDay((editing && !isSendingData), index);
                        }}
                    >
                        {day}
                    </SelectDay>)
            })}
        </DaysContainer>
    )

    const saveContainer = (
        <SaveContainer>
            <CancelButton disabled={isSendingData} onClick={() => {cancelNewHabit()}}>Cancelar</CancelButton>
            <SaveButton disabled={isSendingData} onClick={() => {saveNewHabitAPI()}}>
                {isSendingData
                ? <ThreeDots color="#fff" height={50} width={50} />
                : "Salvar"}
            </SaveButton>
        </SaveContainer>
    )

    return (
        <Container>
            {editing
                ? (<>
                    {nameInput}
                    {daysComponent}
                    {saveContainer}
                </>)
                : (<>
                    {titleContainer}
                    {daysComponent}
                </>)
            }
        </Container>
    )
}