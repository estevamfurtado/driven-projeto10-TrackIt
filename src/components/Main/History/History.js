import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Calendar from 'react-calendar'
import '../../../styles/calendar.css';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import dayjs from 'dayjs';


import Main from '../Main';

export default function History({ }) {

    const { user, getDayHabits } = useContext(UserContext);
    const [habitsHistory, setHabitsHistory] = useState([]);

    useEffect(() => {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        const promise = axios.get(url, config);
        promise.then(a => {
            setHabitsHistory(a.data);
        });
        promise.catch(e => console.log(e));
    }, [])

    function setClass(date) {
        
        let classColor = null;

        let dateStr = dayjs(date).format("DD/MM/YYYY");
        let dateHabits = null;

        let hasHabits = false;
        habitsHistory.forEach(h => {
            if(h.day === dateStr) {
                dateHabits = h.habits;
            }
        })

        if (dateHabits) {
            let completion = (dateHabits.filter(h => h.done).length)/dateHabits.length;

            console.log(dateStr, completion);

            if (completion === 1.0) {
                classColor = "completed"
            } else {
                classColor = "incompleted"
            }
        } 

        return classColor;
    }

    return (
        <Main>
            <h1>Histórico</h1>
            {/* <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p> */}
            <Calendar tileClassName={({ date }) => setClass(date)} />
        </Main>
    )
}