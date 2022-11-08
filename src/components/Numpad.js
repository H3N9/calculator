import React, { useState } from "react";
import NumpadBtn from "./NumpadBtn";

const Numpad = () => {
  const [num, setNum] = useState("");
  const [preNum, setPreNum] = useState(null);
  const [operator, setOperator] = useState("");
  const [isNegative, setNegative] = useState(false);

  const handleCal = () => {
    let calculation = 0;
    if (operator === "+") calculation = preNum + parseFloat(num);
    else if (operator === "X") calculation = preNum * parseFloat(num);
    else if (operator === "/" && parseFloat(num) !== 0)
      calculation = preNum / parseFloat(num);
    else if (operator === "-") calculation = preNum - parseFloat(num);
    return calculation;
  };

  const handleChange = (value) => {
    const isOperation =
      value === "X" || value === "/" || value === "+" || value === "-";
    if (value === "C") {
      const subString = num.toString().substring(0, num.toString().length - 1);
      setNum(subString);
      if (subString.length === 0) setNegative(false);
    } else if (value === "-" && num === "") {
      setNum("-" + num.toString());
      setNegative(true);
    } else if (isOperation && (preNum === null || num === "") && !isNegative) {
      // add operation
      setPreNum(num !== "" ? parseFloat(num) : preNum);
      setNum("");
      setNegative(false);
      setOperator(value);
    } else if (num !== "" && isOperation && preNum !== null && !isNegative) {
      // prenum operation with num only
      const cal = handleCal();
      setNum(cal);
      setPreNum(null);
      setOperator(value);
    } else if (value === "=" && !isOperation && preNum !== null && num !== "") {
      const cal = handleCal();
      setNum(cal);
      setOperator("");
      setPreNum(null);
    } else if (value === "." && !isNegative) {
      let dot = false;
      for (let i = 0; i < num.toString().length; i++) {
        const numStr = num.toString()[i];
        if (numStr === ".") {
          dot = true;
          break;
        }
      }
      if (!dot) setNum(num + value);
    } else if (!isNaN(parseFloat(value))) {
      setNegative(false);
      setNum(num + value);
    }
  };

  return (
    <div>
      <table className="tableNumpad">
        <tbody>
          <tr>
            <td colSpan={4} style={{ height: 100 }}>
              <div className="inputCal">{num}</div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <NumpadBtn handleChange={handleChange} label="C" />
            </td>
            <td>
              <NumpadBtn handleChange={handleChange} label="/" />
            </td>
            <td>
              <NumpadBtn handleChange={handleChange} label="X" />
            </td>
          </tr>
          <tr>
            <td>
              <NumpadBtn handleChange={handleChange} label="7" />
            </td>
            <td>
              <NumpadBtn handleChange={handleChange} label="8" />
            </td>
            <td>
              <NumpadBtn handleChange={handleChange} label="9" />
            </td>
            <td>
              <NumpadBtn handleChange={handleChange} label="-" />
            </td>
          </tr>
          <tr>
            <td>
              <NumpadBtn handleChange={handleChange} label="4" />
            </td>
            <td>
              <NumpadBtn handleChange={handleChange} label="5" />
            </td>
            <td>
              <NumpadBtn handleChange={handleChange} label="6" />
            </td>
            <td>
              <NumpadBtn handleChange={handleChange} label="+" />
            </td>
          </tr>
          <tr>
            <td>
              <NumpadBtn handleChange={handleChange} label="1" />
            </td>
            <td>
              <NumpadBtn handleChange={handleChange} label="2" />
            </td>
            <td>
              <NumpadBtn handleChange={handleChange} label="3" />
            </td>
            <td rowSpan={2}>
              <NumpadBtn handleChange={handleChange} label="=" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <NumpadBtn handleChange={handleChange} label="0" />
            </td>
            <td>
              <NumpadBtn handleChange={handleChange} label="." />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Numpad;
