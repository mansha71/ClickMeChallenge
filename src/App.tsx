import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const buttonWidth = 100;
  const buttonHeight = 30;

  const [marginTop, setTop] = useState("");
  const [marginLeft, setLeft] = useState("");
  const [color, setColor] = useState("#1a1a1a");
  const [score, setScore] = useState(0);
  const [highscore, setHigh] = useState(0);
  const [start, setStart] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds

  useEffect(() => {
    let countdownInterval: number;

    if (start && timeRemaining > 0) {
      countdownInterval = window.setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000); // Update every second
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [start, timeRemaining]);

  const handleButtonClick = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const maxTop = windowHeight - buttonHeight;
    const maxLeft = windowWidth - buttonWidth;

    const newTop = Math.floor(Math.random() * maxTop);
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

  return (
    <>
      {!start && (
        <div>
          Start game:
          <button onClick={handleStartGame}>Start:</button>
        </div>
      )}
      <p>Score: {score}</p>
      <p>HighScore: {highscore}</p>
      <p>Time remaining: {timeRemaining} seconds</p>
      {start && (
        <span>
          <div
            className="butScreen"
            style={{
              backgroundColor: "black",
              width: "100%",
              height: "100vh", // Set the height to the full viewport height
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
              CLICK ME!
            </button>
          </div>
        </span>
      )}
    </>
  );
}

export default App;
