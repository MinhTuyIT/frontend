import { ReactNode } from "react";

export interface iProps {
  children: ReactNode;
}

const MainAccountContainer = ({ children }: iProps) => {
  //   const isMobile = useBreakpointValue({ base: true, md: false });
  return children;
  //   return <ScrollView stickyHeaderIndices={[1]}>{children}</ScrollView>;
};

export default MainAccountContainer;
