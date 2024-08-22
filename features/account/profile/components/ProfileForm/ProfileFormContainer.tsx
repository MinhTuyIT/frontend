import { useBreakpointValue, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect } from "expo-router";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as yup from "yup";

import ProfileFormView, { ProfileInput } from "./ProfileFormView";

import {
  AuthMeQuery,
  useAccountManagementUpdateMeMutation,
} from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import { formatError } from "@/utils/format";
import {
  ErrorCodeKeys,
  getMessageFromErrorCode,
} from "@/utils/getMessageFromErrorCode";
import { RegExpEmail } from "@/utils/regexp";
import { MessageError } from "@/utils/validation";

interface Props {
  data?: AuthMeQuery;
  refetch: () => void;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email(MessageError.invalidEmail)
    .required("Primary email is required.")
    .matches(RegExpEmail, {
      message: MessageError.invalidEmail,
    }),
  secondaryEmail: yup
    .string()
    .email(MessageError.invalidEmail)
    .nullable()
    .notRequired()
    .test(
      "is-valid-email",
      MessageError.invalidEmail,
      value => !value || RegExpEmail.test(value)
    )
    .test(
      "is-unique-email",
      "The secondary email must be different from the primary email.",
      (value, context) => {
        return !value || value !== context.parent.email;
      }
    ),
  firstName: yup.string().notRequired(),
  lastName: yup.string().notRequired(),
  phoneNumber: yup
    .string()
    .notRequired()
    .nullable()
    .test("Phone Validate", "Please enter a valid phone number.", value => {
      return !value || isValidPhoneNumber(`+${value}`);
    }),
});

const ProfileFormContainer = forwardRef(({ data, refetch }: Props, ref) => {
  const isSmall = useBreakpointValue({ base: true, sm: true, md: false });
  const currentUser = useMemo(() => data?.me, [data]);
  const [updateMe, { loading }] = useAccountManagementUpdateMeMutation();
  const toast = useToastMessage();
  const defaultValue: ProfileInput = useMemo(
    () => ({
      email: currentUser?.email || "",
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      phoneNumber: currentUser?.consignor?.phone?.replace("+", "") || "",
      secondaryEmail: currentUser?.consignor?.secondaryEmail || "",
    }),
    [currentUser]
  );
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<ProfileInput>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValue,
  });
  const emailRef = useRef<TextInput>(null);

  const onSubmit = useCallback(
    async (values: ProfileInput) => {
      const { secondaryEmail, phoneNumber, email: _, ...rest } = values;
      try {
        await updateMe({
          variables: {
            input: {
              ...rest,
              consignor: {
                secondaryEmail: secondaryEmail || null,
                phone: phoneNumber?.length ? `+${phoneNumber}` : null,
              },
            },
          },
        });
        refetch();
        toast.show({
          description: "Profile was updated successfully.",
          action: "success",
        });
      } catch (error) {
        const { message, errorCode } = formatError(error);
        toast.show({
          description:
            getMessageFromErrorCode(errorCode as ErrorCodeKeys) ??
            message ??
            "There has been an error, please try again",
          action: "error",
        });
      }
    },
    [refetch, toast, updateMe]
  );
  const doSubmit = handleSubmit(onSubmit);

  const resetValue = useCallback(() => {
    reset(defaultValue);
  }, [defaultValue, reset]);

  useImperativeHandle(
    ref,
    () => {
      return {
        handleUpdateMe: doSubmit,
        handleCancelUpdateMe: resetValue,
        loading: () => loading,
      };
    },
    [doSubmit, loading, resetValue]
  );

  useEffect(() => {
    resetValue();
  }, [currentUser, reset, resetValue]);

  useFocusEffect(
    React.useCallback(() => {
      emailRef.current?.focus();
      return () => {
        resetValue();
      };
    }, [resetValue])
  );
  return (
    <VStack>
      <ProfileFormView
        control={control}
        errors={errors}
        isValid={isValid}
        onCancel={reset}
        isSmall={isSmall}
        loading={loading || isSubmitting}
        defaultValue={defaultValue}
        handleUpdateMe={doSubmit}
        isDirty={isDirty}
        emailRef={emailRef}
        fetchLoading={!currentUser}
      />
    </VStack>
  );
});
ProfileFormContainer.displayName = "ProfileFormContainer";

export default ProfileFormContainer;
