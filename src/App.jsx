import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const copyPassword = useRef("");
  const copy = () => {
    copyPassword.current?.select();
    window.navigator.clipboard.writeText(password);
    alert("password copied");
  };
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let nums = "0123456789";
    let characters = "!@#$%^&*-_+=[]{}~`";
    let string = alphabets;
    if (numberAllowed) {
      string += nums;
    }
    if (charAllowed) {
      string += characters;
    }

    for (let index = 0; index <= length; index++) {
      const random = Math.floor(Math.random() * string.length);
      const element = string[random];
      pass = pass + element;
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);
  return (
    <>
      <div className="bg-slate-600 m-auto w-fit mt-[10rem] px-10 py-5 rounded-xl shadow-md text-orange-600">
        <h3 className="text-center mb-2 text-white text-lg">
          PassWord Generator
        </h3>
        <div className="flex  rounded-lg overflow-hidden mb-4 justify-center">
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            type="text"
            readonly="2"
            name="search"
            value={password}
            ref={copyPassword}
          />

          <button
            className="bg-neutral-400 rounded-lg px-[10px] font-bold"
            onClick={copy}
          >
            Copy
          </button>
        </div>
        <div className="flex text-lg gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
