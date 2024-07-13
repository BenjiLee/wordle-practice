const workBankWork = "Shelf";

const LetterBox = ({ letter }: { letter: string }) => {
  return (
    <div className={"border-2 rounded border-black w-10 h-10"}>
      <h1>{letter}</h1>
    </div>
  );
};
export default function WordlePage() {
  return (
    <div>
      <h1 className={"border-2 m-10 rounded border-black w-10 h-10"}>
        Wordle Home Page
      </h1>
      {/*<LetterBox letter={"a"} />*/}
    </div>
  );
}
