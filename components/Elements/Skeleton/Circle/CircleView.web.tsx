import React from "react";
import ContentLoader from "react-content-loader";

interface Props {
  radius?: number;
}

const CircleView = ({ radius = 20 }: Props) => {
  return (
    <ContentLoader
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      height={radius * 2}
      width={radius * 2}
    >
      <circle cx={radius} cy={radius} r={radius} />
    </ContentLoader>
  );
};

export default CircleView;
