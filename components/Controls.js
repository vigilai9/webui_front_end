import { useState } from "react";
import Slider from "./Slider";
import presets from "@/app/preset";

export default function Controls() {
  const [currentPreset, setCurrentPreset] = useState("Retail");
  return (
    <>
      <div className="border-1 border-blue-500 rounded-lg p-4 h-full">
        <h2 className="text-blue-600 text-2xl font-bold">Analysis Controls</h2>
        <Slider
          val={presets[currentPreset].detection}
          label="Detection Sensitivity"
        />
        <Slider val={presets[currentPreset].response} label="Response Speed" />
        <Slider val={presets[currentPreset].detail} label="Detail Level" />
        <Slider val={presets[currentPreset].alert} label="Alert Threshold" />
        <Slider
          val={presets[currentPreset].motion}
          label="Motion Sensitivity"
        />

        <h2 className="text-blue-600 mt-4 text-2xl font-bold">Presets</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => {
              setCurrentPreset("Standard");
            }}
            className={`rounded-xl px-4 py-2 ${
              currentPreset === "Standard"
                ? " bg-blue-500 text-white"
                : " bg-white text-blue-500 border-1 border-blue-500"
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => {
              setCurrentPreset("High Security");
            }}
            className={`rounded-xl px-4 py-2 ${
              currentPreset === "High Security"
                ? " bg-blue-500 text-white"
                : " bg-white text-blue-500 border-1 border-blue-500"
            }`}
          >
            High Security
          </button>
          <button
            onClick={() => {
              setCurrentPreset("Retail");
            }}
            className={`rounded-xl px-4 py-2 ${
              currentPreset === "Retail"
                ? " bg-blue-500 text-white"
                : " bg-white text-blue-500 border-1 border-blue-500"
            }`}
          >
            Retail
          </button>
          <button
            onClick={() => {
              setCurrentPreset("Traffic");
              console.log(currentPreset);
            }}
            className={`rounded-xl px-4 py-2 ${
              currentPreset === "Traffic"
                ? " bg-blue-500 text-white"
                : " bg-white text-blue-500 border-1 border-blue-500"
            }`}
          >
            Traffic
          </button>
        </div>
      </div>
    </>
  );
}
