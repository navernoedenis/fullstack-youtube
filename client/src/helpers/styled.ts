import { StyledOptions } from "@emotion/styled";

// PROBLEM: [Emotion] React does not recognize the XXXXX prop on a DOM element
// SOLUTION: https://dev-yakuza.posstree.com/en/react/emotion/does-not-recognize-props

export function shouldForwardProp(name: string): StyledOptions {
  const options: StyledOptions = {
    shouldForwardProp: (propName: string) => propName !== name,
  };

  return options;
}
