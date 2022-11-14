import "./DisplayCurrentWord.scss";

interface DisplayCurrentWordProps {
  currentWord: string;
  pressedKeys: string[];
}

export const DisplayCurrentWord = ({ currentWord, pressedKeys }: DisplayCurrentWordProps) => {
  const letters = currentWord.split("");

  return (
    <div className="display-current-word">
      {letters.map((letter, index) => {
        const isCorrect = pressedKeys.includes(letter);
        return (
          <div key={index} className={`letter${isCorrect? " correct ": ""} `}>
            {isCorrect ? letter : "_"}
          </div>
        );
      })}
    </div>
  );
}
