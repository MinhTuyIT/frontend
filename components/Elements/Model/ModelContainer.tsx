import { useBreakpointValue } from "@gluestack-style/react";

import ModelView, { ModelViewProps } from "./ModelView";

const ModelContainer = (props: ModelViewProps) => {
  const isSmall = useBreakpointValue({ base: true, md: false });

  return <ModelView {...props} isSmall={isSmall} />;
};

export default ModelContainer;
