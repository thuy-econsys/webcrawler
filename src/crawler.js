const axios = require('axios');

const args = process.argv.slice(2);
const url = args[0];

const { 
  url_parser, 
  build_url_string, 
  return_params 
} = require('./url_parser');

// AXIOS query string
const url_obj = url_parser(url);
const url_str = build_url_string(url_obj);

// const { data } = axios.get(
//   url_str
// )
// .then((response) => {
//   console.log(response.data.items);
// })
// .catch((err) => {
//   console.log(err);
// });

// AXIOS params
const base_url = url_obj['base_url'];
const param_obj = return_params(url_obj);

const { data } = axios.get(
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