import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import dayjs from 'dayjs';


import Main from '../Main';
import Habit from './Habit';

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;

	h3.check {
		color: #8FC549;
	}
`
const HabitsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export default function Today({ }) {

	require('dayjs/locale/pt-br');

	const { user, dayHabits, getDayHabits } = useContext(UserContext);
	const [waitingAnswer, setWaitingAnswer] = useState(false);

	useEffect(() => {
		if (user) {
			getDayHabits();
		}
	}, [user]);

	const completion = Math.ceil((dayHabits.filter(h => h.done).length/dayHabits.length) * 100);

	function toggleCheckHook(id) {

		setWaitingAnswer(true);

		let habit = null;
		dayHabits.forEach(h => {
			if (h.id === id) {
				habit = h;
			}
		})

		if (habit) {
			const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/${habit.done ? "uncheck" : "check"}`;
			const config = {
				headers: { Authorization: `Bearer ${user.token}` }
			};
			const promise = axios.post(url, {}, config);
			promise.then(a => {
				getDayHabits();
				setWaitingAnswer(false);
			});
			promise.catch(e => {
				console.log(e)
				setWaitingAnswer(false);
			});
		}
	}

	return (
		<Main>
			<Top>
				<h1>{dayjs().locale('pt-br').format('dddd, DD/MM')}</h1>
				<h3 className={completion > 0 ? "check" : ""}>{
					completion > 0
					? `${completion}% dos hábitos concluídos`
					: "Nenhum hábito concluído ainda"
				}</h3>
			</Top>
			<HabitsList>
				{dayHabits.map(habit => {
					return (<Habit
						key={habit.id}
						id={habit.id}
						name={habit.name}
						done={habit.done}
						currentSequence={habit.currentSequence}
						highestSequence={habit.highestSequence}
						toggleCheckHook={toggleCheckHook}
						waitingAnswer={waitingAnswer}
					/>)
				})}
			</HabitsList>
		</Main>
	)
}
