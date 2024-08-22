import { useBreakpointValue } from "@gluestack-ui/themed";

import InputView, { InputViewProps } from "./InputView";

const InputContainer = (props: InputViewProps) => {
  const breakpointHeight = useBreakpointValue({ base: 38, md: 48 });

  return <InputView breakpointHeight={breakpointHeight} {...props} />;
};

export default InputContainer;
