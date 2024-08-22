// https://gluestack.io/ui/docs/recipes/linear-gradient
import { styled } from "@gluestack-style/react";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";

const LinearGradient = styled(
  ExpoLinearGradient,
  {},
  {
    resolveProps: ["colors"],
  },
  {
    propertyTokenMap: {
      colors: "colors",
    },
    propertyResolver: {
      colors: (rawValue: any, resolver: any) => {
        rawValue.forEach((color: any, index: number) => {
          rawValue[index] = resolver(color);
        });
        return rawValue;
      },
    },
  }
);

export default LinearGradient;
