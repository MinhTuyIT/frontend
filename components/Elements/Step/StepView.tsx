import { HStack, VStack } from "@gluestack-ui/themed";
import React, { ReactNode, memo } from "react";

import { IStep, StepItem } from "./components";
import Button from "../Button";

interface StepViewProps {
  currentIndex: number;
  disableNext: boolean;
  isSmall: boolean;
  onNextStep: () => void;
  onPreviousStep: () => void;
  children?: ReactNode;
  steps: IStep[];
}
const StepView = ({
  children,
  currentIndex,
  onNextStep,
  onPreviousStep,
  steps,
  disableNext,
  isSmall,
}: StepViewProps) => (
  <VStack flex={1} mb="$10">
    <HStack width="$full">
      {steps.map((item, index) => {
        return (
          <StepItem
            currentIndex={currentIndex}
            item={item}
            index={index}
            steps={steps.length}
            key={`step_consignment_${index}`}
          />
        );
      })}
    </HStack>
    <VStack flex={1}>{children}</VStack>
    <HStack
      mt="$4"
      gap="$4"
      mx="$9"
      flexDirection={isSmall ? "column-reverse" : undefined}
    >
      {currentIndex !== 0 && (
        <Button
          isDisabled={currentIndex === 0}
          label="Previous"
          variant="outline"
          minWidth={120}
          onPress={onPreviousStep}
          mr="$3"
        />
      )}
      <Button
        label="next"
        minWidth={120}
        onPress={onNextStep}
        isDisabled={disableNext}
      />
    </HStack>
  </VStack>
);

export default memo(StepView);
