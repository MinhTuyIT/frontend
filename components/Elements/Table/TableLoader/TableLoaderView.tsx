import { Center, Spinner } from "@gluestack-ui/themed";
import React, { ComponentProps } from "react";

const TableLoaderView: React.FC<ComponentProps<typeof Center>> = props => {
  return (
    <Center py="$3" {...props}>
      <Spinner />
    </Center>
  );
};

export default TableLoaderView;
