import React, { useState, useEffect, useRef } from "react";
import CustomDice from "./components/Dice";
import Table from "./components/Table";
import ScoreBoard from "./components/ScoreBoard";
import { initialBetStatus, betTime, rollTime, waitTime, resultTime } from "./constants/gameProperties";
import styles from "./App.module.css";
import AppVersion from "./components/AppVersion";

function App() {
	const [balance, setBalance] = useState(100);
	const [betCards, setBetCards] = useState(initialBetStatus);
	const [outcome, setOutcome] = useState(null);
	const [betTimer, setBetTimer] = useState(betTime);
	const [betOn, setBetOn] = useState(true);
	const [toggle, setToggle] = useState(false);

	const betCardsRef = useRef(betCards);
	const outcomeRef = useRef(outcome);

	useEffect(() => {
		betCardsRef.current = betCards;
	}, [betCards]);

	useEffect(() => {
		outcomeRef.current = outcome;
	}, [outcome]);

	useEffect(() => {
		const clock = setInterval(() => {
			setBetTimer((prevTimer) => prevTimer - 1);
		}, 1000);

		let betClock = setTimeout(() => {
			setBetOn(false);
		}, betTime * 1000);

		let rollClock = setTimeout(() => {
			let score = 0;

			for (let { face, bet } of betCardsRef.current) {
				score = face === outcomeRef.current ? score + bet * 2 : score - bet;
			}

			setBalance((balance) => balance + score);
		}, (betTime + waitTime + rollTime + 1) * 1000);

		let resultClock = setTimeout(() => {
			setBetCards(initialBetStatus);
			setOutcome(null);
			setBetTimer(betTime);
			setBetOn(true);
			setToggle((prevToggle) => !prevToggle);
		}, (betTime + waitTime + rollTime + resultTime) * 1000);

		return () => {
			clearTimeout(betClock);
			clearTimeout(rollClock);
			clearTimeout(resultClock);
			clearInterval(clock);
		};
	}, [toggle]);

	return (
		<div className={styles.app}>
			<div className={styles.heading}>
				<h2>Roll Rush |</h2> A game of fun and luck
			</div>
			<div className={styles.timer}>Timer: {betTimer >= 0 ? betTimer : 0}</div>
			<div className={styles.mainContainer}>
				<CustomDice rollHandler={(value) => setOutcome(value)} timer={betTimer + waitTime} />
				<ScoreBoard balance={balance} />
			</div>
			<div className={styles.Table}>
				<Table options={betCards} setOptions={setBetCards} betState={betOn} outcome={outcome} />
			</div>
			<AppVersion position="left" />
		</div>
	);
}

export default App;
