// Chart colors come only from Sundae's palette (Creative Guidelines p.6): blue #1C51A0, slate #C9D2E0, ink #4A4A4A
// (pink #F4CCCC is too light for marks on white). Red #DB3D55 stays an accent and is never a series or text color.
// Checked with the dataviz validator on #ffffff: blue/slate separate well (normal-vision ΔE 43), blue/ink sit at
// ΔE 14.5 and slate is 1.5:1 on white, so every chart ships secondary encoding: a dashed stroke on the ink series,
// direct end labels, a legend with line swatches and a table view.
export const SERIES = { blue: "#1c51a0", slate: "#c9d2e0", ink: "#4a4a4a", pink: "#f4cccc", red: "#db3d55" } as const;

// The three scenarios read light to dark, with the base case in Sundae blue.
export const SCENARIO = {
  conservative: { name: "Conservative", color: SERIES.slate },
  base: { name: "Base", color: SERIES.blue },
  aggressive: { name: "Aggressive", color: SERIES.ink, dash: "9 6" },
} as const;
