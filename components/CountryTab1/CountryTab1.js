import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


import moment from 'moment';

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";


/**
 * Country Tab 1
 */

function CountryTab1({ country }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();


  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="dark">
          <h4 className={classes.cardTitleWhite}>Updated on {moment(country.today.updated).format('DD MMMM YYYY LTS')}</h4>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
              <h3>{country.today.cases}</h3>
              <div><label>Total Cases</label></div>
            </GridItem>
            <GridItem xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
              <h3>{Math.abs(country.yesterday.cases - country.today.cases)}</h3>
              <div><label>New Cases</label></div>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
              <h3>{country.today.recovered}</h3>
              <div><label>Total Recovered</label></div>
            </GridItem>
            <GridItem xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
              <h3>{Math.abs(country.yesterday.recovered - country.today.recovered)}</h3>
              <div><label>New Recovered</label></div>
            </GridItem>
          </GridContainer>


          <GridContainer>
            <GridItem xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
              <h3>{country.today.deaths}</h3>
              <div><label>Total Deaths</label></div>
            </GridItem>
            <GridItem xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
              <h3>{Math.abs(country.yesterday.deaths - country.today.deaths)}</h3>
              <div><label>New Deaths</label></div>
            </GridItem>
          </GridContainer>


          <GridContainer>
            <GridItem xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
              <h3>{country.today.tests}</h3>
              <div><label>Total Tests</label></div>
            </GridItem>
            <GridItem xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
              <h3>{Math.abs(country.yesterday.tests - country.today.tests)}</h3>
              <div><label>New Tests</label></div>
            </GridItem>
          </GridContainer>

        </CardBody>
      </Card>
    </GridItem>
  );
}

export default CountryTab1;
