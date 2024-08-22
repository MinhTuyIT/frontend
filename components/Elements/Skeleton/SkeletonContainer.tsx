import { View } from "@gluestack-ui/themed";
import React, { ComponentProps, ReactNode, useMemo } from "react";

import Circle from "./Circle";
import Rect from "./Rect";

interface Props
  extends Omit<ComponentProps<typeof View>, "height" | "width" | "w" | "h"> {
  children?: ReactNode;
  loading?: boolean;
  type?: "rect" | "circle";
  height?: string | number;
  width?: string | number;
  radius?: number;
}

const SkeletonContainer = ({
  children,
  loading,
  height,
  width,
  type,
  radius,
  ...props
}: Props) => {
  const Skeleton = useMemo(() => {
    switch (type) {
      case "circle": {
        return (
          <View {...props}>
            <Circle radius={radius} />
          </View>
        );
      }
      default: {
        return (
          <View {...props} w="$full">
            <Rect height={height} width={width} radius={radius} />
          </View>
        );
      }
    }
  }, [height, radius, type, width, props]);

  if (loading) {
    return Skeleton;
  }
  return children;
};

export default SkeletonContainer;
