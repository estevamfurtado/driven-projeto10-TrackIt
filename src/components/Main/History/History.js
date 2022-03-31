import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Calendar from 'react-calendar'
import '../../../styles/calendar.css';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import dayjs from 'dayjs';
import Main from '../Main';


const SelectedDay = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    background-color: white;
    border-radius: 5px;
    padding: 10px;

    h1 {
        font-size: 16px;
    }

    p {
        font-size: 14px;
    }
`
const HabitsList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`

export default function History({ }) {

    const { user, getDayHabits } = useContext(UserContext);
    const [habitsHistory, setHabitsHistory] = useState([]);

    const [selectedDateData, setSelectedDateData] = useState({ day: null, habits: [] });

    useEffect(() => {
        if (user) {
            const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };

            const promise = axios.get(url, config);
            promise.then(a => {
                setHabitsHistory(a.data);
            });
            promise.catch(e => console.log(e));
        }
    }, [user])

    function setClass(date) {

        let classColor = null;

        let dateStr = dayjs(date).format("DD/MM/YYYY");
        let dateHabits = null;
        habitsHistory.forEach(h => {
            if (h.day === dateStr) {
                dateHabits = h.habits;
            }
        })

        if (dateHabits) {
            let completion = (dateHabits.filter(h => h.done).length) / dateHabits.length;

            if (completion === 1.0) {
                classColor = "completed"
            } else {
                classColor = "incompleted"
            }
        }

        return classColor;
    }

    function handleClickDay(date) {
        let dateStr = dayjs(date).format("DD/MM/YYYY");
        let dateHabits = [];
        habitsHistory.forEach(h => {
            if (h.day === dateStr) {
                dateHabits = h.habits;
            }
        })
        setSelectedDateData({ day: date, habits: [...dateHabits] });
    }

    const selectedDay = (
        <SelectedDay>
            <h1>{dayjs(selectedDateData.day).format("DD/MM/YYYY")}</h1>
            <HabitsList>
                {selectedDateData.habits.map(h => {
                    return (
                        <p>
                            {`${h.done ? '✅' : '❌'}   ${h.name}`}
                        </p>
                    )
                })}
            </HabitsList>
        </SelectedDay>
    )

    return (
        <Main>
            <h1>Histórico</h1>
            <Calendar tileClassName={({ date }) => setClass(date)} onClickDay={(dados) => { handleClickDay(dados) }} />
            {selectedDateData.habits.length > 0
                ? selectedDay
                : <></>
            }
        </Main>
    )
}