interface Column {
  value: 'created_dt'
  |'data_source_modified_dt'
  |'entity_type'
  |'operating_status'
  |'legal_name'
  |'dba_name'
  |'physical_address'
  |'phone'
  |'usdot_number'
  |'mc_mx_ff_number'
  |'power_units'
  |'out_of_service_date'

  label: string;
  minWidth?: number;
}

export const columns: Column[] = [
  { value: 'created_dt', label: "Created_DT", minWidth: 170 },
  { value: 'data_source_modified_dt', label: "Modifed_DT", minWidth: 100 },
  {
    value: 'entity_type',
    label: "Entity",
    minWidth: 170,
  },
  {
    value: 'operating_status',
    label: "Operating status",
    minWidth: 170,
  },
  {
    value: 'legal_name',
    label: "Legal name",
    minWidth: 170,
  },
  {
    value: 'dba_name',
    label: "DBA name",
    minWidth: 170,
  },
  {
    value: 'physical_address',
    label: "Physical address",
    minWidth: 170,
  },
  {
    value: 'phone',
    label: "Phone",
    minWidth: 170,
  },
  {
    value: 'usdot_number',
    label: "DOT",
    minWidth: 170,
  },
  {
    value: 'mc_mx_ff_number',
    label: "MC/MX/FF",
    minWidth: 170,
  },
  {
    value: 'power_units',
    label: "Power units",
    minWidth: 170,
  },
  {
    value: 'out_of_service_date',
    label: "Out of service date",
    minWidth: 170,
  },
];
