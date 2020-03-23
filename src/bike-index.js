export class BikeIndex {
  async getBike(manufacturer, location) {
    try {
      const url = `https://bikeindex.org/api/v3/search?page=1&per_page=20&manufacturer=${manufacturer}&location=${location}`;

      let response = await fetch(url, {});

      let jsonifiedResponse;
      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();

        console.log(jsonifiedResponse);
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch (e) {
      return false;
    }
  }
}
