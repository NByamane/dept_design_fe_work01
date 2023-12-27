import { useEffect, useState } from 'react';

export const Timer = (): JSX.Element => {
	const [time, setTime] = useState(5); // 初期値5で残りの秒数を補完するtime
	const [selectedSeconds, setSelectedSeconds] = useState(5); // selectで選択した秒数を補完。初期値5
	const [timerActive, setTimerActive] = useState(false); // タイマーが動いてるかどうかを補完。初期値は止まってるのでfalse
	const [intervalId, setIntervalId] = useState<number | null>(null); //初期値nullで型はnumber or nullが入る

	useEffect(() => {
		let timeCount: number = 0; //timeCountは変更される変数なので、letを使用。初期値0。

		//timeの値を更新
		const handleInterval = () => {
			setTime((prev) => (prev > 0 ? prev - 1 : 0)); //prevが0より大きければ1減らして、それ以外は0を設定（0以下にならないように制御）
		};

		//タイマーがactiveかつタイマーがセットされてない時（動いてる時はnullにするので）
		if (timerActive && intervalId === null) {
			timeCount = window.setInterval(handleInterval, 1000);
			setIntervalId(timeCount);
		}

		//クリーンアップ関数
		return () => {
			if (timeCount) {
				clearInterval(timeCount);
			}
		};
	}, [timerActive, intervalId]); //この2つの変数の変化に依存する

	//こっから何かした時の挙動書くよ
	//①selectで選択した時に呼び出される関数
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (!timerActive) {// タイマーが動いてない時限定（でないと動いてる時に選択すると上書きされる）
			const selectedValue = parseInt(event.target.value, 10); //取得したvalueを10進数で整数変換
			setSelectedSeconds(selectedValue);
			setTime(selectedValue);
		}
	};

	//②startボタンを押した時に呼び出される関数
	const handleStartButton = () => {
		// 既存のタイマーが動いている場合はクリーンアップ関数にてクリア
		if (intervalId !== null) {
			clearInterval(intervalId);
			setIntervalId(null);
		}

		setTime(selectedSeconds);
		setTimerActive(true);

		//残り時間の更新
		const newIntervalId = window.setInterval(() => {
			setTime((prevTime) => {
				//残り秒数0になったらタイマーを停止
				if (prevTime === 0) {
					clearInterval(newIntervalId);
					setTimerActive(false);
				}

				return prevTime > 0 ? prevTime - 1 : 0;
			});
		}, 1000);

		setIntervalId(newIntervalId);
	};

	return (
		<div className="reading-timer">
			{timerActive && (
				<p className="remaining-time-txt">読書タイマー 残り<span>{time}</span>秒</p>
			)}
			{!timerActive && time > 0 && (
				<p className="remaining-time-txt">読書タイマー 残り<span>{selectedSeconds}</span>秒</p>
			)}
			{!timerActive && time === 0 && (
				<p className="remaining-time-txt remaining-time-txt-finish">読書タイマー終了</p>
			)}
			<form className="reading-timer-box">
				<select
					name="reading-timer"
					id="reading-timer-select-box"
					className="reading-timer-select-box"
					value={selectedSeconds}
					onChange={handleSelectChange}
				>
					<option value={5}>5秒</option>
					<option value={10}>10秒</option>
					<option value={15}>15秒</option>
				</select>
				<button
					type="button" // デフォルトのフォーム送信を抑制する
					className="reading-timer-button"
					onClick={handleStartButton}
				>
					start
				</button>
			</form>
		</div>
	);
};