import React from "react";
import { useTable } from "react-table";
import styled from 'styled-components';

export default function Table({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data
  });

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <TableStyle {...getTableProps()}>
      <TheadStyle>
        {headerGroups.map(headerGroup => (
          <TrStyle {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </TrStyle>
        ))}
      </TheadStyle>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <TdStyle {...cell.getCellProps()}>{cell.render("Cell")}</TdStyle>;
              })}
            </tr>
          );
        })}
      </tbody>
    </TableStyle>
  );
}

const TableStyle = styled.table`
  border: 1px solid black;
  width: 100%;
`;

const TheadStyle = styled.thead`
  color: orange;
  width: 100px;
  border: 1px solid black;
  text-align: center;
`;

const TrStyle = styled.tr`
  color: red;
  min-height: 10vh;
`;

const TdStyle = styled.td`
  color: green;
  border: 1px solid black;
  height: 100%;
  text-align: center;
`;