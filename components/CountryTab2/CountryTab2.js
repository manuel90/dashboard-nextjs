import React, { useState } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


import moment from 'moment';

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";



/**
 * Country Tab 2
 */

function CountryTab2({ country }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const tableHeadsTab2 = [
    { id: "date", label: "Date", type: "text", key: "date" },
    { id: "cases", label: "New Cases", type: "number", key: "cases" },
    { id: "recovered", label: "Patient Recovered", type: "number", key: "recovered" },
    { id: "deaths", label: "Deaths", type: "number", key: "deaths" },
  ];


  const [tab2SortBy, setTab2SortBy] = useState('date');
  const [tab2Order, setTab2Order] = useState('asc');


  const indexTab2SortBy = tableHeadsTab2.findIndex((head) => head.id === tab2SortBy);



  const compareNumbers = (a, b) => {
    if (tab2Order === 'desc') {
      return parseInt(a[indexTab2SortBy]) - parseInt(b[indexTab2SortBy]);
    } else {
      return parseInt(b[indexTab2SortBy]) - parseInt(a[indexTab2SortBy]);
    }
  };

  const compareTitles = (a, b) => {

    if (tab2Order === 'desc') {
      if (a[indexTab2SortBy] > b[indexTab2SortBy]) {
        return 1;
      }
      if (a[indexTab2SortBy] < b[indexTab2SortBy]) {
        return -1;
      }
    } else {
      if (a[indexTab2SortBy] < b[indexTab2SortBy]) {
        return 1;
      }
      if (a[indexTab2SortBy] > b[indexTab2SortBy]) {
        return -1;
      }
    }
    return 0;
  };

  const compareSorting = indexTab2SortBy >= 0 && tableHeadsTab2[indexTab2SortBy].type === 'number' ? compareNumbers : compareTitles;


  const dataTableTab2 = [
    [
      moment().format('DD MMM YYYY'),
      //Graph formula applied
      Math.abs(country.yesterday.cases - country.today.cases),
      Math.abs(country.yesterday.recovered - country.today.recovered),
      Math.abs(country.yesterday.deaths - country.today.deaths),
    ],
    [
      moment().subtract(1, 'days').format('DD MMM YYYY'),
      //Graph formula applied
      Math.abs(country.twoDaysAgo.cases - country.yesterday.cases),
      Math.abs(country.twoDaysAgo.recovered - country.yesterday.recovered),
      Math.abs(country.twoDaysAgo.deaths - country.yesterday.deaths),
    ],
    [
      moment().subtract(2, 'days').format('DD MMM YYYY'),
      //Graph formula applied
      Math.abs(country.twoDaysAgo.cases - country.yesterday.cases),
      Math.abs(country.twoDaysAgo.recovered - country.yesterday.recovered),
      Math.abs(country.twoDaysAgo.deaths - country.yesterday.deaths),
    ],
  ];


  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="dark">
          <h4 className={classes.cardTitleWhite}>Country data per day</h4>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="gray"
            tableHead={tableHeadsTab2}
            tableData={(dataTableTab2.sort(compareSorting)).map((singleGlobalData, idxSingleGlobalData) => {
              return tableHeadsTab2.map((head, index) => {

                if (head.key === 'updated') {
                  return moment(singleGlobalData[index], 'x').format("DD - MMM - YYYY LTS");
                }

                return `${singleGlobalData[index]}`;
              });
            })}
            onRequestSort={(event, property) => {
              if (property === tab2SortBy) {
                setTab2Order(tab2Order === 'desc' ? 'asc' : 'desc')
              } else {
                setTab2SortBy(property);
              }
            }}
            page={0}
            rowsPerPage={10}
            orderBy={tab2SortBy}
            order={tab2Order}

          />
        </CardBody>
      </Card>
    </GridItem>
  );
}
export default CountryTab2;
