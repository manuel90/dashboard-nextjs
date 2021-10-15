import React, { useState } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import ArrowRightAltOutlined from "@material-ui/icons/ArrowRightAltOutlined";

import moment from 'moment';
import { useRouter } from 'next/router'

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";



/**
 * Dashboard Tab 1
 */

function DashboardTab1({ countries }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();

  const tableHeads = [
    { id: "country_name", label: "Country name", type: "text", key: "country" },
    { id: "cases", label: "Cases", type: "number", key: "cases" },
    { id: "today_cases", label: "Today Cases", type: "number", key: "todayCases" },
    { id: "recovered", label: "Recovered", type: "number", key: "recovered" },
    { id: "today_recovered", label: "Today Recovered", type: "number", key: "todayRecovered" },
    { id: "deaths", label: "Deceased", type: "number", key: "deaths" },
    { id: "today_deaths", label: "Today Deceased", type: "number", key: "todayDeaths" },
    { id: "tests", label: "Today Tests", type: "number", key: "tests" },
    { id: "active", label: "Active Cases", type: "number", key: "active" },
    { id: "critical", label: "Critical Cases", type: "number", key: "critical" },
    { id: "updated", label: "Last updated", type: "number", key: "updated" },
    { id: "action", label: "Action", type: "none", key: "action" },
  ];



  const [countriesPage, setCountriesPage] = useState(0);
  const [countriesRowsPerPage, setCountriesRowsPerPage] = useState(10);
  const [countriesSortBy, setCountriesSortBy] = useState('country_name');
  const [countriesOrder, setCountriesOrder] = useState('desc');


  const indexSortBy = tableHeads.findIndex((head) => head.id === countriesSortBy);



  const compareNumbers = (a, b) => {
    if (countriesOrder === 'desc') {
      return parseInt(a[tableHeads[indexSortBy].key]) - parseInt(b[tableHeads[indexSortBy].key]);
    } else {
      return parseInt(b[tableHeads[indexSortBy].key]) - parseInt(a[tableHeads[indexSortBy].key]);
    }
  };

  const compareTitles = (a, b) => {

    if (countriesOrder === 'desc') {
      if (a[tableHeads[indexSortBy].key] > b[tableHeads[indexSortBy].key]) {
        return 1;
      }
      if (a[tableHeads[indexSortBy].key] < b[tableHeads[indexSortBy].key]) {
        return -1;
      }
    } else {
      if (a[tableHeads[indexSortBy].key] < b[tableHeads[indexSortBy].key]) {
        return 1;
      }
      if (a[tableHeads[indexSortBy].key] > b[tableHeads[indexSortBy].key]) {
        return -1;
      }
    }
    return 0;
  };

  const compareSorting = indexSortBy >= 0 && tableHeads[indexSortBy].type === 'number' ? compareNumbers : compareTitles;

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="dark">
          <h4 className={classes.cardTitleWhite}>List by Country</h4>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="gray"
            tableHead={tableHeads}
            tableData={(countries.sort(compareSorting)).map((country, idxCountry) => {

              return tableHeads.map((head) => {

                if (head.key === 'updated') {
                  return moment(country[head.key], 'x').format("DD - MMM - YYYY");
                }

                if (head.key === 'action') {
                  return (
                    <IconButton
                      aria-label="Edit"
                      className={classes.tableActionButton}
                      onClick={() => {
                        router.push(`/admin/countries/${country.countryInfo.iso2.toLowerCase()}`);
                      }}
                    >
                      <ArrowRightAltOutlined
                        className={
                          classes.tableActionButtonIcon + " " + classes.edit
                        }
                      />
                    </IconButton>
                  )
                }

                return country[head.key];
              });
            })}
            page={countriesPage}
            rowsPerPage={countriesRowsPerPage}
            onChangePage={(event, page) => {
              setCountriesPage(page)
            }}
            onChangeRowsPerPage={(event) => {
              setCountriesRowsPerPage(parseInt(event.target.value));
            }}
            onRequestSort={(event, property) => {
              if (property === countriesSortBy) {
                setCountriesOrder(countriesOrder === 'desc' ? 'asc' : 'desc')
              } else {
                setCountriesSortBy(property);
              }
            }}
            orderBy={countriesSortBy}
            order={countriesOrder}

          />
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default DashboardTab1;
