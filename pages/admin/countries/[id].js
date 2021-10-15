import React, { useState } from "react";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ThreeGraphs from "../../../components/ThreeGraphs/ThreeGraphs";
import CountryTab1 from "../../../components/CountryTab1/CountryTab1.js";
import CountryTab2 from "../../../components/CountryTab2/CountryTab2.js";

import config from "../../../config.js";


const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
};



/**
 * Country Page
 */
function Countries({ country }) {

  const [indexTab, setIndexTab] = useState(0);


  return (
    <div>
      <h3>Country Data: {country.today.country}</h3>
      <ThreeGraphs data={country} />
      <div>
        <Paper square>
          <Tabs
            indicatorColor="primary"
            value={indexTab}
            onChange={(event, tab) => setIndexTab(tab)}
          >
            <Tab label="Data" />
            <Tab label="Country data per day" />
          </Tabs>
        </Paper>
        {indexTab === 0 && <TabContainer><CountryTab1 country={country} /></TabContainer>}
        {indexTab === 1 && <TabContainer><CountryTab2 country={country} /></TabContainer>}
      </div>
    </div>
  );
}

Countries.getInitialProps = async (ctx) => {

  const { query } = ctx;

  const res = await fetch(`${config.url_api}/api/countries/${query.id}`)
  const country = await res.json()
  return { country }
}

Countries.layout = Admin;

export default Countries;
