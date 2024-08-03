import { useEffect, useState } from "react";
import { DataTable } from "./components/DataTable";
import { Filters } from "./components/Filters";
import { columns } from "./components/DataTable/columns";
import { Search } from "./components/Search";
import LinearProgress from "@mui/material/LinearProgress";

export interface DataColumn {
  created_dt: string;
  data_source_modified_dt: string;
  entity_type: string;
  operating_status: string;
  legal_name: string;
  dba_name: string;
  physical_address: string;
  phone: string;
  usdot_number: number;
  mc_mx_ff_number: string;
  power_units: number;
  out_of_service_date: string;
  id: number;
}

const orderByData = [
  {
    label: "Ascending",
    value: "asc",
  },
  {
    label: "Descending",
    value: "desc",
  },
];
function App() {
  const [data, setData] = useState<DataColumn[]>([]);
  const [filteredData, setFilteredData] = useState<DataColumn[]>([]);
  const [sortBy, setSortBy] = useState<keyof DataColumn>("created_dt");
  const [orderBy, setOrderBy] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);

  const paginatedData = filteredData.slice(page * 20, (page + 1) * 20);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData: DataColumn[]) => {
        setData(jsonData);
        setFilteredData(jsonData);
      })
      .catch((error) => console.error("Error fetching JSON file:", error));
  }, []);

  useEffect(() => {
    handleFilter(sortBy, orderBy, searchTerm);
  }, [data, sortBy, orderBy, searchTerm]);

  const handleFilter = (column: keyof DataColumn, order: string, search: string) => {
    setPage(0);
    setSortBy(column);
    setOrderBy(order);
    const lowercasedTerm = search.toLowerCase();
    const filtered = data.filter((item) =>
      item[sortBy].toString().toLowerCase().includes(lowercasedTerm)
    );
    const sortedData = filtered.sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleSearch = (searchTerm: string) => {
    setPage(0);
    setSearchTerm(searchTerm);
  };

  const createFilters = (
    filterData: typeof orderByData,
    type: "sort" | "order"
  ) => (
    <Filters
      data={filterData}
      type={type}
      handleFilter={handleFilter}
      sortBy={sortBy}
      orderBy={orderBy}
      disabled={data.length < 1}
    />
  );

  const createTable = () => {
    if (data.length < 1) {
      return (
        <div className="flex justify-center">
          <div className="flex flex-col w-[80%]">
            <p className="text-[20px] text-center mb-[30px]">Loading data</p>
            <LinearProgress />
          </div>
        </div>
      );
    } else if (filteredData.length < 1) {
      return <p className="text-[30px] font-[600] text-center mt-[50px]">No results found</p>;
    } else {
      return (
        <DataTable
          data={paginatedData}
          total={filteredData.length}
          page={page}
          setPage={setPage}
        />
      );
    }
  };

  return (
    <div className="px-[20px]">
      <p className="text-[25px] font-[600] text-center mt-[15px]">
        FMSCA Viewer
      </p>
      <p className="text-[18px] font-[600] ml-[10px] mt-[20px]">Filters:</p>
      <div className="flex gap-x-[30px] mb-[30px]">
        {createFilters(columns, "sort")}
        {createFilters(orderByData, "order")}
      </div>
      <div className="pl-[8px] mb-[30px]">
      <Search onSearch={handleSearch} />
      </div>
      {createTable()}
    </div>
  );
}

export default App;
