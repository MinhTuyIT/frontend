import { ApolloProvider } from "@apollo/client";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  fromPromise,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import { relayStylePagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";

import { AuthRefreshTokenDocument } from "@/generated/graphql";
import { requestHeadersVar } from "@/utils/cache";
import removeEmptyKeys from "@/utils/removeEmptyKeys";
interface Props {
  children: React.ReactNode;
  authToken?: string | null;
}

type ReturnType = {
  client: ApolloClient<NormalizedCacheObject>;
  clearAuth?: boolean;
};

const ApolloClientContext = React.createContext<ReturnType | undefined>(
  undefined
);

export const useApolloClient = () => React.useContext(ApolloClientContext);

// const defaultPagination = (
//   typeName: string,
//   arrayField: string = "items",
//   additionalKeyArgs?: string[]
// ) => ({
//   keyArgs: [...["type", "filter", "sort"], ...(additionalKeyArgs ?? [])],
//   merge(existing: any, incoming: any) {
//     return {
//       ...(existing ?? {}),
//       ...(incoming ?? {}),
//       [`${arrayField}@type({"name":"${typeName}"})`]: [
//         ...(existing?.[`${arrayField}@type({"name":"${typeName}"})`] ?? []),
//         ...(incoming?.[`${arrayField}@type({"name":"${typeName}"})`] ?? []),
//       ].filter((item, index, self) => {
//         return (
//           !item.__ref || self.findIndex(i => item.__ref === i.__ref) === index
//         );
//       }),
//     };
//   },
// });

const getHeaders: any = async (headers: any) => {
  const { accessToken, idToken } = requestHeadersVar();
  if (accessToken === undefined && idToken === undefined) {
    // the initial auth call has not completed yet, so wait until it has.
    return new Promise(resolve =>
      setTimeout(() => getHeaders(headers).then(resolve), 1000)
    );
  }
  return removeEmptyKeys({
    ...headers,
    "Access-Token": accessToken ? `Bearer ${accessToken}` : "",
    authorization: idToken ? `Bearer ${idToken}` : "",
  });
};

const ApolloClientProvider = ({ children }: Props) => {
  const [clearAuth, setClearAuth] = useState<boolean>();
  const client = useMemo(() => {
    const authLink = setContext(async (_, { headers }) => {
      const newHeaders = await getHeaders(headers);
      return {
        headers: newHeaders,
      };
    });

    const refreshToken = async (_refreshToken?: string | null) => {
      try {
        const response = await client.mutate({
          mutation: AuthRefreshTokenDocument,
          variables: {
            refreshTokenInput: {
              refreshToken: _refreshToken,
            },
          },
        });
        return response.data;
      } catch (err) {
        return null;
      }
    };

    const errorLink = onError(
      ({
        graphQLErrors,
        networkError,
        response: _response,
        operation,
        forward,
      }: ErrorResponse) => {
        if (
          ((networkError as any)?.statusCode === 401 ||
            graphQLErrors?.[0]?.extensions?.code ===
              "UNAUTHORIZED_EXCEPTION") &&
          operation?.operationName !== "ResetPassword" &&
          operation?.operationName !== "AuthSignOut"
        ) {
          // If the error is a 401, we need to refresh the token and try again.
          const { refreshToken: _refreshToken } = requestHeadersVar();
          setClearAuth(false);

          return fromPromise(
            refreshToken(_refreshToken).then(async result => {
              if (result) {
                await AsyncStorage.setItem(
                  "@currentUser",
                  JSON.stringify({
                    auth: {
                      ...result.refreshToken.data,
                      RefreshToken: _refreshToken,
                    },
                  })
                );
                requestHeadersVar(
                  removeEmptyKeys({
                    accessToken:
                      result.refreshToken?.data?.AccessToken ?? undefined,
                    idToken: result?.refreshToken?.data?.IdToken,
                    refreshToken: _refreshToken,
                  })
                );
                const newHeaders = {
                  "Access-Token": result?.refreshToken?.data?.AccessToken,
                  Authorization: `Bearer ${result?.refreshToken?.data?.IdToken}`,
                };
                operation.setContext({
                  headers: newHeaders,
                });
                return true;
              }
              AsyncStorage.removeItem("@currentUser");
              requestHeadersVar({
                accessToken: null,
                idToken: null,
                refreshToken: null,
              });
              router.navigate("/");
              setClearAuth(true);
              return undefined;
            })
          )
            .filter(value => Boolean(value))
            .flatMap(() => {
              return forward(operation);
            });
        }
      }
    );

    const cache = new InMemoryCache({
      resultCacheMaxSize: Math.pow(2, 16), // This is the number of objects stored in memory. It is not the size of the cache. If memory consumption gets to high, lower it from the default (Math.pow(2, 16)).
      typePolicies: {
        Query: {
          fields: {
            listUserCardsByAnaysisStateAndCatalogCardLabelIdsAndCollectionCardTaggingIdsAndYearAndCardNameCreatedAt:
              relayStylePagination([
                "sortDirection",
                "sortBy",
                "tagName",
                "tagValue",
                "analysisState",
              ]),
            listPsetsByBrandIdAndCategoryIdCreatedAt: relayStylePagination([
              "brandId",
              "categoryId",
            ]),
            listUsersByPhoneNumberCreatedAt: relayStylePagination([
              "phoneNumber",
            ]),
            listCardsByYearIdAndBrandIdAndName: relayStylePagination([
              "sortDirection",
              "name",
              "yearId",
              "brandId",
            ]),
            listCardsByProductIdAndName: relayStylePagination([
              "sortDirection",
              "name",
              "productId",
            ]),
            listUserCardTaggings: relayStylePagination(["tagName"]),
          },
        },
      },
    });

    const client = new ApolloClient({
      defaultOptions: {
        watchQuery: {
          errorPolicy: "all",
        },
      },
      link: ApolloLink.from([
        authLink,
        errorLink,
        // metabaseRestLink,
        // retryLink,
        new HttpLink({ uri: process.env.EXPO_PUBLIC_GRAPHQL_BASE_URL }),
      ]),
      cache,
    });

    return {
      client,
      clearAuth,
    };
  }, [clearAuth]);

  return (
    <ApolloClientContext.Provider value={client}>
      <ApolloProvider client={client?.client}>{children}</ApolloProvider>
    </ApolloClientContext.Provider>
  );
};

export { ApolloClientContext, ApolloClientProvider };
