import { useBreakpointValue } from "@gluestack-style/react";
import React from "react";
import RequestResetPasswordView, {
  RequestResetPasswordViewProps,
} from "./RequestRestPasswordView";

const ForgotPasswordContainer = (props: RequestResetPasswordViewProps) => {
  const isSmall = useBreakpointValue({
    base: true,
    md: false,
  });

  return <RequestResetPasswordView {...props} isSmall={isSmall} />;
};

export default ForgotPasswordContainer;
