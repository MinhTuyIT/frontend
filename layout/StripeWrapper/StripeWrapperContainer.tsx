import { ReactNode } from "react";
import StripeWrapperView from "./StripeWrapperView";

export interface ChildrenProps {
  children: ReactNode;
}

const StripeWrapperContainer = ({ children }: ChildrenProps) => {
  return <StripeWrapperView>{children}</StripeWrapperView>;
};

export default StripeWrapperContainer;
