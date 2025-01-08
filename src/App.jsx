import { usePokeList } from "./getPokehook";
import { Card } from "./components/card";
import '@/App.css';
import { useEffect, useState } from "react";

function App() {
  const { pokeList } = usePokeList(8); // Fetch Pokémon list
  const [shuffledList, setShuffledList] = useState([]);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState(new Set()); // Track clicked cards

  // Initialize shuffled list when pokeList changes
  useEffect(() => {
    if (pokeList.length) {
      setShuffledList([...pokeList]);
    }
  }, [pokeList]);

  // Shuffle list using Fisher-Yates algorithm
  const shuffleList = () => {
    const newArr = [...shuffledList];
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    setShuffledList(newArr);
  };

  // Handle card click
  const handleCardClick = (name) => {
    if (clickedCards.has(name)) {
      // If card was already clicked, reset score
      setScore(0);
      setClickedCards(new Set()); // Reset clicked cards
    } else {
      // Update score and add card to clicked set
      const newScore = score + 1;
      setScore(newScore);
      setClickedCards(new Set([...clickedCards, name]));

      // Update highest score if necessary
      if (newScore > highestScore) {
        setHighestScore(newScore);
      }
    }
    shuffleList(); // Shuffle the list after every click
  };

  if (!shuffledList.length) {
    return <div>loading...</div>;
  }

  return (
    <>
      <header className="app_header">
        <div className="app_score">
          <p>Score: {score}</p>
          <p>Highest Score: {highestScore}</p>
        </div>
      </header>
      <div className="app_container">
        {shuffledList.map((item) => (
          <Card
            key={item.name}
            name={item.name}
            url={item.url}
            onClick={() => handleCardClick(item.name)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
