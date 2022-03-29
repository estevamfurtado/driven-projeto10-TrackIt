import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Calendar from 'react-calendar'
// https://www.npmjs.com/package/react-calendar

import Main from '../Main';

export default function History({}) {
    return (
        <Main>
            <h1>Histórico</h1>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            <Calendar />
        </Main>
    )
}