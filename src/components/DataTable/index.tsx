import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { columns } from "./columns";
import { DataColumn } from "../../App";
import { parseISO, format } from 'date-fns';

export interface DataTableProps {
  data: DataColumn[];
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const DataTable = ({
  data,
  total,
  setPage,
  page,
}: Readonly<DataTableProps>) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const convertDate = (date: string) => {
    const newDate = parseISO(date);

    return format(newDate, "MM/dd/yy");
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.value}
                  style={{ minWidth: column.minWidth, fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value =
                      column.value === "created_dt" ||
                      column.value === "data_source_modified_dt"
                        ? convertDate(row[column.value])
                        : row[column.value];
                    return <TableCell key={column.value}>{value}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        rowsPerPage={20}
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}
