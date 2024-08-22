/* eslint-disable max-lines */
import { Divider, VStack } from "@gluestack-ui/themed";
import { testIDs } from "e2e/testIDs";
import { default as React } from "react";
import { Control, FieldErrors } from "react-hook-form";

import {
  FormControlInput,
  FormControlSelect,
  Model,
} from "@/components/Elements";
import Stack from "@/components/Elements/Stack";
import { CreatePayoutMethodInput, PayoutType } from "@/generated/graphql";
import { accountTypeOptions, paymentOptions } from "@/utils/constant";
interface PayoutMethodsFormProps {
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  isMobile?: boolean;
  control: Control<CreatePayoutMethodInput>;
  errors: FieldErrors<CreatePayoutMethodInput>;
  isValid?: boolean;
  loading?: boolean;
  isShowField: (fieldName: string) => boolean;
  isEditPayoutDetail: boolean;
  isDisabledConfirmBtn: boolean;
  formLoading: boolean;
  payoutMethod: PayoutType;
}

const PayoutMethodsFormView = ({
  title,
  isOpen,
  onClose,
  isMobile,
  control,
  onConfirm,
  errors,
  loading,
  isShowField,
  isEditPayoutDetail,
  isDisabledConfirmBtn,
  formLoading,
  payoutMethod,
}: PayoutMethodsFormProps) => (
  <Model
    isOpen={formLoading ? false : isOpen}
    title={title}
    headerProps={{
      px: 36,
      pt: 36,
      pb: 11,
      justifyContent: !isMobile ? "flex-start" : "center",
    }}
    headingProps={{ fontFamily: "$bodyBold" }}
    bodyProps={{ px: 24, pb: 24 }}
    footerProps={{ px: 24, pb: 24, pt: 0 }}
    onClose={onClose}
    textBtnConfirm={isEditPayoutDetail ? "Save Changes" : "Save"}
    textBtnClose="Cancel"
    onConfirm={onConfirm}
    avoidKeyboard
    contentProps={{ bg: "$white", minWidth: isMobile ? "$px" : "$147" }}
    confirmLoading={loading}
    buttonConfirmProps={{
      isDisabled: loading || isDisabledConfirmBtn || formLoading,
    }}
    buttonCancelProps={{ isDisabled: loading }}
    size={isMobile ? "lg" : "md"}
    textProps={{ fontFamily: "$bodyBold", lineHeight: "$xl" }}
  >
    <VStack gap="$4">
      <FormControlSelect
        control={control}
        name="type"
        label="Payout Method"
        isRequired
        isInvalid={"type" in errors}
        placeholder="Select payout method"
        labelProps={{ fontSize: "$sm", fontFamily: "$bodyBold" }}
        error={errors?.type?.message?.toString()}
        selectProps={{
          options: paymentOptions,
          width: "100%",
        }}
        testID={testIDs.PAYOUT.SELECT_TYPE}
      />
      {payoutMethod && <Divider />}
      <Stack display="column" gap="$4">
        {isShowField("email") && (
          <FormControlInput
            isRequired={isShowField("email")}
            flex={1}
            isInvalid={!!errors?.detail?.email}
            control={control}
            name="detail.email"
            label="Email"
            labelProps={{ fontFamily: "$bodyBold" }}
            errorMessage={errors?.detail?.email?.message?.toString() || ""}
            inputField={{
              maxLength: 255,
              autoFocus: true,
            }}
            isTrimText
            testID={testIDs.PAYOUT.EMAIL}
          />
        )}
        {isShowField("bankName") && (
          <FormControlInput
            isRequired={isShowField("bankName")}
            flex={1}
            isInvalid={!!errors?.detail?.bankName}
            control={control}
            name="detail.bankName"
            label="Bank Name"
            labelProps={{ fontFamily: "$bodyBold" }}
            errorMessage={errors?.detail?.bankName?.message?.toString() || ""}
            inputField={{
              maxLength: 255,
              autoFocus: true,
            }}
            testID={testIDs.PAYOUT.BANK_NAME}
          />
        )}
        {isShowField("accountNumber") && (
          <FormControlInput
            isRequired={isShowField("accountNumber")}
            flex={1}
            isInvalid={!!errors?.detail?.accountNumber}
            control={control}
            name="detail.accountNumber"
            label="Account Number"
            labelProps={{ fontFamily: "$bodyBold" }}
            errorMessage={
              errors?.detail?.accountNumber?.message?.toString() || ""
            }
            inputField={{
              maxLength: 255,
            }}
            numberField
            testID={testIDs.PAYOUT.ACCOUNT_NUMBER}
          />
        )}
        <Stack display={isMobile ? "column" : "row"} gap="$4">
          {isShowField("accountType") && (
            <FormControlSelect
              isRequired={isShowField("accountType")}
              flex={1}
              isInvalid={!!errors?.detail?.accountType}
              control={control}
              name="detail.accountType"
              placeholder="Select Account Type"
              labelProps={{ fontSize: "$sm", fontFamily: "$bodyBold" }}
              error={errors?.type?.message?.toString()}
              selectProps={{
                options: accountTypeOptions,
                label: "Account Type",
              }}
              style={{ marginTop: 4 }}
            />
          )}
          {isShowField("routingNumber") && (
            <FormControlInput
              isRequired={isShowField("routingNumber")}
              flex={1}
              isInvalid={!!errors?.detail?.routingNumber}
              control={control}
              name="detail.routingNumber"
              label="Routing Number"
              labelProps={{ fontFamily: "$bodyBold" }}
              errorMessage={
                errors?.detail?.routingNumber?.message?.toString() || ""
              }
              inputField={{
                maxLength: 255,
              }}
              numberField
              testID={testIDs.PAYOUT.ROUTING_NUMBER}
            />
          )}
        </Stack>
        {isShowField("bankAddress") && (
          <FormControlInput
            isRequired={isShowField("bankAddress")}
            flex={1}
            isInvalid={!!errors?.detail?.bankAddress}
            control={control}
            name="detail.bankAddress"
            label="Bank Address"
            labelProps={{ fontFamily: "$bodyBold" }}
            errorMessage={
              errors?.detail?.bankAddress?.message?.toString() || ""
            }
            inputField={{
              maxLength: 255,
            }}
            testID={testIDs.PAYOUT.BANK_ADDRESS}
          />
        )}
      </Stack>
    </VStack>
  </Model>
);

export default PayoutMethodsFormView;
