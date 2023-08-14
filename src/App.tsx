import { useState } from "react";
import "./App.css";

function App() {
  const [marginTop, setTop] = useState("");
  const [marginLeft, setLeft] = useState("");
  const [color, setColor] = useState("#1a1a1a"); // Initial color
  const [score, setScore] = useState(0);
  const [highscore, setHigh] = useState(0);
  const [start, setStart] = useState(false);

  const handleButtonClick = () => {
    const newTop = Math.floor(Math.random() * 370).toString();
    const newLeft = Math.floor(Math.random() * 401).toString();
    const randomColor = getRandomColor();

    // Use functional update for score
    setScore((prevScore) => prevScore + 1);
    setTop(newTop);
    setLeft(newLeft);
    setColor(randomColor);

    // Update highscore
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
        <div className="startScreen">
          Start game:
          <button onClick={handleStartGame}>Start: {start.toString()}</button>
        </div>
      )}
      {start && (
        <span>
          <p>Click to start!</p>
          <p>Score: {score}</p>
          <p>HighScore: {highscore}</p>
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
        </span>
      )}
    </>
  );
}

export default App;
