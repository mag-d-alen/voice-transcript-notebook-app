import React, { useState, useEffect } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = false;
mic.lang = "en-GB";

function App() {
  const [listening, setListening] = useState(false);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState("");

  useEffect(() => {
    handleListening();
  }, [listening]);

  useEffect(() => {
    setListening(false);
    setNote("");
  }, [savedNotes]);

  const handleListening = () => {
    if (listening) {
      mic.start();
    } else {
      mic.stop();
    }
    mic.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setNote(transcript);
    };
  };

  const handleSavedNotes = () => {
    setSavedNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  };

  const handleDelete = (event) => {
    let noNote = event.target.id;
    setSavedNotes((prevValue) => {
      return prevValue.filter((note) => {
        return note !== noNote;
      });
    });
  };

  return (
    <React.Fragment>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          {listening ? (
            <span>
              mic ON
              <span role="img" aria-label="on">
                🔊{" "}
              </span>
            </span>
          ) : (
            <span>
              <span role="img" aria-label="off">
                🔇{" "}
              </span>
              mic OFF
            </span>
          )}
          <p>{note}</p>
          <button onClick={() => setListening((prevState) => !prevState)}>
            ON/OFF
          </button>
          <br />
          <button onClick={handleSavedNotes} disabled={!note}>
            Save the note
          </button>
          <button
            onClick={() => {
              setNote("");
              setListening(false);
            }}
            disabled={!note}
          >
            Clear the note
          </button>
        </div>
        <div className="box">
          <h2>Notes</h2>
          <ul>
            {savedNotes
              ? savedNotes.map((note) => (
                  <li onClick={handleDelete} key={note} id={note}>
                    {note}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
export default App;
