import { XGrid, GridColDef } from "@material-ui/x-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "date", headerName: "Published Date", width: 200 },
  { field: "severity", headerName: "Severity", width: 130, filterable: true },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    filterable: false,
    sortable: false,
  },
];
function createSeverityString(severity: {
  low: boolean;
  medium: boolean;
  high: boolean;
}) {
  let string = "";
  const severities = Object.entries(severity);
  for (let i = 0; i < severities.length; i++) {
    if (severities[i][1]) {
      string += severities[i][0] + "|";
    }
  }
  string = string.slice(0, -1);
  return string;
}
export default function DataTable(props: {
  data?: any;
  selectedYear: number;
  filter: {
    cve: string | undefined;
    severity: { low: boolean; medium: boolean; high: boolean };
  };
}) {
  const severityString = createSeverityString(props.filter.severity);
  const selectedYear = props.selectedYear.toString();
  const rows = props.data;
  console.log(severityString);
  return (
    <div style={{ height: 400, width: "100%" }}>
      {rows ? (
        <XGrid
          filterModel={{
            items: [
              {
                columnField: "severity",
                operatorValue: "contains",
                value: severityString,
              },
              {
                columnField: "id",
                operatorValue: "contains",
                value: props.filter.cve,
              },
              {
                columnField: "date",
                operatorValue: "contains",
                value: selectedYear,
              },
            ],
          }}
          rows={rows}
          columns={columns}
          pageSize={5}
          pagination={true}
        />
      ) : (
        "Please wait"
      )}
    </div>
  );
}
