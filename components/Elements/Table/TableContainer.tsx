import { Table } from "@tanstack/react-table";
import React from "react";

import { TableEmptyProps } from "./TableEmpty";
import TableView from "./TableView";

interface Props<T> {
  table: Table<T>;
  loading?: boolean;
  tableEmptyProps?: TableEmptyProps;
  onLoadMore: () => void;
}

const TableContainer = <T,>({ loading, ...props }: Props<T>) => {
  const isEmpty = props.table.getRowModel().rows.length === 0;
  const isFetchingMore = !isEmpty && loading;
  const isLoading = isEmpty && loading;

  return (
    <TableView
      {...props}
      isEmpty={isEmpty}
      isLoading={isLoading}
      isFetchingMore={isFetchingMore}
    />
  );
};

export default TableContainer;
