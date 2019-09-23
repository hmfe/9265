import { css } from "styled-components";
// eslint-disable-next-line import/no-webpack-loader-syntax

let rawVariables = {
  breakpointMedium: "620px",
  breakpointLarge: "800px",
  breakpointXlarge: "1280px"
};

const sizes = Object.keys(rawVariables)
  .filter(key => key.includes("breakpoint"))
  .reduce((result, key) => {
    result[key] = rawVariables[key];
    return result;
  }, {});

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const size = sizes[label];
  accumulator[label] = (...args) => css`
    @media (min-width: ${size}) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
