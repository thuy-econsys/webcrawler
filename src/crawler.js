const axios = require('axios');

const args = process.argv.slice(2);
const url = args[0];

const { 
  url_parser, 
  build_url_string, 
  return_params 
} = require('./url_parser');

// AXIOS params
const url_obj = url_parser(url);
const base_url = url_obj['base_url'];
const param_obj = return_params(url_obj);

(async () => {
  const resp = await axios.get(
    base_url,
    {
      params: param_obj
    }
  )
  .then((response) => {
    console.log(response.data.items);
  })
  .catch((err) => {
    console.log(err);
  });
})();

