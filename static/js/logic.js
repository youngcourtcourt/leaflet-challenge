var myMap=L.map("map", {
    center:[17.92, -66.92], 
    zoom:3
})

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 10,
  zoomOffset: -1,
  id: 'mapbox/streets-v11',
  accessToken: API_KEY
}).addTo(myMap);


var startTime='2020-01-01'
var endTime='2020-01-02'

var url=`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}`

function getColor(depth){
    
    if (depth<10){
        return "#fafa6e"

    }else if(depth<30){
        return "#9cdf7c"
    }else if(depth<50){
        return "#4abd8c"
    }else if(depth<70){
        return "#00968e"
    }else if(depth<90){
        return "#106e7c"
    }else{
        return "#2a4858"
    }
}



var legend = L.control({
    position: "bottomright"
  })
  
  // When the layer control is added, insert a div with the class of "legend"
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades=[10,30,50,70,90]
    labels=[]
    // var labels=['#fafa6e','#9cdf7c','#4abd8c','#00968e','#106e7c','#2a4858']
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
  };
  // Add the info legend to the map
  legend.addTo(myMap);


d3.json(url).then(function(data){

    for (var i=0;i<data.features.length;i++){
    
    var features=data.features[i]

    var lat=features.geometry.coordinates[1]
    var long=features.geometry.coordinates[0]
    var depth=features.geometry.coordinates[2]
    var mag=features.properties.mag
    var place=features.properties.place
    var time=new Date(features.properties.time)

    var circles=L.circle([lat,long],{
        color:"none",
        fillColor:getColor(depth),
        fillOpacity:0.85,
        radius:(mag*50000)
    }).bindPopup(`<h2>${place}</h2><hr><p>${time} Magnitude:${mag} Depth: ${depth}</p>`)
    .addTo(myMap)

   
    
}
})