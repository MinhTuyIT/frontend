import { HStack } from "@gluestack-ui/themed";
import { Row } from "@tanstack/react-table";
import React from "react";

import Cell from "../Cell";

interface Props<T> {
  row: Row<T>;
}

const RowView = <T,>({ row }: Props<T>) => (
  <>
    <HStack focusable>
      {row.getVisibleCells().map(cell => (
        <Cell key={`row_${row.id}cell_${cell.id}`} cell={cell as any} />
      ))}
    </HStack>
  </>
);

export default React.memo(RowView);
