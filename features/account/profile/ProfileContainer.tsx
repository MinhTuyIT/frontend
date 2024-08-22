import { useBreakpointValue, useToken } from "@gluestack-ui/themed";
import React, { useCallback, useMemo, useRef, useState } from "react";

import ProfileView from "./ProfileView";
import ChangePasswordForm from "./components/ChangePasswordForm";

import { useAuth } from "@/features/auth";
import {
  OrderByDirection,
  PaymentMethod,
  useAccountManagementListMyPaymentMethodsQuery,
  useAuthMeQuery,
} from "@/generated/graphql";

const ProfileContainer = () => {
  const authData = useAuth();
  const { data: userInfo, refetch: refetchUser } = useAuthMeQuery({
    skip: !authData?.auth,
  });
  const isSmall = useBreakpointValue({ base: true, sm: true, md: false });
  const profileFormRef = useRef();
  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
    useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
    data,
    loading: loadingPayment,
    refetch: refetchPaymentMethods,
  } = useAccountManagementListMyPaymentMethodsQuery({
    variables: {
      orderBy: {
        createdAt: OrderByDirection.Asc,
      },
    },
  });
  const editIconBg = useToken("colors", "black");

  const paymentMethods = useMemo<PaymentMethod[]>(
    () => data?.listMyPaymentMethods.edges.map(edge => edge.node) ?? [],
    [data?.listMyPaymentMethods.edges]
  );

  const defaultColor = useToken("colors", "defaultColor");

  const onOpenModal = useCallback(() => setIsOpenModal(true), [setIsOpenModal]);
  const onCloseModal = useCallback(
    () => setIsOpenModal(false),
    [setIsOpenModal]
  );
  const handleChangePassword = useCallback(() => {
    setIsOpenChangePasswordModal(true);
  }, []);
  return (
    <>
      <ProfileView
        isSmall={isSmall}
        editIconBg={editIconBg}
        isOpenModal={isOpenModal}
        paymentMethods={paymentMethods}
        refetchPaymentMethods={refetchPaymentMethods}
        loadingPayment={loadingPayment}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        userInfo={userInfo}
        refetchUser={refetchUser}
        profileFormRef={profileFormRef}
        handleChangePassword={handleChangePassword}
        defaultColor={defaultColor}
      />
      <ChangePasswordForm
        isOpen={isOpenChangePasswordModal}
        onClose={() => setIsOpenChangePasswordModal(false)}
      />
    </>
  );
};

export default ProfileContainer;
