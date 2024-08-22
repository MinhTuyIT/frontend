import { Box, Text, useBreakpointValue } from "@gluestack-ui/themed";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";

import UserListView from "./UserListView";

import { TableHeader } from "@/components/Elements";
import {
  UserManagementUserFragment,
  useUserManagementListUsersByIdentifierCreatedAtQuery,
} from "@/generated/graphql";
import useDebounceCallback from "@/hooks/useDebounceCallback";

const columnHelper = createColumnHelper<UserManagementUserFragment>();

const UserListContainer = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined | null>();
  const isScreenLargeOrBigger = useBreakpointValue({ base: false, lg: true });

  const handlePhoneNumberChange = useCallback((phoneNumber: string) => {
    setPhoneNumber(
      phoneNumber.replace(/\D/g, "").replace(/^1/, "").replace(/^\+/, "")
    );
  }, []);

  const { data, fetchMore, loading } =
    useUserManagementListUsersByIdentifierCreatedAtQuery({
      variables: {
        identifier: !!phoneNumber ? `+1${phoneNumber}` : undefined,
      },
    });

  const { hasNextPage, endCursor } =
    data?.listUsersByIdentifierCreatedAt?.pageInfo ?? {};

  const edges = useMemo(
    () => data?.listUsersByIdentifierCreatedAt?.edges ?? [],
    [data?.listUsersByIdentifierCreatedAt?.edges]
  );

  const dataTable = useMemo(() => [...edges].map(edge => edge.node), [edges]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !loading) {
      fetchMore({
        variables: { after: endCursor, phoneNumber },
      });
    }
  }, [endCursor, fetchMore, hasNextPage, loading, phoneNumber]);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("phoneNumber", {
        header: info => (
          <TableHeader
            id={info.header.id}
            text="Phone Number"
            borderLeftWidth="$0"
          />
        ),
        cell: info => (
          <Box m="$2">
            <Link href={`/user-management/users/${info.row.original.id}/edit`}>
              <Text color="$primary500">{info.getValue()}</Text>
            </Link>
          </Box>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: dataTable as UserManagementUserFragment[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const debouncedHandlePhoneNumberChange = useDebounceCallback(
    handlePhoneNumberChange,
    200
  );

  return (
    <UserListView
      onPhoneNumberChange={debouncedHandlePhoneNumberChange}
      table={table}
      loading={loading}
      onLoadMore={handleLoadMore}
      isScreenLargeOrBigger={isScreenLargeOrBigger}
    />
  );
};

export default UserListContainer;
