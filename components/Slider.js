import { useState } from "react";

export default function Slider({ label, val }) {
  return (
    <>
      <div className="flex flex-col p-4">
        <div className="flex flex-row justify-between">
          <label>{label} </label>
          <span>
            <p>{val}</p>
          </span>
        </div>

        <p></p>
        <input value={val} type="range" min={0} max={100} />
      </div>
    </>
  );
}
