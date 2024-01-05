import { useEffect, useState } from 'react';

export const Timer = (): JSX.Element => {
	const [time, setTime] = useState(5); // 初期値5で残りの秒数を補完するtime
	const [timerActive, setTimerActive] = useState(false); // タイマーが動いてるかどうかを補完。初期値は止まってるのでfalse

	//これ、やりたいこと（　∵　）
	//①selectで秒数選択した時
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault(); //デフォルトの挙動を抑制

		if (!timerActive) { //動いてる時はsetTime更新しないよ（　∵　）
			const selectedValue = parseInt(event.target.value, 10);
			setTime(selectedValue);
		}
	};

	//②startボタンを押した時
	const handleStartButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault(); //デフォルトの挙動を抑制

		if (!timerActive) { //タイマーが止まってる時だけbuttonクリックを有効に
			// まずoptionのvalueの数値を取ってきてsetTimeにセット
			const selectedOption = document.getElementById("reading-timer-select-box") as HTMLSelectElement;
			const selectedValue = parseInt(selectedOption.value, 10);
			setTime(selectedValue);

			// タイマーを起動
			setTimerActive(true);
		}
	};

	// タイマーの機能（　∵　）
	useEffect(() => {
		let intervalId: number = 0;

		const handleInterval = () => {
			setTime((prev) => (prev > 0 ? prev - 1 : 0));
		};

		if (timerActive && time > 0) {
			intervalId = window.setInterval(handleInterval, 1000);
		}

		// タイマーが0になったら自動的に停止
		if (time === 0 && timerActive) {
			setTimerActive(false);
		}

		// クリーンアップ
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [timerActive, time]);

	// 調査用
	console.log(time);
	console.log(timerActive);

	return (
		<div className="reading-timer">
			<p className={`remaining-time-txt${!timerActive && time === 0 ? ' remaining-time-txt-finish' : ''}`}>
				{timerActive || time > 0 ? `読書タイマー 残り${time}秒` : '読書タイマー終了'}
			</p>
			<form className="reading-timer-box">
				<select
					name="reading-timer"
					id="reading-timer-select-box"
					className="reading-timer-select-box"
					onChange={handleSelectChange}
				>
					<option value={5}>5秒</option>
					<option value={10}>10秒</option>
					<option value={15}>15秒</option>
				</select>
				<button
					className="reading-timer-button"
					onClick={handleStartButton}
				>
					start
				</button>
			</form>
		</div>
	);
};