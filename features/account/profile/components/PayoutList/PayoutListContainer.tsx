import React, { useCallback, useState } from "react";

import PayoutListView from "./PayoutListView";
import DeletePayoutModal from "../DeletePayoutModal";
import PayoutMethodModal from "../PayoutMethodModal";

import {
  OrderByDirection,
  PayoutMethod,
  useAccountManagementGetPayoutMethodQuery,
  useAccountManagementListMyPayoutMethodsQuery,
} from "@/generated/graphql";

const PayoutListContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [editPayoutMethod, setEditPayoutMethod] = useState<
    PayoutMethod | undefined
  >(undefined);
  const { data: _ } = useAccountManagementGetPayoutMethodQuery({
    variables: {
      getPayoutMethodId: editPayoutMethod?.id ?? "",
    },
    skip: !editPayoutMethod?.id,
  });

  const { data, refetch, loading } =
    useAccountManagementListMyPayoutMethodsQuery({
      variables: {
        limit: 50,
        start: 0,
        orderBy: {
          createdAt: OrderByDirection.Desc,
        },
      },
    });
  const listDataConvert = data?.listMyPayoutMethods.edges.map(v => v.node);
  const handleAddnew = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleEditPayoutMethod = useCallback((id: string) => {
    setIsOpen(true);
    setEditPayoutMethod({ id } as PayoutMethod);
  }, []);

  const handleDeletePayoutMethod = useCallback((payoutMethod: PayoutMethod) => {
    setIsOpenDeleteModal(true);
    setEditPayoutMethod(payoutMethod);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    setIsOpenDeleteModal(false);
    setEditPayoutMethod(undefined);
  }, []);

  return (
    <>
      <PayoutListView
        handleAddNew={handleAddnew}
        handleEditPayoutMethod={handleEditPayoutMethod}
        payouts={(listDataConvert ?? []) as PayoutMethod[]}
        handleDeletePayoutMethod={handleDeletePayoutMethod}
        loading={loading}
      />
      <PayoutMethodModal
        isOpen={isOpen}
        editPayoutMethodId={editPayoutMethod?.id ?? ""}
        handleRefetchListPayoutMethods={refetch}
        onClose={handleCloseModal}
      />
      <DeletePayoutModal
        isOpen={isOpenDeleteModal}
        onClose={handleCloseModal}
        payout={editPayoutMethod ?? ({} as PayoutMethod)}
        handleRefetchListPayoutMethods={refetch}
      />
    </>
  );
};

export default PayoutListContainer;
