import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DataColumn } from "../../App";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Filters = ({
  data,
  handleFilter,
  orderBy,
  sortBy,
  disabled,
  type,
}: Readonly<{
  data: { value: string; label: string }[];
  handleFilter: (column: keyof DataColumn, order: string, search: string) => void;
  orderBy: string;
  sortBy: keyof DataColumn;
  disabled: boolean;
  type: 'sort' | 'order'
}>) => {
  const handleChange = (event: SelectChangeEvent<typeof orderBy | typeof sortBy>) => {
    const {
      target: { value },
    } = event;
    if (type === 'sort') {
        handleFilter(value as keyof DataColumn, orderBy, '')
    } else {
        handleFilter(sortBy, value, '');
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          value={type === 'sort' ? sortBy : orderBy}
          onChange={handleChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          disabled={disabled}
        >
          <MenuItem disabled value="">
            <em>{type === 'sort' ? 'Sort by' : 'Order by'}</em>
          </MenuItem>
          {data.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
