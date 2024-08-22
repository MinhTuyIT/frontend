import React from "react";

import UserForm from "../../components/UserForm";

import { useUserManagementGetUserQuery } from "@/generated/graphql";

interface Props {
  id: string;
}

const UserEditContainer = ({ id }: Props) => {
  const { data } = useUserManagementGetUserQuery({ variables: { id } });

  return !data?.getUser ? null : <UserForm user={data.getUser} />;
};

export default UserEditContainer;
