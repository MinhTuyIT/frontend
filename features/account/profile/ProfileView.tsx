import { ApolloQueryResult } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { testIDs } from "e2e/testIDs";
import React from "react";
import { Platform } from "react-native";

import PayoutList from "./components/PayoutList";
import ProfileForm from "./components/ProfileForm";
import RegisterToBidButton from "./components/RegisterToBidButton";
import RegisterToBidForm from "./components/RegisterToBidForm";

import { Button, Skeleton, StackView } from "@/components/Elements";
import { AuthMeQuery, PaymentMethod } from "@/generated/graphql";
export interface ProfileViewProps {
  isSmall: string;
  editIconBg: string;
  paymentMethods: PaymentMethod[];
  loadingPayment: boolean;
  isOpenModal: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  userInfo?: AuthMeQuery;
  refetchUser: () => Promise<ApolloQueryResult<AuthMeQuery>>;
  profileFormRef: any;
  handleChangePassword: () => void;
  refetchPaymentMethods: () => void;
  defaultColor: string;
  isDirty?: boolean;
}
const ProfileView = ({
  isSmall,
  isOpenModal,
  onOpenModal,
  onCloseModal,
  paymentMethods,
  userInfo,
  refetchUser,
  profileFormRef,
  handleChangePassword,
  refetchPaymentMethods,
  defaultColor,
  loadingPayment,
}: ProfileViewProps) => (
  <ScrollView
    bg="$white"
    nestedScrollEnabled
    testID={testIDs.ACCOUNT.PROFILE_SCROLL}
  >
    <VStack p="$9" pt="$0">
      <HStack
        justifyContent="space-between"
        alignItems={isSmall ? "flex-start" : "center"}
        flexDirection={isSmall ? "column-reverse" : "row"}
        gap="$8"
        mb={isSmall ? "$4" : "$7"}
        mt="$4.5"
        maxWidth="$237"
      >
        <HStack gap="$7">
          {!isSmall && (
            <Text
              fontSize="$2xl"
              fontFamily="$bodyBold"
              color="$textAccountTitle"
            >
              Profile
            </Text>
          )}
        </HStack>
        {userInfo?.me?.isRegisteredBidder ? (
          <Button
            variant="outline"
            action="primary"
            label="Registered To Bid"
            labelProps={{
              lineHeight: "$2xl",
              fontFamily: "$bodyBold",
              fontSize: "$md",
              color: "$defaultContent",
            }}
            w={isSmall ? "$full" : "$48"}
            h={Platform.OS !== "web" ? "$9.5" : "$12"}
            leftIcon={
              <VStack justifyContent="center" mr="$2">
                <MaterialIcons
                  name="check-circle"
                  size={15}
                  color={defaultColor}
                />
              </VStack>
            }
            bgColor="$jungleGreenOpacity"
            borderWidth="$0"
            disabled
          />
        ) : (
          <View w={isSmall ? "$full" : undefined}>
            <Skeleton
              loading={loadingPayment}
              width={isSmall ? "100%" : 192}
              height={isSmall ? 38 : 48}
            >
              <RegisterToBidButton
                paymentMethods={paymentMethods}
                refetchPaymentMethods={refetchPaymentMethods}
                onOpenModal={onOpenModal}
                loadingPayment={loadingPayment}
                isDisabled={loadingPayment}
                userInfo={userInfo}
                refetchUser={refetchUser}
              />
            </Skeleton>
          </View>
        )}
        <RegisterToBidForm
          isOpen={isOpenModal}
          onClose={onCloseModal}
          paymentMethods={paymentMethods}
          data={userInfo}
          onOpenModal={onOpenModal}
          refetch={refetchUser}
        />
      </HStack>
      <ProfileForm data={userInfo} refetch={refetchUser} ref={profileFormRef} />

      <Divider my="$8" maxWidth="$237" bgColor="$defaultBorderColor" />
      <PayoutList />
      <Divider my="$8" maxWidth="$237" bgColor="$defaultBorderColor" />

      <StackView
        flexDirection={isSmall ? "column" : "row"}
        gap="$6"
        justifyContent="space-between"
        maxWidth="$237"
      >
        <Button
          variant="outline"
          action="secondary"
          bgColor="$white"
          borderColor="$content"
          onPress={handleChangePassword}
          label="Change password"
          labelProps={{
            color: "$content",
            lineHeight: "$2xl",
            fontFamily: "$bodyBold",
            fontSize: "$md",
          }}
          w={isSmall ? "$full" : "$48"}
          h={Platform.OS !== "web" ? "$9.5" : "$12"}
        />
      </StackView>
    </VStack>
  </ScrollView>
);

export default ProfileView;
