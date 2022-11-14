import { useCallback, useEffect, useMemo, useState } from 'react';

import "./App.scss";
import { DisplayCurrentWord } from './DisplayCurrentWord';
import { DisplayTries } from './DisplayTries';
import { Keyboard } from "./Keyboard";

enum Language {
  English = "en",
  Romanian = "ro",
}

const maxGuesses = 6;

function App() {
  const [language, setLanguage] = useState<Language>(Language.English);
  const [word, setWord] = useState("");
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  const isGameOver = useMemo(() => {
    return pressedKeys.length >= maxGuesses;
  }, [pressedKeys]);

  const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const loadCurrentWord = useCallback(async (language: Language) => {
    setPressedKeys([]);
    setIsRequestLoading(true);
    const response = await fetch(
      `http://localhost:5000/word?language=${language}`
    );
    const data = await response.json();
    setWord(data.word);
    setIsRequestLoading(false);
  }, []);

  useEffect(() => {
    loadCurrentWord(language);
  }, [language, loadCurrentWord]);

  return (
    <div className="App">
      <div className="header">
        <select onChange={onLanguageChange}>
          <option
            selected={language === Language.English}
            value={Language.English}
          >
            English
          </option>
          <option
            selected={language === Language.Romanian}
            value={Language.Romanian}
          >
            Romanian
          </option>
        </select>
      </div>
      <div className="body">
        {isRequestLoading ? (
          <div className="loading">Loading...</div>
        ) : (
            // isGameOver ? (
            //   <div className="game-over">
            //     <div className="game-over-text">Game Over</div>
            //     <button onClick={() => loadCurrentWord(language)}>
            //       Play Again
            //     </button>
            //   </div>
            // ) : (
              <>
                <DisplayTries pressedKeys={pressedKeys} />
                <DisplayCurrentWord currentWord={word} pressedKeys={pressedKeys} />
                <Keyboard setPressedKeys={setPressedKeys} />
              </>
            )
        // )
        }
      </div>
    </div>
  );
}

export default App;
