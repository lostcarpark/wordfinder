import { useState } from "react";

import words from "./words_dictionary.json";
import "./App.css";

function App() {
  const [maxWords, setMaxWords] = useState(100);
  const [wordLength, setWordLength] = useState(5);
  const [knownLetters, setKnownLetters] = useState([]);
  const [includeLetters, setIncludeLetters] = useState("");
  const [excludeLetters, setExcludeLetters] = useState("");
  const [noRepeatLetters, setNoRepeatLetters] = useState(false);

  const foundWords = [];
  let numFound = 0;
  let numRepeating = 0;
  console.log("Len: ", wordLength, numFound, words.length);
  nextWord: for (let word in words) {
    //console.log(word, word.length, wordLength);
    if (word.length !== wordLength) continue;
    for (let i = 0; i < wordLength; i++)
      if (knownLetters[i] && word.charAt(i) !== knownLetters[i])
        continue nextWord;
    for (const c of includeLetters) if (!word.includes(c)) continue nextWord;
    for (const c of excludeLetters) if (word.includes(c)) continue nextWord;
    if (noRepeatLetters)
      for (const c of word)
        if (word.match(new RegExp(c, "gi") || []).length > 1) {
          numRepeating++;
          continue nextWord;
        }
    // Only add to list if haven't reached maximum.
    if (numFound <= maxWords) foundWords.push(<p key={word}>{word}</p>);
    numFound++;
  }
  console.log("Found", foundWords);

  const knownLetterInputs = [];
  for (let i = 0; i < wordLength; i++) {
    knownLetterInputs.push(
      <input
        key={i}
        id={"knownLetter_" + i}
        type="text"
        size={1}
        maxLength={1}
        value={knownLetters[i] || ""}
        onChange={(e) => {
          const letters = [...knownLetters];
          letters[i] = e.target.value;
          setKnownLetters(letters);
        }}
      />
    );
  }

  return (
    <div className="App">
      <h1>Word Finder</h1>
      <div>
        <label htmlFor="maxWords">Maximum number of results:</label>
        <input
          id="maxWords"
          type="number"
          value={maxWords}
          onChange={(e) => setMaxWords(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="wordLength">Word length:</label>
        <input
          id="wordLength"
          type="number"
          value={wordLength}
          onChange={(e) => setWordLength(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="knownLetter_1">Known letters:</label>
        {knownLetterInputs}
      </div>
      <div>
        <label htmlFor="includeLetters">Include letters:</label>
        <input
          id="includeLetters"
          type="text"
          value={includeLetters}
          onChange={(e) => setIncludeLetters(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="excludeLetters">Exclude letters:</label>
        <input
          id="excludeLetters"
          type="text"
          value={excludeLetters}
          onChange={(e) => setExcludeLetters(e.target.value)}
        />
      </div>
      <div>
        <input
          id="noRepeatLetters"
          type="checkbox"
          checked={noRepeatLetters}
          onChange={(e) => setNoRepeatLetters(e.target.checked)}
        />
        <label htmlFor="noRepeatLetters">No repeat letters</label>
      </div>
      <div>
        <input
          type="button"
          onClick={(e) => {
            setIncludeLetters("");
            setExcludeLetters("");
            setKnownLetters([]);
          }}
          value="Reset"
        />
      </div>
      <div>Total number of words found: {numFound}</div>
      <div>
        {numRepeating > 0
          ? "Number of words excluded with repeating letters: " + numRepeating
          : ""}
      </div>
      <div>{foundWords}</div>
    </div>
  );
}

export default App;
