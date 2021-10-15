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
 * Dashboard Tab 2
 */

function DashboardTab2({ globalData }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();


  const tableHeadsGlobalData = [
    { id: "date", label: "Date", type: "text", key: "date" },
    { id: "cases", label: "New Cases", type: "number", key: "cases" },
    { id: "recovered", label: "Patient Recovered", type: "number", key: "recovered" },
    { id: "deaths", label: "Deaths", type: "number", key: "deaths" },
  ];



  const [globalDataSortBy, setGlobalDataSortBy] = useState('date');
  const [globalDataOrder, setGlobalDataOrder] = useState('asc');


  const indexGlobalDataSortBy = tableHeadsGlobalData.findIndex((head) => head.id === globalDataSortBy);



  const compareNumbersGlobalData = (a, b) => {
    if (globalDataOrder === 'desc') {
      return parseInt(a[indexGlobalDataSortBy]) - parseInt(b[indexGlobalDataSortBy]);
    } else {
      return parseInt(b[indexGlobalDataSortBy]) - parseInt(a[indexGlobalDataSortBy]);
    }
  };

  const compareTitlesGlobalData = (a, b) => {
    if (globalDataOrder === 'desc') {
      if (a[indexGlobalDataSortBy] > b[indexGlobalDataSortBy]) {
        return 1;
      }
      if (a[indexGlobalDataSortBy] < b[indexGlobalDataSortBy]) {
        return -1;
      }
    } else {
      if (a[indexGlobalDataSortBy] < b[indexGlobalDataSortBy]) {
        return 1;
      }
      if (a[indexGlobalDataSortBy] > b[indexGlobalDataSortBy]) {
        return -1;
      }
    }
    return 0;
  };

  const compareSortingGlobalData = indexGlobalDataSortBy >= 0 && indexGlobalDataSortBy.type === 'number' ? compareNumbersGlobalData : compareTitlesGlobalData;



  const dataTableWorld = [
    [
      moment().format('DD MMM YYYY'),
      //Graph formula applied
      Math.abs(globalData.yesterday.cases - globalData.today.cases),
      Math.abs(globalData.yesterday.recovered - globalData.today.recovered),
      Math.abs(globalData.yesterday.deaths - globalData.today.deaths),
    ],
    [
      moment().subtract(1, 'days').format('DD MMM YYYY'),
      //Graph formula applied
      Math.abs(globalData.twoDaysAgo.cases - globalData.yesterday.cases),
      Math.abs(globalData.twoDaysAgo.recovered - globalData.yesterday.recovered),
      Math.abs(globalData.twoDaysAgo.deaths - globalData.yesterday.deaths),
    ],
    [
      moment().subtract(2, 'days').format('DD MMM YYYY'),
      //Graph formula applied
      Math.abs(globalData.twoDaysAgo.cases - globalData.yesterday.cases),
      Math.abs(globalData.twoDaysAgo.recovered - globalData.yesterday.recovered),
      Math.abs(globalData.twoDaysAgo.deaths - globalData.yesterday.deaths),
    ],
  ];


  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="dark">
          <h4 className={classes.cardTitleWhite}>Global date per day</h4>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="gray"
            tableHead={tableHeadsGlobalData}
            tableData={(dataTableWorld.sort(compareSortingGlobalData)).map((singleGlobalData, idxSingleGlobalData) => {
              return tableHeadsGlobalData.map((head, index) => {

                if (head.key === 'updated') {
                  return moment(singleGlobalData[index], 'x').format("DD - MMM - YYYY LTS");
                }

                return `${singleGlobalData[index]}`;
              });
            })}
            onRequestSort={(event, property) => {
              if (property === globalDataSortBy) {
                setGlobalDataOrder(globalDataOrder === 'desc' ? 'asc' : 'desc')
              } else {
                setGlobalDataSortBy(property);
              }
            }}
            page={0}
            rowsPerPage={10}
            orderBy={globalDataSortBy}
            order={globalDataOrder}

          />
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default DashboardTab2;
