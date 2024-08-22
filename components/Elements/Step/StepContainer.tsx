import { useBreakpointValue } from "@gluestack-style/react";
import { ReactNode, useCallback, useMemo, useState } from "react";

import StepView from "./StepView";
import { IStep } from "./components";

interface StepProps {
  steps: IStep[];
  currentIndex?: number;
  children?: ReactNode;
  onChangeIndex?: (index: number) => void;
}

const StepContainer = (props: StepProps) => {
  const { currentIndex = 0, onChangeIndex, steps } = props;
  const [current, onChangeStep] = useState(currentIndex);
  const isSmall = useBreakpointValue({
    base: true,
    md: false,
  });
  const onNextStep = useCallback(() => {
    onChangeStep(current + 1);
    onChangeIndex?.(current + 1);
  }, [current, onChangeIndex]);

  const disableNext = useMemo(() => {
    return (
      steps.findIndex(
        (value, index) => index === current && value.isComplete
      ) === -1
    );
  }, [current, steps]);

  const onPreviousStep = useCallback(() => {
    onChangeStep(current - 1);
    onChangeIndex?.(current - 1);
  }, [current, onChangeIndex]);

  return (
    <StepView
      {...props}
      currentIndex={current}
      onNextStep={onNextStep}
      onPreviousStep={onPreviousStep}
      disableNext={disableNext}
      isSmall={isSmall}
    />
  );
};

export default StepContainer;
