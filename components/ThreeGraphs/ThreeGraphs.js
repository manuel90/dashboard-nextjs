import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

import {
  emailsSubscriptionChart,
} from "variables/charts.js";


/**
 * Three Graphs
 */
function ThreeGraphs({ data }) {

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (

    <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
        <Card chart>
          <CardHeader color="warning">
            <ChartistGraph
              className="ct-chart"
              data={{
                labels: [
                  "Yesterday",
                  "Today",
                ],
                //Graph formula applied
                series: [[data.yesterday.cases, Math.abs(data.yesterday.cases - data.today.cases)]],
              }}
              type="Bar"
              options={emailsSubscriptionChart.options}
              responsiveOptions={emailsSubscriptionChart.responsiveOptions}
              listener={emailsSubscriptionChart.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>New Cases per Day</h4>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card chart>
          <CardHeader color="success">
            <ChartistGraph
              className="ct-chart"
              data={{
                labels: [
                  "Yesterday",
                  "Today",
                ],
                //Graph formula applied
                series: [[data.yesterday.recovered, Math.abs(data.yesterday.recovered - data.today.recovered)]],
              }}
              type="Bar"
              options={emailsSubscriptionChart.options}
              responsiveOptions={emailsSubscriptionChart.responsiveOptions}
              listener={emailsSubscriptionChart.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Patient Recoverd per Day</h4>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card chart>
          <CardHeader color="danger">
            <ChartistGraph
              className="ct-chart"
              data={{
                labels: [
                  "Yesterday",
                  "Today",
                ],
                //Graph formula applied
                series: [[data.yesterday.deaths, Math.abs(data.yesterday.deaths - data.today.deaths)]],
              }}
              type="Bar"
              options={emailsSubscriptionChart.options}
              responsiveOptions={emailsSubscriptionChart.responsiveOptions}
              listener={emailsSubscriptionChart.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Deaths per Day</h4>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

export default ThreeGraphs;
