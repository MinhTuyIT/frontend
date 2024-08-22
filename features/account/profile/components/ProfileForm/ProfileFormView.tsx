/* eslint-disable max-lines */
import {
  Box,
  FormControl,
  HStack,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import { testIDs } from "e2e/testIDs";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Platform } from "react-native";

import { Button, Input, Skeleton } from "@/components/Elements";
import PhoneNumberInput from "@/components/Elements/PhoneNumberInput";

export interface ProfileInput {
  email: string;
  secondaryEmail: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}
interface ProfileFormViewProps {
  control: Control<ProfileInput>;
  errors: FieldErrors<ProfileInput>;
  isValid: boolean;
  onCancel: () => void;
  isSmall: boolean;
  loading?: boolean;
  onChangePassword?: () => void;
  defaultValue: ProfileInput;
  handleUpdateMe?: () => void;
  isDirty?: boolean;
  emailRef?: React.LegacyRef<any>;
  fetchLoading?: boolean;
}

const ProfileFormView = ({
  control,
  isSmall,
  loading,
  errors,
  defaultValue,
  handleUpdateMe,
  isDirty,
  emailRef,
  fetchLoading,
}: ProfileFormViewProps) => (
  <ScrollView>
    <VStack maxWidth="$237">
      <VStack
        flexDirection={isSmall ? "column" : "row"}
        w="$full"
        gap={isSmall ? "$3" : "$8"}
      >
        <Box w={isSmall ? "$full" : "$1/3"} pr={isSmall ? "$0" : "$4"}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl
                isRequired
                isInvalid={"email" in errors}
                size="md"
                minWidth={100}
                flexGrow={1}
                sx={{
                  _labelAstrick: {
                    color: "$error600",
                  },
                }}
              >
                <Input
                  inputField={{
                    onBlur,
                    onChangeText: onChange,
                    value,
                    ref: emailRef,
                  }}
                  labelProps={{
                    fontFamily: "$bodyBold",
                    fontSize: "$sm",
                    color: "$defaultContent",
                  }}
                  label="Primary Email"
                  isDisabled
                  errorMessage={(errors?.email?.message as string) ?? ""}
                  isShowErrorMsg
                  loading={fetchLoading}
                  testID={testIDs.PROFILE.PRIMARY_EMAIL}
                />
              </FormControl>
            )}
          />
        </Box>
        <Box
          w={isSmall ? "$full" : "$1/3"}
          pl={isSmall ? "$0" : "$4"}
          pr={isSmall ? "$0" : "$4"}
        >
          <Controller
            name="secondaryEmail"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl
                isInvalid={"secondaryEmail" in errors}
                size="md"
                flexGrow={1}
              >
                <Input
                  inputField={{
                    onBlur,
                    onChangeText: onChange,
                    value,
                  }}
                  labelProps={{
                    fontFamily: "$bodyBold",
                    fontSize: "$sm",
                    color: "$defaultContent",
                  }}
                  label="Secondary Email"
                  isDisabled={loading}
                  errorMessage={
                    (errors?.secondaryEmail?.message as string) ?? ""
                  }
                  isShowErrorMsg
                  loading={fetchLoading}
                  testID={testIDs.PROFILE.SECONDARY_EMAIL}
                />
              </FormControl>
            )}
          />
        </Box>
        <Box w={isSmall ? "$full" : "$1/3"} pl={isSmall ? "$0" : "$4"}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                size="md"
                isInvalid={"phoneNumber" in errors}
                flexGrow={1}
              >
                <Skeleton
                  loading={fetchLoading}
                  width={100}
                  height={20}
                  radius={4}
                  mb="$2"
                />
                <PhoneNumberInput
                  defaultValue={defaultValue.phoneNumber}
                  value={value}
                  onChange={onChange}
                  isDisabled={loading}
                  errorMessage={(errors?.phoneNumber?.message as string) ?? ""}
                  loading={fetchLoading}
                />
              </FormControl>
            )}
          />
        </Box>
      </VStack>
      <VStack
        flexDirection={isSmall ? "column" : "row"}
        gap={isSmall ? "$3" : "$8"}
        mt="$3"
        width="$full"
      >
        <Controller
          name="firstName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl size="md" flex={1} isInvalid={"firstName" in errors}>
              <Input
                inputField={{
                  onBlur,
                  onChangeText: onChange,
                  value,
                }}
                labelProps={{
                  fontFamily: "$bodyBold",
                  fontSize: "$sm",
                  color: "$defaultContent",
                }}
                label="First Name"
                isDisabled={loading}
                errorMessage={(errors?.firstName?.message as string) ?? ""}
                loading={fetchLoading}
                testID={testIDs.PROFILE.FIRST_NAME}
              />
            </FormControl>
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl size="md" flex={1} isInvalid={"lastName" in errors}>
              <Input
                inputField={{
                  onBlur,
                  onChangeText: onChange,
                  value,
                }}
                labelProps={{
                  fontFamily: "$bodyBold",
                  fontSize: "$sm",
                  color: "$defaultContent",
                }}
                label="Last Name"
                isDisabled={loading}
                errorMessage={(errors?.lastName?.message as string) ?? ""}
                loading={fetchLoading}
                testID={testIDs.PROFILE.LAST_NAME}
              />
            </FormControl>
          )}
        />
      </VStack>
      {isDirty && (
        <HStack justifyContent="flex-end" mt="$8">
          <Button
            variant="solid"
            action="primary"
            bgColor="$defaultColor"
            label="Save"
            isLoading={loading}
            disabled={loading}
            onPress={handleUpdateMe}
            labelProps={{
              lineHeight: "$2xl",
              fontFamily: "$bodyBold",
              fontSize: "$md",
            }}
            w={isSmall ? "$full" : "$34"}
            h={Platform.OS !== "web" ? "$9.5" : "$12"}
          />
        </HStack>
      )}
    </VStack>
  </ScrollView>
);

export default ProfileFormView;
