
//let maptoken =  process.env.MAP_TOKEN ;
  console.log("MAP TOKEN:", mapToken);


mapboxgl.accessToken = mapToken;
console.log(mapToken);
console.log(coordinates);
console.log(title);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({ color: 'black' })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h6>${title}</h6> <p>>Exact location provided after booking </p>`))
    .addTo(map);