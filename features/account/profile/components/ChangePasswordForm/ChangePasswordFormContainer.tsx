import { useBreakpointValue, useToken } from "@gluestack-style/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import * as yup from "yup";

import ChangePasswordFormView from "./ChangePasswordFormView";

import { minimumPasswordLength, useAuth, usePassword } from "@/features/auth";
import { RegExpPassword } from "@/utils/regexp";
import { MessageError } from "@/utils/validation";

export interface ChangePasswordFormProps {
  doSubmit: () => void;
  loading?: boolean;
  minimumPasswordLength: number;
  passwordStrengthText: string;
  passwordStrengthColor: string | undefined;
  passwordLengthPercentage: number;
  newPassword: string;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isSmall?: string;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmPassword?: boolean;
  isDisabledSubmitBtn?: boolean;
  bgErrorIcon?: string;
  isMobile?: boolean;
  control: Control<any>;
  showOldPassword: boolean;
  setShowOldPassword: React.Dispatch<React.SetStateAction<boolean>>;
  errors: FieldErrors<any>;
  isOpen: boolean;
  onClose: () => void;
  oldPassword?: string;
  onEndSubmitOldPassword?: () => void;
  onEndSubmitNewPassword?: () => void;
  onEndSubmitConfirmPassword?: () => void;
  oldPasswordRef?: React.RefObject<TextInput>;
  newPasswordRef?: LegacyRef<any>;
  confirmPasswordRef?: React.RefObject<TextInput>;
}

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(minimumPasswordLength, MessageError.passwordMin)
    .matches(RegExpPassword, {
      message: MessageError.invalidPw,
    })
    .notOneOf(
      [yup.ref("oldPassword"), ""],
      "The new password must be different from the current password."
    ),
  oldPassword: yup.string().matches(RegExpPassword, {
    message: "Current password is incorrect. Please try again.",
  }),
  confirmNewPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), ""],
      "The passwords you entered do not match. Please ensure that both password fields are the same."
    ),
});
const emptyValue = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ChangePasswordFormContainer = ({ isOpen, onClose }: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const authData = useAuth();
  const { changePassword } = authData ?? {};
  const bgErrorIcon = useToken("colors", "rose600");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    minimumPasswordLength,
    passwordStrengthText,
    passwordStrengthColor,
    passwordLengthPercentage,
  } = usePassword();
  const {
    control,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    clearErrors,
    setError,
  } = useForm({
    defaultValues: emptyValue,
    resolver: yupResolver(schema),
  });

  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const newPassword = watch("newPassword");
  const oldPassword = watch("oldPassword");
  const confirmNewPassword = watch("confirmNewPassword");
  const isDisabledSubmitBtn = useMemo(
    () =>
      Boolean(
        newPassword?.length === 0 ||
          confirmNewPassword?.length === 0 ||
          oldPassword?.length === 0 ||
          isSubmitting
      ),
    [
      confirmNewPassword?.length,
      newPassword?.length,
      oldPassword?.length,
      isSubmitting,
    ]
  );

  const handleClose = useCallback(() => {
    reset(emptyValue);
    onClose();
    setShowOldPassword(false);
    setShowConfirmPassword(false);
    setShowPassword(false);
  }, [onClose, reset]);

  const onSubmit = async (value: any) => {
    console.log("first");
    const res = await changePassword?.({
      oldPassword: value.oldPassword,
      newPassword: value.newPassword,
    });
    if (res?.success) {
      reset(emptyValue);
      handleClose();
    } else {
      if (res?.type === "NotAuthorizedException") {
        setError("oldPassword", {
          message: "Current password is incorrect. Please try again.",
          type: "custom",
        });
      }
    }
  };

  const onEndSubmitOldPassword = useCallback(
    () => newPasswordRef.current?.focus(),
    []
  );
  const onEndSubmitNewPassword = useCallback(
    () => confirmPasswordRef.current?.focus(),
    []
  );

  useEffect(() => {
    if (newPassword?.length === 0) {
      clearErrors("newPassword");
    }
  }, [clearErrors, newPassword]);

  return (
    <ChangePasswordFormView
      control={control}
      isMobile={isMobile}
      minimumPasswordLength={minimumPasswordLength}
      passwordStrengthText={passwordStrengthText(newPassword)}
      passwordStrengthColor={passwordStrengthColor(newPassword)}
      passwordLengthPercentage={passwordLengthPercentage(newPassword)}
      newPassword={newPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showOldPassword={showOldPassword}
      setShowOldPassword={setShowOldPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      isDisabledSubmitBtn={isDisabledSubmitBtn}
      bgErrorIcon={bgErrorIcon}
      errors={errors}
      doSubmit={handleSubmit(onSubmit)}
      isOpen={isOpen}
      onClose={handleClose}
      oldPassword={oldPassword}
      newPasswordRef={newPasswordRef}
      onEndSubmitOldPassword={onEndSubmitOldPassword}
      onEndSubmitNewPassword={onEndSubmitNewPassword}
      confirmPasswordRef={confirmPasswordRef}
    />
  );
};

export default ChangePasswordFormContainer;
