import React from "react";

import useCurrentUser from "../../hooks/useCurrentUser";

interface Props {
  groups: string[];
  children: React.ReactElement;
}

const GateToContainer = ({ groups, children }: Props) => {
  const currentUser = useCurrentUser();
  const usersGroups = (currentUser?.cognitoGroups ?? []).map(
    group => group.GroupName
  );
  const allowed =
    (groups.includes("Members") && !!currentUser) ||
    usersGroups.some(group => groups.includes(group));
  return !allowed ? null : children;
};

export default GateToContainer;
