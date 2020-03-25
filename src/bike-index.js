export class BikeIndex {
  async getBike(manufacturer, location) {
    try {
      let params = [];

      params.push("stolenness=proximity");
      if (manufacturer) {
        params.push(`manufacturer=${manufacturer}`);
      }
      if (location) {
        params.push(`location=${location})`);
      } else {
        params.push(`location=ip`);
      }

      const url = `https://bikeindex.org/api/v3/search?${params.join("&")}`;

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

// Alternative method
// try {
//   const params1 = new URLSearchParams();

//   params1.set("stolenness", "proximity");

//   if (manufacturer) {
//     params1.set("manufacturer", manufacturer);
//   }
//   if (location) {
//     params1.set("location", location);
//   } else {
//     params1.set("location", "ip");
//   }
//   const url = `https://bikeindex.org/api/v3/search?${params1.toString()}`;
