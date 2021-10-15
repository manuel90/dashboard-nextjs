import React, { useState } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DashboardTab1 from "components/DashboardTab1/DashboardTab1.js";
import DashboardTab2 from "components/DashboardTab2/DashboardTab2.js";
import ThreeGraphs from "../../components/ThreeGraphs/ThreeGraphs";

import config from "../../config.js";


import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";


const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
};


/**
 * Dashboard page
 */

function Dashboard({ countries, globalData }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();


  const [indexTab, setIndexTab] = useState(0);

  return (
    <div>
      <ThreeGraphs data={globalData} />
      <div>
        <Paper square>
          <Tabs
            indicatorColor="primary"
            value={indexTab}
            onChange={(event, tab) => setIndexTab(tab)}
          >
            <Tab label="List by country" />
            <Tab label="Global data per day" />
          </Tabs>
        </Paper>
        {indexTab === 0 && <TabContainer><DashboardTab1 countries={countries} /></TabContainer>}
        {indexTab === 1 && <TabContainer><DashboardTab2 globalData={globalData} /></TabContainer>}
      </div>
    </div>
  );
}

Dashboard.getInitialProps = async (ctx) => {
  const res1 = await fetch(`${config.url_api}/api/countries`)
  const countries = await res1.json()


  const res2 = await fetch(`${config.url_api}/api/all-world-data`)
  const globalData = await res2.json()

  return { countries, globalData }
}

Dashboard.layout = Admin;

export default Dashboard;
