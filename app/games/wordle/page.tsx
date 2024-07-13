"use client";
import { SetStateAction, useEffect, useState } from "react";

const DEBUG = true;
const LetterBox = ({
  answer,
  column,
  reveal,
  disabled,
  setResult,
  word,
}: {
  answer: string;
  column: number;
  reveal: boolean;
  disabled: boolean;
  setResult: React.Dispatch<SetStateAction<{}>>;
  word: string;
}) => {
  const [value, setValue] = useState("");
  const upperCaseWord = word.toUpperCase();

  const handleChange = (event: { target: { value: string } }) => {
    if (event.target.value.length > 1) {
      return;
    }
    const upperCaseValue = event.target.value.toUpperCase();
    setValue(upperCaseValue);
    if (upperCaseValue === "") {
      setResult((prev) => {
        return {
          ...prev,
          [column]: null,
        };
      });
      return;
    }
    setResult((prev) => {
      return {
        ...prev,
        [column]: upperCaseValue === word[column].toUpperCase(),
      };
    });
  };
  let style = "bg-gray-300";
  if (reveal) {
    if (value.toUpperCase() === answer.toUpperCase()) {
      style = "bg-green-500";
    } else if (upperCaseWord.split("").includes(value.toUpperCase())) {
      style = "bg-yellow-500";
    } else {
      style = "bg-gray-400";
    }
  }
  return (
    <>
      <div
        className={
          "border-2 m-1 rounded border-black w-10 h-10 flex items-center justify-center " +
          style
        }
      >
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className={
            "border-2 text-4xl w-10  flex items-center justify-center " + style
          }
        />
      </div>
      {DEBUG && (
        <>
          {disabled && "D"}
          {reveal && "R"}
          {answer}
        </>
      )}
    </>
  );
};

const LetterBoxRow = ({
  word,
  currentRow,
  row,
  setRowState,
}: {
  word: string;
  currentRow: number;
  row: number;
  setRowState: (rowState: RowState) => void;
}) => {
  const shouldReveal = row < currentRow;
  const disabled = row > currentRow || shouldReveal;

  const [result, setResult] = useState({});

  useEffect(() => {
    for (const value of Object.values(result)) {
      if (value === null) {
        setRowState("incomplete");
        return;
      }
      if (value === false) {
        setRowState("wrong");
        return;
      }
    }
    setRowState("correct");
  }, [result]);

  if (row === currentRow) {
    console.log(JSON.stringify(result));
  }
  return (
    <div className={"flex flex-row"}>
      {word.split("").map((answer, index) => (
        <LetterBox
          key={"letterBox" + row + answer + index}
          column={index}
          answer={answer}
          reveal={shouldReveal}
          disabled={disabled}
          setResult={setResult}
          word={word}
        />
      ))}
    </div>
  );
};

async function getData() {
  const res = await fetch("/games/wordle/api", { cache: "force-cache" });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const word = await res.json();
  return word.message;
}

const rows = [0, 1, 2, 3, 4];

type RowState = "incomplete" | "wrong" | "correct";
export default async function WordlePage() {
  const [currentRow, setCurrentRow] = useState(0);
  const [rowState, setRowState] = useState<RowState>("incomplete");
  // const [randomWord, setRandomWord] = useState("-----");
  const randomWord = "await";

  const onCheckWord = () => {
    switch (rowState) {
      case "incomplete":
        return;
      case "wrong":
        setCurrentRow(currentRow + 1);
        return;
      case "correct":
        alert("You win!");
        break;
    }
  };

  return (
    <div>
      <h1>Wordle Home Page</h1>
      <div className={"flex flex-col"}>
        {rows.map((row, index) => (
          <LetterBoxRow
            word={randomWord.toUpperCase()}
            key={index}
            currentRow={currentRow}
            row={index}
            setRowState={setRowState}
          />
        ))}
        <button className={"border-2 w-14 m-5"} onClick={onCheckWord}>
          Next Row
        </button>
      </div>
    </div>
  );
}
