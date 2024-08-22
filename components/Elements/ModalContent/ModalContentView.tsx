import { styled } from "@gluestack-style/react";
import { Box } from "@gluestack-ui/themed";

/* 
  ISSUE: Can not focus the input into popover
  REFERENCE: https://github.com/gluestack/gluestack-ui/issues/1784
*/

export default styled(
  Box,
  {},
  {
    componentName: "ModalContent",
    ancestorStyle: ["_content"],
  }
);
