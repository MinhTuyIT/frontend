/* eslint-disable max-lines */
import { FormControl, Input, InputField, VStack } from "@gluestack-ui/themed";
import { Table as ReactTable } from "@tanstack/react-table";
import React from "react";

import { Container, Table } from "@/components/Elements";
import { UserManagementUserFragment } from "@/generated/graphql";

interface Props {
  table: ReactTable<UserManagementUserFragment>;
  onPhoneNumberChange: (phoneNumber: string) => void;
  loading?: boolean;
  onLoadMore: () => void;
  isScreenLargeOrBigger: boolean;
}

const UserListView: React.FC<Props> = ({
  table,
  loading,
  onLoadMore,
  onPhoneNumberChange,
}) => (
  <Container flex={1}>
    <VStack flex={1}>
      <FormControl size="md">
        <Input size="xl">
          <InputField
            onChangeText={onPhoneNumberChange}
            inputMode="text"
            placeholder="Search by Phone Number"
            returnKeyType="next"
            accessibilityLabel="Set Phone Number Input"
            width="$full"
          />
        </Input>
      </FormControl>
      <Table table={table} loading={loading} onLoadMore={onLoadMore} />
    </VStack>
  </Container>
);
export default UserListView;
