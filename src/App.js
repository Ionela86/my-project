import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./Components/Character";

function App() {
  const [password, setPassword] = useState("Select...");
  const [passwordLength, setPasswordLength] = useState(false);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratePassword = () => {
    if (
      !includeUpperCase &&
      !includeLowerCase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notifyOne(
        "To generate the password, you must check at least one checkbox and choose the length of the password",
        true
      );
    } else {
      let characterList = "";
      if (includeNumbers) {
        characterList = characterList + numbers;
      }
      if (includeUpperCase) {
        characterList = characterList + upperCaseLetters;
      }
      if (includeLowerCase) {
        characterList = characterList + lowerCaseLetters;
      }
      if (includeSymbols) {
        characterList = characterList + specialCharacters;
      }
      setPassword(createPassword(characterList));
      notifyTwo("Password is generated successfully ⭐", false);
    }
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };
  const handleDelete = () => {
    setPassword("");
    setPasswordLength(false);
    setIncludeUpperCase(false);
    setIncludeLowerCase(false);
    setIncludeNumbers(false);
    setIncludeSymbols(false);
    setTimeout(function () {
      window.location.reload();
    }, 1500);
    notifyThree("Your password has been deleted. Try another password", false);
  };
  const notifyOne = () =>
    toast.error(
      "To generate the password, you must check at least one checkbox and choose the length of the password.",
      {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000,
      }
    );
  const notifyTwo = () =>
    toast.success("Password is generated successfully ⭐", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2500,
    });
  const notifyThree = () =>
    toast.warn("Your password has been deleted. Try another password.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator-header">PASSWORD GENERATOR</h2>
          <div className="generator-password">
            <h3>{password}</h3>
          </div>
          <div className="form-group">
            <label htmlFor="password-strength">Password length</label>
            <input
              className="pw"
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="26"
              min="8"
            />
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters">Add Uppercase Letters</label>
            <input
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Add Lowercase Letters</label>
            <input
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
            />
          </div>
          <button onClick={handleGeneratePassword} className="generator-btn">
            Generate Password
          </button>

          <ToastContainer />

          <button onClick={handleDelete} className="generator-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
