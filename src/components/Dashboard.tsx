/**
 * Copyright (c) Dominik Zaczek.
 *
 * Not to be used commercially under the rule of law. You'll be arrested.
 *
 */

import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Chart from "./Dashboard/Chart";
import DataTable from "./Dashboard/DataGrid";
import axios from "axios";
import SelectYear from "./Sidebar/SelectYear";
import Severity from "./Sidebar/Severity";
import SearchInput from "./TopBar/SearchInput";
import { Button } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://dominikzaczek.com">
        Dominik Zaczek
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

function normalizeData(data: { CVE_Items: [] }): Row[] {
  return data.CVE_Items.map((item: any) => {
    return {
      date: new Date(item.publishedDate).toLocaleDateString("en-gb", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      severity: item.impact.baseMetricV2
        ? item.impact.baseMetricV2.severity
        : "UNKNOWN",
      description: item.cve.description.description_data[0].value,
      id: item.cve.CVE_data_meta["ID"],
      month: new Date(item.publishedDate).toLocaleDateString("en-gb", {
        month: "long",
      }),
      year: new Date(item.publishedDate).getFullYear(),
    };
  });
}

function getYears(data: any) {
  const output = new Set<number>();
  for (let i = 0; i < data.length; i++) {
    output.add(data[i].year);
  }
  return Array.from(output);
}
export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<Row[]>();
  // eslint-disable-next-line
  const [error, setError] = React.useState();
  const [searchInput, setSearchInput] = React.useState("");
  const [selectedSeverity, setSelectedSeverity] = React.useState({
    low: true,
    medium: true,
    high: true,
  });
  const [years, setYears] = React.useState<number[]>([]);
  const [selectedYear, setSelectedYear] = React.useState<number>(0);

  React.useEffect(() => {
    /* TODO: retrieve from endpoint */
    axios("./CVE.json")
      .then((response) => {
        const output = normalizeData(response.data);
        setData(output);
        const setOfYears = getYears(output);
        setYears(setOfYears);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }, []);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const filters = {
    cve: searchInput,
    severity: selectedSeverity,
  };
  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
  };
  const handleSeveritySelection = (value: "low" | "medium" | "high") => {
    setSelectedSeverity({
      ...selectedSeverity,
      [value]: !selectedSeverity[value],
    });
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <SearchInput onChange={(e: any) => setSearchInput(e.target.value)} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SelectYear
          years={Array.from(years)}
          onChange={(year) => handleSelectYear(year)}
          selectedYear={selectedYear}
        />
        <Severity
          selectedSeverity={selectedSeverity}
          onChange={handleSeveritySelection}
        />
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => {
            setSelectedYear(0);
            setSelectedSeverity({ low: false, medium: false, high: false });
          }}
        >
          Reset
        </Button>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {searchInput ? <p>Searching for ID: {searchInput}</p> : null}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <DataTable
                  data={data}
                  filter={filters}
                  selectedYear={selectedYear}
                />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Chart
                  data={data}
                  year={selectedYear}
                  severity={selectedSeverity}
                />
              </Paper>
            </Grid>
            {/* Recent Orders */}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
