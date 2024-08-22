import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import React, { memo } from "react";

export interface StepItemViewProps {
  title: string;
  isComplete: boolean;
  isSmall: boolean;
  index: number;
  key: string;
  bg: string;
  bgLineLeft: string;
  bgLineRight: string;
  color: string;
  borderWidth: number;
}
const StepItemView = ({
  bg,
  key,
  title,
  index,
  color,
  isComplete,
  bgLineLeft,
  borderWidth,
  bgLineRight,
}: StepItemViewProps) => (
  <VStack key={key} flex={1} justifyContent="center" alignItems="center">
    <HStack justifyContent="center" alignItems="center" h={30} w="$full">
      <VStack
        h={30}
        w={30}
        rounded={15}
        borderWidth={borderWidth}
        mb="$2"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        zIndex={1}
        bg={bg}
      >
        {isComplete ? (
          <MaterialCommunityIcons name="check" size={20} color={color} />
        ) : (
          <Text fontSize="$xs" fontFamily="$bodyBold" color={color}>
            {index + 1}
          </Text>
        )}
      </VStack>
      <HStack flex={1}>
        <VStack h="$1" flex={1} bg={bgLineLeft} />
        <VStack h="$1" flex={1} bg={bgLineRight} />
      </HStack>
    </HStack>
    <Text flex={1} fontSize="$xs" textAlign="center">
      {title}
    </Text>
  </VStack>
);

export default memo(StepItemView);
