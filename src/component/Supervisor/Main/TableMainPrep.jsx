import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TablePagination, Paper, IconButton, Collapse, Box, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import { ResizableBox } from 'react-resizable';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import 'react-resizable/css/styles.css';

function Row({ row, handleInlineEdit }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {Object.keys(row).map((key) => (
          <TableCell key={key} onDoubleClick={() => handleInlineEdit(row, key)}>
            {row[key]}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell colSpan={10} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom>
                History
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total Price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">{(historyRow.amount * row.price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const TableMainPrep = ({ rows, filteredRows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('all');
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSort = (column) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    filteredRows.sort((a, b) => (a[column] < b[column] ? (order === 'asc' ? -1 : 1) : (order === 'asc' ? 1 : -1)));
  };

  const handleFiltering = (event) => setFilter(event.target.value);

  const handleRowSelect = (row) => {
    setSelectedRows(prevState =>
      prevState.includes(row) ? prevState.filter(r => r !== row) : [...prevState, row]
    );
  };

  const handleInlineEdit = (row, key) => {
    // Handle inline edit logic here
  };

  const handleExport = () => {
    // Implement exporting functionality (CSV, Excel, PDF)
  };

  const filteredRowsWithSearch = filteredRows.filter(row =>
    Object.values(row).some(val =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Paper sx={{ width: '100%', overflowX: 'auto' }}>
      <div style={{ padding: 10 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: 20 }}
        />
        <Select value={filter} onChange={handleFiltering} style={{ marginBottom: 20 }}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          {/* Additional filter categories */}
        </Select>
        <Button variant="contained" onClick={handleExport} style={{ marginBottom: 20 }}>Export</Button>
      </div>
      <TableContainer>
        <Table stickyHeader aria-label="prepared material table" sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton size="small" />
              </TableCell>
              {['coldPrep', 'dateTime', 'batch', 'mat', 'matName', 'doc', 'line', 'status', 'recorderName'].map((header, index) => (
                <TableCell key={header} align="right" onClick={() => handleSort(header)}>
                  <ResizableBox width={100} height={40} axis="x" minConstraints={[50, 40]} maxConstraints={[300, 40]}>
                    {header}
                  </ResizableBox>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRowsWithSearch
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row key={row.name} row={row} handleInlineEdit={handleInlineEdit} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRowsWithSearch.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableMainPrep;
