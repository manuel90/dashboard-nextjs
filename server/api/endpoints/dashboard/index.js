module.exports = ({ axios }) => ({
  allWorldData: async (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    const today = await axios({
      method: 'get',
      url: "https://disease.sh/v3/covid-19/all",
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const yesterday = await axios({
      method: 'get',
      url: "https://disease.sh/v3/covid-19/all?yesterday=1",
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const twoDaysAgo = await axios({
      method: 'get',
      url: "https://disease.sh/v3/covid-19/all?twoDaysAgo=1",
      headers: {
        'Content-Type': 'application/json'
      },
    });

    res.json({
      today: today.data,
      yesterday: yesterday.data,
      twoDaysAgo: twoDaysAgo.data,
    });
  },


  allCountries: async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    const { data } = await axios({
      method: 'get',
      url: "https://disease.sh/v3/covid-19/countries",
      headers: {
        'Content-Type': 'application/json'
      },
    });


    res.json(data);
  },
  getCountry: async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    const today = await axios({
      method: 'get',
      url: `https://disease.sh/v3/covid-19/countries/${req.params.id}`,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const yesterday = await axios({
      method: 'get',
      url: `https://disease.sh/v3/covid-19/countries/${req.params.id}?yesterday=1`,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const twoDaysAgo = await axios({
      method: 'get',
      url: `https://disease.sh/v3/covid-19/countries/${req.params.id}?twoDaysAgo=1`,
      headers: {
        'Content-Type': 'application/json'
      },
    });


    res.json({
      today: today.data,
      yesterday: yesterday.data,
      twoDaysAgo: twoDaysAgo.data,
    });
  }
})
