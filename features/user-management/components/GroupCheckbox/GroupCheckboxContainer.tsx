/* eslint-disable max-lines */
import {
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { useCallback } from "react";

import {
  UserManagementCognitoGroupFragment,
  UserManagementDetailUserFragment,
  useUserManagementAddUserToCognitoGroupMutation,
  useUserManagementRemoveUserFromCognitoGroupMutation,
} from "@/generated/graphql";

interface Props {
  user: UserManagementDetailUserFragment;
  group: UserManagementCognitoGroupFragment;
}

const GroupCheckboxContainer = ({ group, user }: Props) => {
  const [removeUserFromCognitoGroup, { loading: removeLoading }] =
    useUserManagementRemoveUserFromCognitoGroupMutation();
  const [addUserToCognitoGroup, { loading: addLoading }] =
    useUserManagementAddUserToCognitoGroupMutation();

  const loading = removeLoading || addLoading;

  const handleChange = useCallback(
    () =>
      user.cognitoGroups?.some(cg => cg.GroupName === group.GroupName)
        ? removeUserFromCognitoGroup({
            variables: {
              input: { userId: user.id, groupName: group.GroupName },
            },
          })
        : addUserToCognitoGroup({
            variables: {
              input: { userId: user.id, groupName: group.GroupName },
            },
          }),
    [
      addUserToCognitoGroup,
      group.GroupName,
      removeUserFromCognitoGroup,
      user.cognitoGroups,
      user.id,
    ]
  );

  return (
    <Checkbox
      isDisabled={loading}
      accessibilityLabel={`${group.GroupName} Checkbox`}
      isChecked={user.cognitoGroups?.some(
        cg => cg.GroupName === group.GroupName
      )}
      onChange={handleChange}
      value="1"
    >
      <CheckboxIndicator mr="$2">
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel accessibilityLabel={`${group.GroupName} Label`}>
        {group.GroupName}
      </CheckboxLabel>
    </Checkbox>
  );
};

export default GroupCheckboxContainer;
