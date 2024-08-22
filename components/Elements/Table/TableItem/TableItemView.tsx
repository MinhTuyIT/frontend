import { Box, FlatList } from "@gluestack-ui/themed";
import { Row } from "@tanstack/react-table";
import React from "react";
import { Platform } from "react-native";

import RowItem from "./Row";
import TableLoader from "../TableLoader";

interface Props<T> {
  rows: Row<T>[];
  isFetchingMore?: boolean;
}

const TableItemView = <T,>({ rows, isFetchingMore }: Props<T>) => (
  <FlatList
    data={rows}
    extraData={rows}
    keyExtractor={row => `${(row as Row<T>).id}`}
    removeClippedSubviews
    maxToRenderPerBatch={Platform.select({ web: 40, native: 2 })}
    windowSize={Platform.select({ web: 100, native: undefined })}
    disableVirtualization={Platform.select({ web: true, native: false })}
    scrollEventThrottle={16}
    // contentContainerStyle={{ flexGrow: 1 }}
    ListFooterComponent={isFetchingMore ? <TableLoader /> : null}
    renderItem={({ item: row }) => <RowItem row={row as any} />}
    ItemSeparatorComponent={() => (
      <Box width="$full" height="$1" bg="$secondary300" />
    )}
  />
);

export default TableItemView;
