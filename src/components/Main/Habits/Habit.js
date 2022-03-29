import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
    background-color: white;
    border-radius: 5px;
    width: 100%;
    padding: 16px;
`

export default function Habit({id, name, days}) {
    return (
    <Container>
        <h3>{id}</h3>
    </Container>
    )
}