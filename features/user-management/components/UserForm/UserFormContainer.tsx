import { Text, VStack } from "@gluestack-ui/themed";

import GroupCheckbox from "../GroupCheckbox";

import {
  UserManagementDetailUserFragment,
  useUserManagementListCognitoGroupsQuery,
} from "@/generated/graphql";

interface Props {
  user: UserManagementDetailUserFragment;
}

const UserFormContainer = ({ user }: Props) => {
  const { data } = useUserManagementListCognitoGroupsQuery();

  return (
    <VStack gap="$6" m="$4">
      <Text fontSize="$lg" fontWeight="bold">
        Groups
      </Text>
      {data?.listCognitoGroups?.map(group => (
        <GroupCheckbox key={group.GroupName} group={group} user={user} />
      ))}
    </VStack>
  );
};

export default UserFormContainer;
