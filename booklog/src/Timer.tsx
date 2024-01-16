import { useEffect, useState, useRef } from 'react';

export const Timer = (): JSX.Element => {
	const [time, setTime] = useState(5); // 初期値5で残りの秒数を補完するtime
	const [timerActive, setTimerActive] = useState(false); // タイマーが動いてるかどうかを補完。初期値は止まってるのでfalse
	const selectRef = useRef<HTMLSelectElement>(null); //useRefでDOMにアクセス、初期値null

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
			setTime(parseInt(selectRef.current?.value || "5", 10)); //selectRefで数値取得に変更

			// タイマーを起動
			setTimerActive(true);
		}
	};

	// タイマーの機能（　∵　）
	useEffect(() => {
		// timerActiveがfalseの場合は早期リターン
		if (!timerActive) return;

		// カウントダウンの仕様
		const handleInterval = () => {
			setTime((prev) => (prev > 0 ? prev - 1 : 0));
		};

		// 0になるまで
		const intervalId = time > 0 ? window.setInterval(handleInterval, 1000) : 0;

		// 0になったら
		if (time === 0) {
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
	// console.log(time);
	// console.log(timerActive);

	return (
		<div className="reading-timer">
			<p className={`remaining-time-txt${!timerActive && time === 0 ? ' remaining-time-txt-finish' : ''}`}>
				{timerActive || time > 0 ? `読書タイマー 残り${time}秒` : '読書タイマー終了'}
			</p>
			<form className="reading-timer-box">
				<select
					ref={selectRef}
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