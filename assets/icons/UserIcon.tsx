import { createIcon } from "@gluestack-ui/themed";
import { G, Path } from "react-native-svg";

export const UserIcon = (color?: string) =>
  createIcon({
    viewBox: "0 0 11.225 12.628",
    path: (
      <G id="_042-user" data-name="042-user" transform="translate(-22 -18)">
        <Path
          id="Path_10372"
          data-name="Path 10372"
          d="M41.613,20.806a2.806,2.806,0,1,0-2.806,2.806A2.809,2.809,0,0,0,41.613,20.806Zm-4.811,0a2,2,0,1,1,2,2A2.008,2.008,0,0,1,36.8,20.806Z"
          transform="translate(-11.194)"
          fill={color}
          strokeWidth={0}
        />
        <Path
          id="Path_10373"
          data-name="Path 10373"
          d="M22,55.338v1.275a.4.4,0,0,0,.4.4H32.824a.4.4,0,0,0,.4-.4V55.338A4.343,4.343,0,0,0,28.887,51h-2.55A4.343,4.343,0,0,0,22,55.338ZM26.338,51.8h2.55a3.539,3.539,0,0,1,3.536,3.536v.874H22.8v-.874A3.539,3.539,0,0,1,26.338,51.8Z"
          transform="translate(0 -26.385)"
          fill={color}
          strokeWidth={0}
        />
      </G>
    ),
  });
