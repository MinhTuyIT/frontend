import { createIcon } from "@gluestack-ui/themed";
import React from "react";
import { Path } from "react-native-svg";

const EditIcon = (color = "#002B5C") =>
  createIcon({
    viewBox: "0 0 13.25 13.25",
    path: (
      <Path
        id="Path_10001"
        d="M42.088,29.044l2.162-2.162L41.368,24l-2.162,2.162m2.882,2.882L34.882,36.25H32V33.368l7.206-7.206m2.882,2.882-2.882-2.882"
        transform="translate(-31.5 -23.5)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    ),
  });
export default EditIcon;
