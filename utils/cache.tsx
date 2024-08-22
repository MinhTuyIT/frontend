import { makeVar } from "@apollo/client";

import { AuthenticationResult } from "@/generated/graphql";
// import { Auth } from "generated/graphql";

interface IRequestHeadersVar {
  refreshToken?: string | null | undefined;
  idToken?: string | null | undefined;
  // metabaseSessionId?: string | null | undefined;s
  accessToken?: string | null | undefined;
}

export type RefreshToken = () => Promise<AuthenticationResult | undefined>;

export const refreshTokenVar = makeVar<RefreshToken | null | undefined>(
  undefined
);

export const isDrawerExpandedVar = makeVar<boolean>(true);
export const requestHeadersVar = makeVar<IRequestHeadersVar>({});
