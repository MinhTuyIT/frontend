const ErrorCode = {
  COGNITO_NOT_AUTHORIZED_EXCEPTION: "Password is incorrect. Please try again",
  COGNITO_USER_NOT_FOUND_EXCEPTION: "Email is incorrect. Please try again",
  COGNITO_USER_ALREADY_EXIST_EXCEPTION:
    "Email already exists. Please log in or sign up with a different email",
  EMAIL_EXIST:
    "Email already exists. Please log in to your existing account or use a different email.",
};

export type ErrorCodeKeys = keyof typeof ErrorCode;

export const getMessageFromErrorCode = (code: ErrorCodeKeys) => {
  return ErrorCode[code] ?? undefined;
};
