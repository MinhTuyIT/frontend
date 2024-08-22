import { Box, HStack } from "@gluestack-ui/themed";
import React from "react";
import { Animated } from "react-native";

interface Props {
  dots: number[];
  colors: string[];
  translateYEven: Animated.AnimatedInterpolation<string | number>;
  translateYOdd: Animated.AnimatedInterpolation<string | number>;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);

const LoadingView = ({
  dots,
  colors,
  translateYEven,
  translateYOdd,
}: Props) => (
  <HStack flex={1} alignItems="center" justifyContent="center">
    {dots.map(dot => (
      <AnimatedBox
        key={dot.toString()}
        w="$4"
        h="$4"
        rounded="$full"
        ml={dot === 0 ? "$0" : "$3"}
        bg={colors[dot]}
        style={{
          transform: [
            { translateY: dot % 2 === 0 ? translateYEven : translateYOdd },
          ],
        }}
      />
    ))}
  </HStack>
);

export default LoadingView;
