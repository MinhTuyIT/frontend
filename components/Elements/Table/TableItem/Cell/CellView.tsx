import { VStack } from "@gluestack-ui/themed";
import { Cell, flexRender } from "@tanstack/react-table";
import React from "react";

interface Props<T> {
  cell: Cell<T, unknown>;
}

const CellView = <T,>({ cell }: Props<T>) => (
  <VStack flex={1} minWidth={cell.column.getSize()} focusable>
    {flexRender(cell.column.columnDef.cell, cell.getContext())}
  </VStack>
);

export default React.memo(CellView);
