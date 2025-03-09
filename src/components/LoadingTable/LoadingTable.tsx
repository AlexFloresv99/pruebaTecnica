import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
} from "@mui/material";

interface TableSkeletonProps {
  rows: number;
  columns: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows, columns }) => {
  const skeletonRows = Array.from({ length: rows });
  const skeletonColumns = Array.from({ length: columns });

  return (
    <Table sx={{ minWidth: 650 }} aria-label="skeleton table">
      <TableHead>
        <TableRow>
          {skeletonColumns.map((_, index) => (
            <TableCell key={`header-skeleton-${index}`}>
              <Skeleton variant="text" width={100} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {skeletonRows.map((_, rowIndex) => (
          <TableRow key={`row-skeleton-${rowIndex}`}>
            {skeletonColumns.map((_, columnIndex) => (
              <TableCell key={`cell-skeleton-${rowIndex}-${columnIndex}`}>
                <Skeleton variant="text" width={Math.random() * 150 + 50} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
