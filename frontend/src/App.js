// App.jsx
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Game state
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  // Server health check (original API call)
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((d) => setData(d.now))
      .catch((err) => {
        console.error(err);
        setData("❌ Error");
      });
  }, []);

  const choices = ["rock", "paper", "scissors"];

  const handleChoice = (choice) => {
    setIsPlaying(true);
    setUserChoice(choice);
    const computer = choices[Math.floor(Math.random() * 3)];
    setComputerChoice(computer);

    let gameResult = "";
    if (choice === computer) {
      gameResult = "Draw!";
      setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
    } else if (
      (choice === "rock" && computer === "scissors") ||
      (choice === "paper" && computer === "rock") ||
      (choice === "scissors" && computer === "paper")
    ) {
      gameResult = "You Win!";
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      gameResult = "You Lose!";
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
    }
    setResult(gameResult);
  };

  const resetGame = () => {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
    setIsPlaying(false);
  };

  const resetScore = () => {
    setScore({ wins: 0, losses: 0, draws: 0 });
    resetGame();
  };

  // Dynamic result class
  const resultClass = result.includes("Win") ? "win" : result.includes("Lose") ? "lose" : "draw";

  return (
    <div className="app-container">
      <div className="card">
        <h1>🪨📄✂️ Fullstack RPS Game</h1>
        
        <div className="score-board">
          <div className="score-item">
            <div className="score-label">Wins</div>
            <div className="score-value">{score.wins}</div>
          </div>
          <div className="score-item">
            <div className="score-label">Draws</div>
            <div className="score-value">{score.draws}</div>
          </div>
          <div className="score-item">
            <div className="score-label">Losses</div>
            <div className="score-value">{score.losses}</div>
          </div>
        </div>

        {!isPlaying ? (
          <div className="choice-buttons">
            <button className="choice-btn rock" onClick={() => handleChoice("rock")}>
              🪨 Rock
            </button>
            <button className="choice-btn paper" onClick={() => handleChoice("paper")}>
              📄 Paper
            </button>
            <button className="choice-btn scissors" onClick={() => handleChoice("scissors")}>
              ✂️ Scissors
            </button>
          </div>
        ) : (
          <div className="game-result">
            <div className="choices-display">
              <div className="choice">
                <div className="choice-label">You</div>
                <div className="choice-emoji">
                  {userChoice === "rock" ? "🪨" : userChoice === "paper" ? "📄" : "✂️"}
                </div>
              </div>
              <div className="vs">VS</div>
              <div className="choice">
                <div className="choice-label">Computer</div>
                <div className="choice-emoji">
                  {computerChoice === "rock" ? "🪨" : computerChoice === "paper" ? "📄" : "✂️"}
                </div>
              </div>
            </div>
            <div className={`result-text ${resultClass}`}>{result}</div>
            <div className="action-buttons">
              <button className="btn" onClick={resetGame}>
                Play Again
              </button>
              <button className="btn secondary" onClick={resetScore}>
                Reset Score
              </button>
            </div>
          </div>
        )}

        {/* Server Health Status - Original API test */}
        <div className="server-status">
          <span className="status-icon">🕐</span>
          <span className="status-label">Server Time:</span>
          <span className="status-value">{data || "Loading..."}</span>
        </div>
      </div>
    </div>
  );
}

export default App;