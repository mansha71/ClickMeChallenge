import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const buttonWidth = 100;
  const buttonHeight = 30;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const [marginTop, setTop] = useState("");
  const [marginLeft, setLeft] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [score, setScore] = useState(0);
  const [highscore, setHigh] = useState(0);
  const [start, setStart] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [gameReset, setGameReset] = useState(false);

  useEffect(() => {
    let countdownInterval: number;

    if (timeRemaining <= 0) {
      setGameReset(true);
    }
    if (start && timeRemaining > 0) {
      countdownInterval = window.setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(countdownInterval);
    };
  }, [start, timeRemaining]);

  const handleButtonClick = () => {
    const maxTop = windowHeight - buttonHeight;
    const maxLeft = windowWidth - buttonWidth;

    const calculatedTop = Math.floor(Math.random() * maxTop - 129);
    const newTop = Math.min(350, Math.max(10, calculatedTop));
    const newLeft = Math.floor(Math.random() * maxLeft);
    const randomColor = getRandomColor();

    setScore((prevScore) => prevScore + 1);
    setTop(newTop.toString());
    setLeft(newLeft.toString());
    setColor(randomColor);

    setHigh((prevHighscore) => Math.max(prevHighscore, score + 1));
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleStartGame = () => {
    setStart(true);
  };

  const handleResetGame = () => {
    setGameReset(false);
    setScore(0);
    setTimeRemaining(30);
  };

  return (
    <>
      {!start && (
        <div className="startScreen">
          <div className="StartWord">Start Game:</div>
          <button onClick={handleStartGame}>Start:</button>
        </div>
      )}
      {start && !gameReset && (
        <span>
          <p>Score: {score}</p>
          <p>HighScore: {highscore}</p>
          <p>Time remaining: {timeRemaining} seconds</p>
          <div
            className="butScreen"
            style={{
              width: "100%",
              height: "75vh", // Set the height to the full viewport height
            }}
          >
            <button
              onClick={() => {
                handleButtonClick();
              }}
              style={{
                marginTop: `${marginTop}px`,
                marginLeft: `${marginLeft}px`,
                backgroundColor: color,
              }}
            >
              Click!
            </button>
          </div>
        </span>
      )}
      {start && gameReset && (
        <div className="gameReset">
          <h3>Restart?</h3>
          <p>Score: {score}</p>
          <p>Highscore: {highscore}</p>
          <button onClick={() => handleResetGame()}>Restart</button>
        </div>
      )}
    </>
  );
}

export default App;
