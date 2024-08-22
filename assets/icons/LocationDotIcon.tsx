import { createIcon } from "@gluestack-ui/themed";
import { Path } from "react-native-svg";

export const LocationDotIcon = (color?: string) =>
  createIcon({
    viewBox: "0 0 17.204 20.894",
    path: (
      <Path
        id="Path_10174"
        d="M29.089,20.386c2.4-2.2,7.315-7.329,7.315-12.321A8.346,8.346,0,0,0,27.8,0a8.346,8.346,0,0,0-8.6,8.064c0,4.992,4.915,10.117,7.315,12.321A1.886,1.886,0,0,0,29.089,20.386ZM27.8,11.828A3.226,3.226,0,1,0,24.576,8.6,3.226,3.226,0,0,0,27.8,11.828Z"
        transform="translate(-19.2)"
        fill={color}
        fillRule="evenodd"
        strokeWidth={0}
      />
    ),
  });
