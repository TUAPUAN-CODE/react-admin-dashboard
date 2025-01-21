import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  Box,
  TextField,
  Select,
  MenuItem,
  Collapse,
  IconButton,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row({ row, columnWidths }) {
  const [open, setOpen] = useState(false);

  const collapseData = [
    row,
    { detail1: 'Extra Detail 1', detail2: 'Extra Detail 2', detail3: 'Extra Detail 3' },
  ];

  return (
    <>
      <TableRow>
        <TableCell align="center" style={{ width: columnWidths[0], border: '1px solid #e0e0e0' }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {Object.values(row).map((value, idx) => (
          <TableCell
            key={idx}
            align="center"
            style={{ width: columnWidths[idx + 1], border: '1px solid #e0e0e0' }}
          >
            {value || '-'}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell colSpan={columnWidths.length} style={{ padding: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ backgroundColor: '#f5f5f5', overflowX: 'auto' }}>
              <Table size="small">
                <TableBody>
                  {collapseData.map((detailRow, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        style={{ width: columnWidths[0], border: '1px solid #e0e0e0' }}
                      >
                        รายละเอียด
                      </TableCell>
                      {Object.values(detailRow).map((detail, idx) => (
                        <TableCell
                          key={idx}
                          align="center"
                          style={{
                            width: columnWidths[idx + 1],
                            border: '1px solid #e0e0e0',
                          }}
                        >
                          {detail}
                        </TableCell>
                      ))}
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

const TableMainPrep = ({ rows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const filteredRows = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const columnCount = Object.keys(rows[0] || {}).length;
  const columnWidths = Array(columnCount + 1).fill(`${100 / (columnCount + 1)}%`);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, gap: 1 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} sx={{ height: '56px' }}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
      </Box>
      <TableContainer sx={{ height: 'calc(60vh)', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ color: '#666', border: '1px solid #e0e0e0' }}
                style={{ width: columnWidths[0] }}
              >
                รายละเอียด
              </TableCell>
              {Object.keys(rows[0] || {}).map((key, i) => (
                <TableCell
                  key={i}
                  align="center"
                  sx={{ color: '#666', border: '1px solid #e0e0e0' }}
                  style={{ width: columnWidths[i + 1] }}
                >
                  {key.replace(/_/g, ' ').toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, idx) => (
              <Row key={idx} row={row} columnWidths={columnWidths} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={(event) => handleChangeRowsPerPage(event.target.value)}
      />
    </Paper>
  );
};

export default function App() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      if (data.users) {
        setRows(data.users);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  return (
    <TableMainPrep
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
