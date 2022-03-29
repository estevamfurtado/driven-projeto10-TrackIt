import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';

import Main from '../Main';
import Habit from './Habit';

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
`
const HabitsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
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

export default function Today({}) {
    return (
        <Main>
            <Top>
                <h1>Segunda, 17/05</h1>
                <h3 className={""}>Nenhum hábito concluído ainda</h3>
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
        </Main>
    )
}