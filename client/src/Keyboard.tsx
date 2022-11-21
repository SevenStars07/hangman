import React, { useCallback } from 'react'
import "./Keyboard.scss"

const firstRow = "q w e r t y u i o p".split(" ");
const secondRow = "a s d f g h j k l".split(" ");
const thirdRow = "z x c v b n m".split(" ");

interface KeyboardProps {
  setPressedKeys: Function;
}

export const Keyboard = (props: KeyboardProps) => {
  const { setPressedKeys } = props;

  const onDivClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("pressed")) return;

    target.classList.add("pressed");

    setPressedKeys((prev: string[]) => {
      return [...prev, target.id];
    }
    );
  }, [setPressedKeys]);

  const getRows = useCallback((rowLetters: string[]) => {
    return rowLetters.map((letter, index) => {
      return (
        <div key={index} id={letter} className="key" onClick={onDivClick}>
          {letter}
        </div>
      );
    });
  }, [onDivClick]);

  return (
    <div className="keyboard">
      <div id="first" className="row">
        {getRows(firstRow)}
      </div>
      <div id="second" className="row">
        {getRows(secondRow)}
      </div>
      <div id="third" className="row">
        {getRows(thirdRow)}
      </div>
    </div>
  );
}
