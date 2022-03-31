import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import axios from 'axios';

import LogIn from './Enter/LogIn';
import SignUp from './Enter/SignUp';
import Habits from './Main/Habits/Habits';
import Today from './Main/Today/Today';
import History from './Main/History/History';

import "../styles/reset.css"
import "../styles/styles.css"


export default function App() {

    const [user, setUser] = useState(null);
    const [dayHabits, setDayHabits] = useState([]);

    useEffect(()=>{
        if (!user) {
            const download = JSON.parse(localStorage.getItem('trackit_user'));
            if (download) {
                setUser(download);
            }
        }
    }, [])

    function getDayHabits() {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        const promise = axios.get(url, config);
        promise.then(a => {
            setDayHabits(a.data);
        });
        promise.catch(e => console.log(e));
    }

    return (
        <UserContext.Provider value={{
            user, setUser, dayHabits, setDayHabits, getDayHabits
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LogIn />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/historico" element={<History />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}