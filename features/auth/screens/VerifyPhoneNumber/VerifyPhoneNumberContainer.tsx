import React, { useCallback, useEffect, useRef, useState } from "react";

import VerifyPhoneNumberView from "./VerifyPhoneNumberView";
import { ConfirmSignInResult, useAuth } from "../..//providers/Auth";
import { ConfirmationCodeFieldRef } from "../../components/ConfirmationCodeField";

import { useAuthResendVerifyIdentifierMutation } from "@/generated/graphql";
import useDebounceCallback from "@/hooks/useDebounceCallback";
import useToastMessage from "@/hooks/useToastMessage";
import { formatError } from "@/utils/format";

interface Props {
  onNext: () => void;
  onSessionChange: (session: string) => void;
  countryCode: string;
  phoneNumber: string;
  session: string;
}

const OTP_LENGTH = 6;
const DEFAULT_ERROR_MESSAGE =
  "The verification code is not valid, please request a new one";

const VerifyPhoneNumberContainer: React.FC<Props> = ({
  onNext,
  onSessionChange,
  countryCode,
  phoneNumber,
  session,
}) => {
  const toast = useToastMessage();
  const [resendOTP] = useAuthResendVerifyIdentifierMutation();
  const codeFieldRef = useRef<ConfirmationCodeFieldRef>(null);
  const [otpValue, setOtpValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const authData = useAuth();
  const { confirmSignIn } = authData ?? {};
  const sessionRef = useRef<string>(session);

  const toastErrorMessage = useCallback(() => {
    toast.show({
      description: DEFAULT_ERROR_MESSAGE,
      action: "error",
    });
  }, [toast]);

  const displayErrorMessageAndFocus = useCallback(() => {
    setErrorMessage(DEFAULT_ERROR_MESSAGE);
    codeFieldRef.current?.onFocus?.();
  }, []);

  const handleNetworkError = useCallback(() => {
    setOtpValue("");
    toast.show({
      description: "There has been an error, please try again",
      action: "error",
    });
  }, [toast]);

  const resetOtpOrSession = useCallback(
    (newSession: string | null) => {
      if (newSession) {
        onSessionChange(newSession);
        displayErrorMessageAndFocus();
      } else {
        setOtpValue("");
        toastErrorMessage();
      }
    },
    [onSessionChange, toastErrorMessage, displayErrorMessageAndFocus]
  );

  const notifySuccessAndProceed = useCallback(() => {
    toast.closeAll();
    setTimeout(() => {
      toast.show({
        description: "Your phone number has been verified",
        action: "success",
      });
      onNext();
    }, 200);
  }, [onNext, toast]);

  const processSignIn = useCallback(
    async (value: string) => {
      return await confirmSignIn?.({
        otpCode: value,
        identifier: `${countryCode}${phoneNumber}`,
        session: sessionRef.current,
      });
    },
    [confirmSignIn, countryCode, phoneNumber]
  );

  const handleSignInResult = useCallback(
    (result: ConfirmSignInResult | undefined) => {
      if (!result) return;

      const { success, session: newSession } = result;
      if (!success) {
        resetOtpOrSession(newSession);
      } else {
        notifySuccessAndProceed();
      }
    },
    [resetOtpOrSession, notifySuccessAndProceed]
  );

  const handleFinished = useCallback(
    async (value: string) => {
      if (value.length < OTP_LENGTH) return displayErrorMessageAndFocus();
      try {
        setIsSubmitting(true);
        const result = await processSignIn(value);
        handleSignInResult(result);
      } catch (error) {
        handleNetworkError();
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      processSignIn,
      handleSignInResult,
      handleNetworkError,
      displayErrorMessageAndFocus,
    ]
  );

  const handleSubmit = useCallback(
    () => handleFinished(otpValue),
    [handleFinished, otpValue]
  );

  const handleOtpChange = useCallback(async (value: string) => {
    setErrorMessage("");
    const withoutSpace = value.replaceAll(/\s/g, "");
    if (
      (/^[0-9]+$/.test(withoutSpace) && withoutSpace.length <= OTP_LENGTH) ||
      !value
    ) {
      setOtpValue(withoutSpace);
    }
  }, []);

  const handleResendCode = useCallback(async () => {
    try {
      const response = await resendOTP({
        variables: { input: { identifier: `${countryCode}${phoneNumber}` } },
      });
      setOtpValue("");
      onSessionChange(response?.data?.resendOTP?.data?.Session ?? "");
      codeFieldRef.current?.onFocus?.();
      toast.show({ description: "Code sent", action: "success" });
    } catch (error) {
      const { message, errorCode } = formatError(error);
      if (errorCode === "OTP_SPAM_PREVENTION_EXCEPTION") {
        setOtpValue("");
        codeFieldRef.current?.onFocus?.();
        toast.show({ description: "Code sent", action: "success" });
      } else {
        toast.show({
          description: message || "There has been an error, please try again",
          action: "error",
        });
      }
    }
  }, [countryCode, onSessionChange, phoneNumber, resendOTP, toast]);

  const handleDebounceResendCode = useDebounceCallback(handleResendCode, 1000);
  const handleDebounceSubmit = useDebounceCallback(handleSubmit, 200);

  useEffect(() => {
    if (otpValue === "") {
      setErrorMessage("");
      codeFieldRef.current?.onFocus?.();
    }
  }, [otpValue]);

  useEffect(() => {
    /**
     * Prevent re-render caused by session changes.
     * handleFinished has session as a dependency.
     */
    sessionRef.current = session;
  }, [session]);

  return (
    <VerifyPhoneNumberView
      otpLength={OTP_LENGTH}
      isSubmitting={isSubmitting}
      submitDisabled={otpValue.length === 0 || isSubmitting}
      otpValue={otpValue}
      codeFieldRef={codeFieldRef}
      errorMessage={errorMessage}
      onSubmit={handleDebounceSubmit}
      onFinished={handleFinished}
      onChange={handleOtpChange}
      onResendCode={handleDebounceResendCode}
    />
  );
};

export default VerifyPhoneNumberContainer;
