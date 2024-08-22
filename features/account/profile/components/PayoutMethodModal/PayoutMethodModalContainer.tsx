/* eslint-disable max-lines */
import { useBreakpointValue } from "@gluestack-style/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native";
import * as Yup from "yup";

import PayoutMethodModalView from "./PayoutMethodModalView";

import {
  AccountType,
  CreatePayoutMethodInput,
  PayoutMethodDetailInput,
  PayoutType,
  useAccountManagementCreatePayoutMethodMutation,
  useAccountManagementGetPayoutMethodQuery,
  useAccountManagementUpdatePayoutMethodMutation,
} from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import { RegExpEmail } from "@/utils/regexp";
import { MessageError, MessageRequired } from "@/utils/validation";
interface PayoutMethodModalContainerProps {
  isOpen: boolean;
  handleRefetchListPayoutMethods: () => void;
  editPayoutMethodId: string;
  onClose: () => void;
}

const schema = Yup.object().shape({
  type: Yup.string().required("Payment type is required"),
  detail: Yup.object().when("type", ([type], schema) => {
    return schema.shape({
      email: Yup.string().when("type", (_, schema) => {
        return PayoutType.Paypal === type
          ? schema
              .email(MessageError.invalidEmail)
              .required(MessageRequired.requiredEmail)
              .matches(RegExpEmail, {
                message: MessageError.invalidEmail,
              })
          : schema.notRequired();
      }),
      bankAddress: Yup.string().when("type", (_, schema) => {
        return PayoutType.Wire === type
          ? schema.required("Bank address is required")
          : schema.notRequired();
      }),
      accountType: Yup.string().when("type", (_, schema) => {
        return ![PayoutType.Check, PayoutType.Paypal].includes(type)
          ? schema.required("Account type is required")
          : schema.notRequired();
      }),
      accountNumber: Yup.string().when("type", (_, schema) => {
        return ![PayoutType.Check, PayoutType.Paypal].includes(type)
          ? schema.required("Account number is required")
          : schema.notRequired();
      }),
      bankName: Yup.string().when("type", (_, schema) => {
        return ![PayoutType.Check, PayoutType.Paypal].includes(type)
          ? schema.required("Bank name is required")
          : schema.notRequired();
      }),
      routingNumber: Yup.string().when("type", (_, schema) => {
        return ![PayoutType.Check, PayoutType.Paypal].includes(type)
          ? schema.required("Routing number is required")
          : schema.notRequired();
      }),
    });
  }),
});

const initialEmptyValue = {
  type: null,
  detail: {
    accountNumber: "",
    accountType: AccountType.Checking,
    bankAddress: "",
    bankName: "",
    email: "",
    routingNumber: "",
  },
};

const PayoutMethodModalContainer = ({
  isOpen,
  handleRefetchListPayoutMethods,
  editPayoutMethodId,
  onClose,
}: PayoutMethodModalContainerProps) => {
  const isBrowserMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToastMessage();

  const [createPayoutMethod, { loading: createPayoutLoading }] =
    useAccountManagementCreatePayoutMethodMutation();
  const [updatePayoutMethod, { loading: updatePayoutLoading }] =
    useAccountManagementUpdatePayoutMethodMutation();
  const { data: payoutMethodDetail, loading: payoutMethodDetailLoading } =
    useAccountManagementGetPayoutMethodQuery({
      variables: {
        getPayoutMethodId: editPayoutMethodId,
      },
      skip: !editPayoutMethodId,
    });
  const defaultValue = useMemo(
    () =>
      editPayoutMethodId
        ? {
            type: payoutMethodDetail?.getPayoutMethod.type,
            detail: {
              accountNumber:
                payoutMethodDetail?.getPayoutMethod.detail?.accountNumber ?? "",
              accountType:
                payoutMethodDetail?.getPayoutMethod.detail?.accountType ||
                AccountType.Checking,
              bankAddress:
                payoutMethodDetail?.getPayoutMethod.detail?.bankAddress ?? "",
              bankName:
                payoutMethodDetail?.getPayoutMethod.detail?.bankName ?? "",
              email: payoutMethodDetail?.getPayoutMethod.detail?.email ?? "",
              routingNumber:
                payoutMethodDetail?.getPayoutMethod.detail?.routingNumber ?? "",
            },
          }
        : initialEmptyValue,
    [editPayoutMethodId, payoutMethodDetail?.getPayoutMethod]
  );
  const bankNameRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isLoading },
  } = useForm<CreatePayoutMethodInput>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: defaultValue,
  });
  const payoutMethod = watch("type");
  const formValues = watch();
  const isShowField = useCallback(
    (fieldName: string) => {
      if (!payoutMethod) return false;
      if (payoutMethod === PayoutType.Paypal) {
        return fieldName === "email";
      } else {
        if (fieldName === "email") return false;
        if (payoutMethod === PayoutType.Check) return false;
        if (payoutMethod === PayoutType.Ach && fieldName === "bankAddress")
          return false;
        else return true;
      }
    },
    [payoutMethod]
  );

  const convertDataByPayoutType = useCallback(
    (values: PayoutMethodDetailInput) => {
      return Object.entries(values)
        .filter(([key, _]) => isShowField(key))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    },
    [isShowField]
  );

  const onSubmitForm = useCallback(
    async (values: CreatePayoutMethodInput) => {
      if (editPayoutMethodId) {
        updatePayoutMethod({
          variables: {
            input: {
              ...values,
              detail: convertDataByPayoutType(values?.detail ?? {}),
              id: editPayoutMethodId,
            },
          },
        })
          .then(() => {
            handleRefetchListPayoutMethods();
            toast.show({
              description: "Payout method was updated successfully.",
              action: "success",
            });
            reset({});
            onClose();
          })
          .catch(error => {
            toast.show({
              description:
                error.message ?? "There has been an error, please try again",
              action: "error",
            });
          });
      } else
        createPayoutMethod({
          variables: {
            input: {
              ...values,
              detail: convertDataByPayoutType(values?.detail ?? {}),
            },
          },
        })
          .then(() => {
            handleRefetchListPayoutMethods();
            toast.show({
              description: "Payout method was created successfully.",
              action: "success",
            });
            reset({});
            onClose();
          })
          .catch(error => {
            toast.show({
              description:
                error.message ?? "There has been an error, please try again",
              action: "error",
            });
          });
    },
    [
      editPayoutMethodId,
      createPayoutMethod,
      convertDataByPayoutType,
      updatePayoutMethod,
      handleRefetchListPayoutMethods,
      toast,
      reset,
      onClose,
    ]
  );

  const resetFormValueToEmpty = useCallback(() => {
    reset(initialEmptyValue);
  }, [reset]);

  const isDisabledSubmitButton = useCallback(() => {
    const hasAllKeys = (obj: { [key: string]: string }, keys: string[]) => {
      return keys.every(key => !!obj?.[key]);
    };

    const requiredFields = Object.keys(initialEmptyValue.detail).filter(key =>
      isShowField(key)
    );

    return !hasAllKeys(
      (formValues?.detail as { [key: string]: string }) || {},
      requiredFields
    );
  }, [formValues, isShowField]);
  const handleCancel = useCallback(() => {
    onClose();
    resetFormValueToEmpty();
  }, [onClose, resetFormValueToEmpty]);

  const doSubmit = handleSubmit(onSubmitForm);

  useEffect(() => {
    if (!editPayoutMethodId) resetFormValueToEmpty();

    if (editPayoutMethodId && payoutMethodDetail) {
      reset({
        type: payoutMethodDetail.getPayoutMethod.type,
        detail: {
          ...payoutMethodDetail.getPayoutMethod.detail,
          accountType:
            payoutMethodDetail.getPayoutMethod.detail?.accountType ||
            AccountType.Checking,
          __typename: undefined,
        } as PayoutMethodDetailInput,
      });
    }
  }, [
    editPayoutMethodId,
    payoutMethodDetail,
    reset,
    resetFormValueToEmpty,
    isOpen,
  ]);

  useEffect(() => {
    if ([PayoutType.Ach, PayoutType.Wire].includes(payoutMethod)) {
      bankNameRef.current?.focus();
    }
    if (
      editPayoutMethodId &&
      payoutMethod &&
      payoutMethodDetail?.getPayoutMethod.type === payoutMethod
    ) {
      reset({
        type: payoutMethod,
        detail: {
          ...payoutMethodDetail.getPayoutMethod.detail,
          accountType:
            payoutMethodDetail.getPayoutMethod.detail?.accountType ||
            AccountType.Checking,
          __typename: undefined,
        } as PayoutMethodDetailInput,
      });
    } else if (
      payoutMethod &&
      payoutMethodDetail?.getPayoutMethod.type !== payoutMethod
    ) {
      reset({
        type: payoutMethod,
        detail: {
          ...initialEmptyValue.detail,
        },
      });
    }
  }, [
    editPayoutMethodId,
    payoutMethod,
    payoutMethodDetail?.getPayoutMethod,
    reset,
  ]);

  return (
    <PayoutMethodModalView
      title={editPayoutMethodId ? "EDIT PAYOUT METHOD" : "ADD PAYOUT METHOD"}
      control={control}
      errors={errors}
      onConfirm={doSubmit}
      onClose={handleCancel}
      loading={isLoading || createPayoutLoading || updatePayoutLoading}
      formLoading={payoutMethodDetailLoading}
      isOpen={isOpen}
      isMobile={isBrowserMobile}
      isShowField={isShowField}
      isEditPayoutDetail={!!editPayoutMethodId}
      isDisabledConfirmBtn={!payoutMethod || isDisabledSubmitButton()}
      payoutMethod={payoutMethod}
    />
  );
};

export default PayoutMethodModalContainer;
