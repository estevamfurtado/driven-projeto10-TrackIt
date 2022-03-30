import React, { useState, useContext, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Banner = styled.footer`
  height: 70px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 375px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
  }

  .todayCircleCentralize {
    width: 90px;
    height: 100%;
    position: relative;
  }

  .todayCircle {
    width: 90px;
    height: 90px;
    position: absolute;
    bottom: 10px;
  }

  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #52B6FF;
    font-size: 18px;
    cursor: pointer;
  }
`;



export default function Footer({ }) {

  const { user, dayHabits, getDayHabits } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			getDayHabits();
		}
	}, [user]);

  const completion = (dayHabits.filter(h => h.done).length/dayHabits.length) * 100;

  return (
    <Banner>
      <Wrapper>
        <div>
          <Link to="/habitos">
            Hábitos
          </Link>
        </div>

        <div className="todayCircleCentralize">
          <div className="todayCircle">
            <Link to="/hoje">
              <CircularProgressbar
                value={completion}
                text="Hoje"
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#52B6FF",
                  textColor: "#fff",
                  pathColor: "#fff",
                  trailColor: "transparent"
                })}
              />
            </Link>
          </div>
        </div>

        <div>
          <Link to="/historico">
            Histórico
          </Link>
        </div>

      </Wrapper>
    </Banner>
  );
}
