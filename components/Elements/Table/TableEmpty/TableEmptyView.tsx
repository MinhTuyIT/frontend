import { Center, Image } from "@gluestack-ui/themed";
import React, { ComponentProps } from "react";

interface Props
  extends Pick<ComponentProps<typeof Image>, "size" | "source" | "alt"> {}

const TableEmptyView: React.FC<Props> = ({ size, source, alt }) => (
  <Center flex={1}>
    <Image
      source={source ?? { uri: "/images/user-card-empty.png" }}
      size={size}
      resizeMode="contain"
      alt={alt ?? "No Cards in your collection"}
    />
  </Center>
);

export default TableEmptyView;
