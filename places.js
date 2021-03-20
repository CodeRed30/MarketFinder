

axios({
    url: "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name&key=AIzaSyAC-ma0QCUNohTjfvCeOGgm2NW7ilzpWf0",
    method: 'get'
  }).then(response => {
    console.log('working api');
  }).catch(function (error) {
    // handle error
    console.log(error);
  });