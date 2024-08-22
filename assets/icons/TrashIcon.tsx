import { createIcon } from "@gluestack-ui/themed";
import React from "react";
import { G, Path } from "react-native-svg";

const TrashIcon = (color = "#EB001B") =>
  createIcon({
    viewBox: "0 0 13.206 13.969",
    path: (
      <G id="trash-2_outline" transform="translate(-31.5 -23.5)">
        <Path
          id="Path_10002"
          d="M36.577,29.34v4.577m3.051-4.577v4.577m3.051-7.629v9.154a1.526,1.526,0,0,1-1.526,1.526h-6.1a1.526,1.526,0,0,1-1.526-1.526V26.289m-1.526,0H44.206m-3.814,0v-.763A1.526,1.526,0,0,0,38.866,24H37.34a1.526,1.526,0,0,0-1.526,1.526v.763"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </G>
    ),
  });
export default TrashIcon;
