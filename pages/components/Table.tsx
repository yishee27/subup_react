import * as React from 'react';
import Paper from '@mui/material/Paper';
import MaterialTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ActionMenu from './ActionMenu';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box'

interface TableProps {
  handleActionMenuItemOnClick: (index: number) => void;
  render: (row: {}, col: {}) => JSX.Element;
  tableData: object[];
  tableHeader: object[];
}

export default function Table(props: TableProps) {
  const rows = props.tableData;
  const columns = props.tableHeader;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden', marginBottom: "100px", border : 0, backgroundColor: '#F1F5FE' }}>

      <TableContainer sx={{ maxHeight: "80%",  borderRadius:5}}>
        <MaterialTable aria-label="customized table" >
          <TableHead sx={{ backgroundColor: '#212661'}}>
            <TableRow >
              {columns.map((column: any) => {
                if (column.show)
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 'bold', color: 'white', padding:'0px' }}
                    >
                      {column.label}
                    </TableCell>
                  )
              })}
              <TableCell style={{ fontWeight: 'bold', color: 'white' }}>
                etc.
              </TableCell>
            </TableRow>
          </TableHead>
          </MaterialTable>
          </TableContainer>
       

          <TableContainer sx={{ maxHeight: "100%", marginTop:2, borderRadius: 5, backgroundColor:'white'}}>
          <MaterialTable aria-label="customized table">
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, i: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column: any) => {
                      const renderRow = props.render(column, row);
                      if (column.show === true) {
                        return (
                          <TableCell sx={{ borderRight:'1px solid rgb(224, 224, 224)', fontWeight: 'bold' }} key={column.id} align={column.align}>
                            { renderRow }
                          </TableCell>
                        );
                      }
                    })}
                    <TableCell>
                      <ActionMenu actionMenuItemOnClick={ () => props.handleActionMenuItemOnClick(i) } />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          </MaterialTable>
      
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop:'10%', alignItems: 'center'}}>
      <Pagination
        variant="outlined"
        count={rows.length}
        page={page}
        onChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Box>

      
      
    </Paper>
  );
}
