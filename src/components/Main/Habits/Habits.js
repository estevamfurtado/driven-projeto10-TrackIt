import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '../Header';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';

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

export default function Habits({ }) {

	// Variáveis

	const [habits, setHabits] = useState([]);
	const [newHabit, setNewHabit] = useState({name: "", days: []});
	const [editingNewHabit, setEditingNewHabit] = useState(false);
	
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
			const config = {
				headers: { Authorization: `Bearer ${user.token}` }
			};
			
			const promise = axios.get(url, config);
			promise.then(a => {
				setHabits(a.data);
			});
			promise.catch(e => console.log(e));
		}	
	}, [user]);

	function showNewHabit() {
		if (editingNewHabit === false) {
			setNewHabit({name: "", days: []});
			setEditingNewHabit(true);
		}
	}

	function hideEditingHook(newHabit) {
		if (newHabit) {
			const newHabits = [...habits];
			newHabits.push(newHabit);
			setHabits(newHabits);
		}
		setEditingNewHabit(false);
	}

	function deleteHabitHook (id) {

		let index = null;

		habits.forEach((h, i) => {
			if (h.id === id ) {
				index = i;
			}
		})

		if (user && index > -1) {
			const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habits[index].id}`
			const config = {
				headers: { Authorization: `Bearer ${user.token}` }
			};
			const promise = axios.delete(url, config);
			promise.then(() => {
				const newHabits = [...habits];
				newHabits.splice(index, 1);
				setHabits(newHabits);
			});
			promise.catch(e => {
				// console.log(e);
			})
		}
	}

	return (
		<Main>
			<Top>
				<h1>Meus hábitos</h1>
				<PlusButton onClick={showNewHabit}>+</PlusButton>
			</Top>

			<HabitsList>
				{habits.map(habit => {
					return (<Habit
						key={habit.id}
						id={habit.id}
						name={habit.name}
						days={habit.days}
						editing={false}
						deleteHabitHook={deleteHabitHook} />)
				})}
				{editingNewHabit
				? <Habit
					key={"newHabit"}
					id={"newHabit"}
					name={newHabit.name}
					days={newHabit.days}
					editing={true} hideEditingHook={hideEditingHook}
					deleteHabitHook={deleteHabitHook}/> 
				: <></>}
			</HabitsList>

			{habits.length > 0
			? <></>
			: <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}
		</Main>
	)
}