import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";

export const Search = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);

  return (
    <FormControl className="w-[300px]">
      <TextField
        size="small"
        variant="outlined"
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              className="cursor-pointer"
              style={{ display: searchTerm.length > 0 ? "flex" : "none" }}
              onClick={() => setSearchTerm("")}
            >
              <ClearIcon />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};
