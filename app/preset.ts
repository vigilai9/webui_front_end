const presets = {
  Standard: { detection: 50, response: 30, detail: 70, alert: 20, motion: 40 },
  "High Security": {
    detection: 80,
    response: 50,
    detail: 90,
    alert: 30,
    motion: 60,
  },
  Retail: { detection: 40, response: 20, detail: 60, alert: 10, motion: 30 },
  Traffic: { detection: 60, response: 40, detail: 80, alert: 25, motion: 50 },
};

export default presets;
