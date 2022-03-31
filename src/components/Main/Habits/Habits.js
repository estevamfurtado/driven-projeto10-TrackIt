import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Header from '../Header';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';


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


const Container = styled.div`
    background-color: white;
    border-radius: 5px;
    width: 100%;
    padding: 16px;
    gap: 8px;
    display: flex;
    flex-direction: column;
    width: 100%;
`

const DaysContainer = styled.div`
    display: flex;
    gap: 4px;
`
const SelectDay = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #DBDBDB;
    font-size: 20px;
    cursor: pointer;

    &.selected {
        background-color: #CFCFCF;
        color: white;
    }
`


const EditTitleInput = styled.input`
    height: 45px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-size: 20px;
    color: #666;

    &::placeholder {
        color: #DBDBDB;
    }

    padding: 0 10px;

    &:disabled,
    &[disabled]{
        background-color: #F2F2F2;
        color: #AFAFAF;
    }
`

const SaveContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 20px;
`

const SaveButton = styled.button`
    border: none;
    border-radius: 5px;
    height: 35px;
    padding: 0 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #52B6FF;
    color: white;
    font-size: 16px;
    cursor: pointer;

    &:disabled,
    &[disabled]{
        opacity: 70%;
    }
`


const CancelButton = styled.button`
    border: none;
    border-radius: 5px;
    height: 35px;
    padding: 0 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #52B6FF;
    font-size: 16px;
    cursor: pointer;
    
    &:disabled,
    &[disabled]{
        opacity: 70%;
    }
`


const daysOfTheWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];


export default function Habits({ }) {

	// Variáveis

	const [habits, setHabits] = useState([]);

	const [editingNewHabit, setEditingNewHabit] = useState(false);
	const [isSendingData, setIsSendingData] = useState(false);
	const [newHabitName, setNewHabitName] = useState("");
	const [newHabitDays, setNewHabitDays] = useState([]);

	const { user, getDayHabits } = useContext(UserContext);

	useEffect(() => {
		getHabits();
	}, [user]);

	function getHabits() {
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
	}

	function showNewHabit() {
		if (editingNewHabit === false) {
			setEditingNewHabit(true);
		}
	}

	function toggleDay(index) {
		const newDay = [...newHabitDays];
		if (newDay.indexOf(index) > -1) {
			newDay.splice(newDay.indexOf(index), 1);
		} else {
			newDay.push(index);
		}
		setNewHabitDays(newDay);
	}

	function clearNewHabit() {
		setNewHabitDays([]);
		setNewHabitName("");
	}

	function validateNewHabit() {
		return (newHabitName !== "") && (newHabitDays.length > 0);
	}

	function saveNewHabit() {

		if (validateNewHabit()) {

			setIsSendingData(true);

			const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`
			const config = {
				headers: { Authorization: `Bearer ${user.token}` }
			};
			const promise = axios.post(url, {name: newHabitName, days: [...newHabitDays]}, config);
			promise.then(() => {
				setEditingNewHabit(false);
				clearNewHabit();
				getHabits();
				getDayHabits();
				setIsSendingData(false);
			});
			promise.catch(e => {
				setIsSendingData(false);
			})
		}

	}

	function cancelNewHabit() {
		setEditingNewHabit(false);
	}


	function deleteHabitHook(id) {
		if (user && id > -1) {
			const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
			const config = {
				headers: { Authorization: `Bearer ${user.token}` }
			};
			const promise = axios.delete(url, config);
			promise.then(() => {
				getHabits();
				getDayHabits();
			});
			promise.catch(e => {
				// console.log(e);
			})
		}
	}



	// Edit Habit

	const nameInput = (
		<EditTitleInput
			disabled={isSendingData}
			placeholder={"nome do hábito"}
			value={newHabitName}
			onChange={e => { setNewHabitName(e.target.value) }}
		>
		</EditTitleInput>
	)

	const daysComponent = (
		<DaysContainer>
			{daysOfTheWeek.map((day, index) => {

				let classNameVal = (newHabitDays.indexOf(index) > -1) ? "selected" : ""
				
				return (
					<SelectDay
						key={index} className={classNameVal}
						onClick={() => {toggleDay(index);}}
					>
						{day}
					</SelectDay>)
			})}
		</DaysContainer>
	)

	const saveContainer = (
		<SaveContainer>
			<CancelButton disabled={isSendingData} onClick={() => { cancelNewHabit() }}>Cancelar</CancelButton>
			<SaveButton disabled={isSendingData} onClick={() => { saveNewHabit() }}>
				{isSendingData
					? <ThreeDots color="#fff" height={50} width={50} />
					: "Salvar"}
			</SaveButton>
		</SaveContainer>
	)


	return (
		<Main>
			<Top>
				<h1>Meus hábitos</h1>
				<PlusButton onClick={showNewHabit}>+</PlusButton>
			</Top>

			<HabitsList>
				{habits.map(habit => {
					return (
						<Habit
							key={habit.id}
							id={habit.id}
							name={habit.name}
							days={habit.days}
							deleteHabitHook={deleteHabitHook}
						/>
					)
				})}
				{editingNewHabit
					? (
						<Container>
							{nameInput}
							{daysComponent}
							{saveContainer}
						</Container>
					)
					: <></>}
			</HabitsList>

			{habits.length > 0
				? <></>
				: <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}
		</Main>
	)
}