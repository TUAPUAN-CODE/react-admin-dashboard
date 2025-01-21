import React, { useState } from "react";
import Header from "../../Layout/Header";
import TableMainPrep from "./TableMainPrep";

const MainSup = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dataRows = [
    { name: 'Brownie', calories: 450, fat: 20, carbs: 50, protein: 6, history: [] },
    { name: 'Ice Cream', calories: 300, fat: 15, carbs: 40, protein: 4, history: [] },
    { name: 'Cheesecake', calories: 350, fat: 18, carbs: 30, protein: 5, history: [] },
    // Add more rows as needed
  ];

  const filteredDataRows = dataRows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9" }} className="flex-1 overflow-auto relative z-10">
      <Header title="ตารางข้อมูลวัตถุดิบภายในห้องเย็น" />

      <main className="max-w-8xl mx-auto py-1 px-4 lg:px-8 mt-[2rem]">
        {/* Add Search functionality */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อวัตถุดิบ"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* TABLE */}
        <section className="mt-0">
          <TableMainPrep
            rows={dataRows}
            filteredRows={filteredDataRows}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </section>
      </main>
    </div>
  );
};

export default MainSup;
