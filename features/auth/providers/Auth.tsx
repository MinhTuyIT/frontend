/* eslint-disable max-lines */
import {
  ChangePasswordCommand,
  ChangePasswordCommandInput,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmForgotPasswordCommandInput,
  ForgotPasswordCommand,
  ForgotPasswordCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo } from "react";
import { ReadableStream } from "web-streams-polyfill";

import {
  AuthAuthenticationResultFragment,
  ConfirmSignInResult,
  useAuthRefreshTokenMutation,
  useAuthSignInMutation,
  useAuthSignOutMutation,
  useAuthSignupMutation,
} from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import { useApolloClient } from "@/providers/ApolloClient";
import { requestHeadersVar } from "@/utils/cache";
import { formatError } from "@/utils/format";
import {
  ErrorCodeKeys,
  getMessageFromErrorCode,
} from "@/utils/getMessageFromErrorCode";
import removeEmptyKeys from "@/utils/removeEmptyKeys";
import { MessageSuccess } from "@/utils/validation";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
(globalThis as any).ReadableStream = ReadableStream;

interface Props {
  children: React.ReactNode;
}

interface Value {
  signIn: (countryCode: string, phoneNumber: string) => Promise<string>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<string>;
  forgotPassword: (email: string) => Promise<{
    success: boolean;
  }>;
  confirmForgotPassword: (
    user: string,
    password: string,
    confirmationCode: string
  ) => Promise<{
    success: boolean;
  }>;
  changePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<{
    success: boolean;
    type: string;
  }>;
  auth: AuthAuthenticationResultFragment | null | undefined;
  loading?: boolean;
}

const AuthContext = React.createContext<Value | null>(null);

// This hook can be used to access the auth info.
export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
  const toast = useToastMessage();
  const [signIn] = useAuthSignInMutation();
  const [signOut, { client }] = useAuthSignOutMutation();
  const [signUp] = useAuthSignupMutation();
  const [refreshToken] = useAuthRefreshTokenMutation();
  const apollo = useApolloClient();

  const [auth, setAuth] = React.useState<
    AuthAuthenticationResultFragment | null | undefined
  >(undefined);

  const initializeAuthData = useCallback(
    (auth: AuthAuthenticationResultFragment) => {
      const { ...authData } = auth;
      const consolidatedAuthData = {
        ...authData,
        idToken: authData?.IdToken,
      };
      requestHeadersVar(
        removeEmptyKeys({
          accessToken: authData?.AccessToken ?? undefined,
          // metabaseSessionId: authData.data.metabaseSessionId,
          idToken: authData?.IdToken,
          refreshToken: authData?.RefreshToken ?? undefined,
        })
      );

      return Promise.all([
        AsyncStorage.setItem(
          "@currentUser",
          JSON.stringify({
            auth: consolidatedAuthData,
          })
        ),
        setAuth(auth),
      ]);
    },
    []
  );

  const handleSignIn = useCallback(
    (email: string, password: string) =>
      new Promise((resolve: (data: string) => void, reject) => {
        signIn({
          variables: {
            signInInput: { identifier: email, password },
          },
        })
          .then(async data => {
            const signIn = data.data?.signIn as unknown as ConfirmSignInResult;
            resolve(signIn.data.RefreshToken ?? "");
            requestHeadersVar(
              removeEmptyKeys({
                accessToken: signIn.data?.AccessToken ?? undefined,
                idToken: signIn.data?.IdToken,
                refreshToken: signIn.data?.RefreshToken ?? undefined,
              })
            );
            toast.show({
              description: MessageSuccess.signIn,
              action: "success",
            });
            await initializeAuthData({ ...signIn.data });
            return {
              success: true,
              session: null,
            };
          })
          .catch(error => {
            const { message } = formatError(error);
            toast.show({
              description:
                "The email or password is incorrect. Please try again",
              action: "error",
            });
            reject(message);
          });
      }),
    [initializeAuthData, signIn, toast]
  );

  const handleSignOut = useCallback(
    async (isTokenExpire?: boolean) => {
      try {
        await signOut();
        toast.show({
          description: isTokenExpire
            ? "Your session has expired, please login again"
            : "You’ve successfully logged out",
          action: "success",
        });
      } catch (error) {
        // Optional: Handle specific error cases if needed
      } finally {
        await client.clearStore().catch(() => undefined);
        await AsyncStorage.removeItem("@currentUser");
        setAuth(null);
        requestHeadersVar({
          accessToken: null,
          idToken: null,
          refreshToken: null,
        });
        router.navigate("/");
      }
    },
    [signOut, toast, client]
  );

  const handleSignUp = useCallback(
    (email: string, password: string) =>
      signUp({
        variables: {
          signUpInput: {
            email,
            password,
          },
        },
      })
        .then(data => {
          const signUp = data.data?.signUp as unknown as {
            message: string;
          };
          toast.show({
            description: MessageSuccess.signUp,
          });
          router.push("/sign-in");
          return signUp.message;
        })
        .catch(error => {
          const { message, errorCode } = formatError(error);
          toast.show({
            description:
              getMessageFromErrorCode(errorCode as ErrorCodeKeys) ??
              message ??
              "There has been an error, please try again",
            action: "error",
          });
          return { errorCode };
        }),
    [signUp, toast]
  );
  const handleForgotPassword = useCallback(
    async (email: string) => {
      const indentityClient = new CognitoIdentityProviderClient({
        region: process.env.EXPO_PUBLIC_REGION,
      });
      const forgotPasswordCommand = new ForgotPasswordCommand({
        Username: email,
        ClientId: process.env.EXPO_PUBLIC_AWS_CLIENT_ID,
      } as ForgotPasswordCommandInput);

      return await indentityClient
        .send(forgotPasswordCommand)
        .then(response => {
          return { success: !!response };
        })
        .catch(error => {
          if (error["__type"] === "LimitExceededException")
            toast.show({
              description:
                "You have reached the limit for password changes. Please try after some time.",
              action: "error",
            });
          else
            toast.show({
              description: "There has been an error, please try again",
              action: "error",
            });
          return {
            success: false,
          };
        });
    },
    [toast]
  );

  const handleConfirmForgotPassword = useCallback(
    async (user: string, password: string, confirmationCode: string) => {
      const indentityClient = new CognitoIdentityProviderClient({
        region: process.env.EXPO_PUBLIC_REGION,
      });
      const forgotPasswordCommand = new ConfirmForgotPasswordCommand({
        ClientId: process.env.EXPO_PUBLIC_AWS_CLIENT_ID,
        ConfirmationCode: confirmationCode,
        Password: password,
        Username: user,
      } as ConfirmForgotPasswordCommandInput);

      return await indentityClient
        .send(forgotPasswordCommand)
        .then(response => {
          return {
            success: !!response,
          };
        })
        .catch(() => {
          toast.show({
            description: "There has been an error, please try again",
            action: "error",
          });
          return {
            success: false,
          };
        });
    },
    [toast]
  );

  const changePasswordPromise = useCallback(
    async ({
      oldPassword,
      newPassword,
      accessToken,
    }: {
      oldPassword: string;
      newPassword: string;
      accessToken: string;
    }) => {
      const indentityClient = new CognitoIdentityProviderClient({
        region: process.env.EXPO_PUBLIC_REGION,
      });

      const changePasswordCommand = new ChangePasswordCommand({
        PreviousPassword: oldPassword,
        ProposedPassword: newPassword,
        AccessToken: accessToken,
      } as ChangePasswordCommandInput);
      return indentityClient.send(changePasswordCommand).then(response => {
        toast.show({
          description: MessageSuccess.changePassword,
          action: "success",
        });
        return { success: !!response };
      });
    },
    [toast]
  );

  const handleChangePassword = useCallback(
    async ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    }) => {
      return await changePasswordPromise({
        oldPassword,
        newPassword,
        accessToken: auth?.AccessToken as string,
      }).catch(async error => {
        const { message, __type } = error;
        if (message === "Access Token has expired") {
          return refreshToken({
            variables: {
              refreshTokenInput: {
                refreshToken: auth?.RefreshToken as string,
              },
            },
          })
            .then(res => {
              const { data } = res;
              return changePasswordPromise({
                oldPassword,
                newPassword,
                accessToken: data?.refreshToken?.data?.AccessToken as string,
              });
            })
            .catch(() => {
              handleSignOut(true);
            });
        } else {
          if (__type === "LimitExceededException") {
            toast.show({
              description:
                "You have reached the limit for password changes. Please try after some time.",
              action: "error",
            });
          } else if (__type !== "NotAuthorizedException") {
            toast.show({
              description:
                message ?? "There has been an error, please try again",
              action: "error",
            });
          }
        }
        return {
          success: false,
          type: __type,
        };
      });
    },
    [toast, auth, changePasswordPromise, handleSignOut, refreshToken]
  );

  const value: Value = useMemo(
    () => ({
      signIn: handleSignIn,
      signOut: handleSignOut,
      signUp: handleSignUp,
      forgotPassword: handleForgotPassword,
      confirmForgotPassword: handleConfirmForgotPassword,
      changePassword: handleChangePassword,
      auth,
    }),
    [
      auth,
      handleConfirmForgotPassword,
      handleForgotPassword,
      handleSignIn,
      handleSignOut,
      handleSignUp,
      handleChangePassword,
    ]
  );

  const isLoaded = auth !== undefined;

  // Restore the auth info from the local storage.
  useEffect(() => {
    if (!isLoaded) {
      AsyncStorage.getItem("@currentUser").then(dataString => {
        if (dataString && dataString !== "undefined") {
          const { auth } = JSON.parse(dataString);
          if (!!auth) {
            initializeAuthData(auth);
          } else {
            // The local storage data is corrupt
            setAuth(null);
            requestHeadersVar({
              accessToken: null,
              // metabaseSessionId: null,
              idToken: null,
              refreshToken: null,
            });
          }
        } else {
          setAuth(null);
          requestHeadersVar({
            accessToken: null,
            // metabaseSessionId: null,
            idToken: null,
            refreshToken: null,
          });
        }
      });
    }
  }, [isLoaded, initializeAuthData]);
  useEffect(() => {
    if (apollo?.clearAuth) {
      setAuth(null);
    }
  }, [apollo?.clearAuth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
