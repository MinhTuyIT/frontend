import { ApolloError } from "@apollo/client";

import { ConsignorPaymentType } from "@/generated/graphql";

export interface ErrorResponse {
  message?: string;
  errorCode?: string | number;
  errorStatusCode?: string | number;
}

const formatUsername = (usernameStr: string) =>
  usernameStr.length > 6 ? `${usernameStr.substring(0, 6)}....` : usernameStr;

const formatError = (error: unknown) => {
  const graphQLErrors = (error as ApolloError)?.graphQLErrors?.[0] ?? undefined;
  const extensions: any = graphQLErrors?.extensions ?? undefined;
  const originalError = extensions?.originalError ?? undefined;

  const errorResponse: ErrorResponse = {
    message: originalError?.message?.[0] ?? graphQLErrors?.message ?? undefined,
    errorCode: extensions?.code ?? undefined,
    errorStatusCode: originalError?.statusCode ?? undefined,
  };

  return errorResponse;
};

export const uniqueByKey = (arr: { [key: string]: string }[], key: string) => {
  const seen = new Map();

  return arr.reduce((acc: { [key: string]: string }[], obj) => {
    const currentKey = obj[key];

    if (!seen.has(currentKey)) {
      seen.set(currentKey, obj);
      return [...acc, obj];
    }

    return acc;
  }, []);
};

export const formatPaymentMethod = (
  paymentMethod: ConsignorPaymentType | string
) => {
  switch (paymentMethod) {
    case ConsignorPaymentType.Ach:
      return paymentMethod.toUpperCase();
    case ConsignorPaymentType.Paypal:
      return "PayPal";
    default: {
      const lowerCasedPaymentMethod = paymentMethod.toLowerCase();
      return (
        lowerCasedPaymentMethod.charAt(0).toUpperCase() +
        lowerCasedPaymentMethod.slice(1)
      );
    }
  }
};

export const capitalizeEveryWord = (str: string = "") =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

export { formatError, formatUsername };
