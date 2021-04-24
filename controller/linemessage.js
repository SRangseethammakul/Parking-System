const axios = require('axios');
async function getCovid() {
    try {
      const response = await axios.get('https://covid19.th-stat.com/api/open/today');
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
module.exports = {
    getCovid
}