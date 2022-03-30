import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '../Header';

import Main from '../Main';
import Habit from './Habit';


const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`
const HabitsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const PlusButton = styled.button`
	width: 40px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #52B6FF;
	cursor: pointer;
	color: white;
	border-radius: 5px;
	border: none;
	font-size: 20px;
`


const habits = [
	{
		id: 1,
		name: "Nome do hábito",
		days: [1, 3, 5]
	},
	{
		id: 2,
		name: "Nome do hábito 2",
		days: [1, 3, 4, 6]
	},
    {
		id: 3,
		name: "Nome do hábito",
		days: [1, 3, 5]
	},
	{
		id: 4,
		name: "Nome do hábito 2",
		days: [1, 3, 4, 6]
	},
    {
		id: 5,
		name: "Nome do hábito",
		days: [1, 3, 5]
	},
	{
		id: 6,
		name: "Nome do hábito 2",
		days: [1, 3, 4, 6]
	},
    {
		id: 7,
		name: "Nome do hábito",
		days: [1, 3, 5]
	},
	{
		id: 8,
		name: "Nome do hábito 2",
		days: [1, 3, 4, 6]
	},
];

export default function Habits({}) {
    return (
        <Main>
            <Top>
                <h1>Meus hábitos</h1>
                <PlusButton>+</PlusButton>
            </Top>

            <HabitsList>
                {habits.map(habit => {
                    return (<Habit 
                        key={habit.id} 
                        id={habit.id}
                        name={habit.name}
                        days={habit.days} />)
                })}
            </HabitsList>

            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
        </Main>
    )
}