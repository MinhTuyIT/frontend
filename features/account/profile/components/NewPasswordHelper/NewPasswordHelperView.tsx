import {
  FormControlHelper,
  HStack,
  Progress,
  ProgressFilledTrack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import React from "react";

import { MessageRequired } from "@/utils/validation";

interface Props {
  newPassword?: string;
  passwordLengthPercentage?: number;
  passwordStrengthColor?: string;
  passwordStrengthText?: string;
}

const NewPasswordHelperView = ({
  newPassword,
  passwordLengthPercentage,
  passwordStrengthColor,
  passwordStrengthText,
}: Props) => {
  return newPassword ? (
    <FormControlHelper mt={0}>
      <HStack alignItems="center" mt={11}>
        <Text fontSize="$xs" color="$abaddonBlack">
          Password Strength
        </Text>
        <Progress
          bg="$bgButtonGray91"
          marginHorizontal={10}
          value={passwordLengthPercentage}
          w={80}
        >
          <ProgressFilledTrack
            bg={passwordStrengthColor}
            borderTopRightRadius={
              passwordLengthPercentage === 100 ? "$full" : 0
            }
            borderBottomRightRadius={
              passwordLengthPercentage === 100 ? "$full" : 0
            }
          />
          <HStack
            position="absolute"
            bgColor="transparent"
            top={0}
            left={0}
            width="100%"
            height="100%"
            borderRadius="$full"
          >
            {Array.from({ length: 7 })
              .map((_, index) => index + 1)
              .map(key => (
                <VStack
                  key={key}
                  borderRightWidth={2}
                  borderRightColor="$white"
                  width="12.5%"
                />
              ))}
          </HStack>
        </Progress>
        <Text fontSize="$xs" color="$abaddonBlack" fontFamily="$bodyBold">
          {passwordStrengthText}
        </Text>
      </HStack>
    </FormControlHelper>
  ) : (
    <FormControlHelper flexDirection="column" alignItems="flex-start" mt="$3">
      <HStack alignItems="center" gap="$1.5">
        <View bg="$defaultColor" w="$2" h="$2" rounded="$2xl" />
        <Text fontSize="$sm" fontFamily="$body">
          {MessageRequired.minPassword}
        </Text>
      </HStack>
      <HStack gap="$1.5">
        <View bg="$defaultColor" w="$2" h="$2" rounded="$2xl" mt="$2" />
        <Text fontSize="$sm" fontFamily="$body" flex={1}>
          {MessageRequired.constrainPassword}
        </Text>
      </HStack>
    </FormControlHelper>
  );
};

export default NewPasswordHelperView;
