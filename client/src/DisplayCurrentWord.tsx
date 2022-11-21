import "./DisplayCurrentWord.scss";

interface DisplayCurrentWordProps {
  currentWord: string;
  normalisedWord: string;
  pressedKeys: string[];
}

export const DisplayCurrentWord = ({
  currentWord,
  normalisedWord,
  pressedKeys,
}: DisplayCurrentWordProps) => {
  const letters = normalisedWord.split("");

  return (
    <div className="display-current-word">
      {letters.map((letter, index) => {
        const isCorrect = pressedKeys.includes(letter);
        return (
          <div key={index} className={`letter${isCorrect ? " correct " : ""} `}>
            {isCorrect ? currentWord[index] : "_"}
          </div>
        );
      })}
    </div>
  );
};
