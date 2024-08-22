import { FlatList, HStack, VStack } from "@gluestack-ui/themed";
import { Table, flexRender } from "@tanstack/react-table";
import React from "react";

import TableEmpty, { TableEmptyProps } from "./TableEmpty";
import TableFooter from "./TableFooter";
import TableItem from "./TableItem";
import TableLoader from "./TableLoader";

export interface TableProps<T> {
  table: Table<T>;
  isLoading?: boolean;
  isFetchingMore?: boolean;
  isEmpty?: boolean;
  tableEmptyProps?: TableEmptyProps;
  onLoadMore: () => void;
}

const TableView = <T,>({
  table,
  isLoading,
  isFetchingMore,
  isEmpty = false,
  tableEmptyProps,
  onLoadMore,
}: TableProps<T>) => (
  <VStack flex={1} accessibilityLabel="table cards">
    <FlatList
      data={["table_virtual_list_body"]}
      bg="$backgroundLight0"
      overflow={!isEmpty ? "scroll" : "visible"}
      // contentContainerStyle={{ flexGrow: 1 }}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      decelerationRate="normal"
      keyExtractor={(item, index) => `${item}_${index}`}
      ListFooterComponent={
        isLoading ? (
          <TableLoader flex={1} />
        ) : isEmpty ? (
          <TableEmpty {...tableEmptyProps} />
        ) : null
      }
      ListFooterComponentStyle={{ flex: 1 }}
      ListHeaderComponent={
        <HStack minHeight="$10">
          {table.getHeaderGroups().map(headerGroup =>
            headerGroup.headers.map(header => (
              <VStack
                key={`table_header_${header.id}`}
                flex={1}
                minWidth={header.column.getSize()}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </VStack>
            ))
          )}
        </HStack>
      }
      stickyHeaderIndices={[0]}
      onEndReachedThreshold={0.5}
      onEndReached={onLoadMore}
      renderItem={_ => (
        <TableItem
          rows={table.getRowModel().rows}
          isFetchingMore={isFetchingMore}
        />
      )}
    />
    <TableFooter />
  </VStack>
);

export default TableView;
