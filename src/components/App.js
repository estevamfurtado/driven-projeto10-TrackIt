import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import styled from 'styled-components';

import LogIn from './Enter/LogIn';
import SignUp from './Enter/SignUp';
import Habits from './Main/Habits/Habits';
import Today from './Main/Today/Today';
import History from './Main/History/History';

import "../styles/reset.css"
import "../styles/styles.css"

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LogIn />}/>
                <Route path="/cadastro" element={<SignUp />}/>                
                <Route path="/habitos" element={<Habits />}/>                
                <Route path="/hoje" element={<Today />}/>                
                <Route path="/historico" element={<History />}/>                
            </Routes>
        </>
    )
}

