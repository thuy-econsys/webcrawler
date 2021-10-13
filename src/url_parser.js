const args = process.argv.slice(2);
// https://www.usnews.com/education/best-global-universities/search?region=africa&subject=space-science&format=json
// https://www.usnews.com/education/best-global-universities/search?region=africa&subject=space-science&enrollment-min=12648&format=json
const url = args[0];

// TODO numerical values breaks this
const regexp = "([^?=&]+)(=([^&]*))?";

const url_parser = (uri) => {
  const decoded_uri = decodeURIComponent((uri+'').replace(/\+/g, '%20'));
  let obj = {};

  decoded_uri.match(
    new RegExp(regexp, 'g')
  ).forEach(function (element) {
    let [key, value] = element.split("=");

    if (element.indexOf('http') !== -1) {
      obj['base_url'] = element;
    } else {
      obj[key] = value;
    }
  },
  {}); // return
  
  return obj;
}

const build_url_string = (uri_obj) => {
  let url_string = "";

  for (let key in uri_obj) {
    if (key === 'base_url') {
      url_string += uri_obj[key]+"?";
    } else {
      url_string += key+"="+uri_obj[key]+"&";
    }
  }
 
  return (url_string.slice(0,-1));
}


const return_params = (uri_obj) => {
  delete uri_obj['base_url'];

  return uri_obj;
}

module.exports = { url_parser, build_url_string, return_params };
