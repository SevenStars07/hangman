import { useCallback, useEffect, useMemo, useState } from 'react';
import removeAccents from "remove-accents";

import "./App.scss";
import { DisplayCurrentWord } from "./DisplayCurrentWord";
import { DisplayTries } from "./DisplayTries";
import { Keyboard } from "./Keyboard";

enum Language {
  English = "en",
  Romanian = "ro",
}

const maxGuesses = 6;

function App() {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem("language") as Language) || Language.English
  );
  const [word, setWord] = useState("");
  const [normalisedWord, setNormalisedWord] = useState("");
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  const numberOfBadGuesses = useMemo(() => {
    return pressedKeys.filter((key) => !word.includes(key)).length;
  }, [pressedKeys, word]);

  const isGameOver = useMemo(() => {
    return (
      numberOfBadGuesses >= maxGuesses &&
      !normalisedWord.split("").every((letter) => pressedKeys.includes(letter))
    );
  }, [normalisedWord, numberOfBadGuesses, pressedKeys]);

  const isGameWon = useMemo(() => {
    return normalisedWord
      .split("")
      .every((letter) => pressedKeys.includes(letter));
  }, [normalisedWord, pressedKeys]);

  const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as Language;

    localStorage.setItem("language", lang);
    setLanguage(lang);
  };

  const loadCurrentWord = useCallback(async (language: Language) => {
    setPressedKeys([]);
    setIsRequestLoading(true);
    const response = await fetch(
      `http://localhost:5000/word?language=${language}`
    );
    const data = await response.json();
    const normalised = removeAccents(data.word);
    setNormalisedWord(normalised);
    setWord(data.word);
    setIsRequestLoading(false);
  }, []);

  useEffect(() => {
    console.log("language changed", language);
    loadCurrentWord(language);
  }, [language, loadCurrentWord]);

  const submitHighScore = useCallback(async () => {
    const name = prompt("Please enter your name");
    if (!name) return;
  }, []);

  useEffect(() => {
    const isGameWon = normalisedWord
      .split("")
      .every((letter) => pressedKeys.includes(letter));

    if (!isGameWon) return;

    submitHighScore();
  }, [normalisedWord, pressedKeys, submitHighScore]);

  return (
    <div className="App">
      <div className="header">
        <select onChange={onLanguageChange} value={language}>
          <option value={Language.English}>English</option>
          <option value={Language.Romanian}>Romanian</option>
        </select>
      </div>
      <div className="body">
        {isRequestLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <DisplayTries numberOfBadGuesses={numberOfBadGuesses} />
            {isGameOver ? (
              <>
                <div className="game-over">Game over!</div>
                <button onClick={() => loadCurrentWord(language)}>
                  Play again
                </button>
              </>
            ) : (
              <>
                {isGameWon ? (
                  <>
                    <div className="game-won">You won!</div>
                    <DisplayCurrentWord
                      currentWord={word}
                      normalisedWord={normalisedWord}
                      pressedKeys={pressedKeys}
                    />
                    <button onClick={() => loadCurrentWord(language)}>
                      Play again
                    </button>
                  </>
                ) : (
                  <>
                    <DisplayCurrentWord
                      currentWord={word}
                      normalisedWord={normalisedWord}
                      pressedKeys={pressedKeys}
                    />
                    <Keyboard setPressedKeys={setPressedKeys} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
