import React from "react";
import ContentLoader from "react-content-loader";

interface Props {
  height?: string | number;
  width?: string | number;
  radius?: number;
}

const RectView = ({ height = 48, width = "100%", radius = 10 }: Props) => {
  return (
    <ContentLoader
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      height={height}
      width={width}
    >
      <rect rx={radius} ry={radius} height={height} width={width} />
    </ContentLoader>
  );
};

export default RectView;
