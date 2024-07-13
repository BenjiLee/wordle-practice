const workBankWork = "Shelf";

const LetterBox = ({ letter }: { letter: string }) => {
  return (
    <div
      className={
        "border-2 rounded border-black w-10 h-10 items-center justify-center"
      }
    >
      <h1 className={"align-middle"}>{letter}</h1>
    </div>
  );
};
export default function WordlePage() {
  return (
    <div>
      <h1>Wordle Home Page</h1>
      <LetterBox letter={"a"} />
    </div>
  );
}
