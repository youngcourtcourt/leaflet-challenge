var startTime='2014-01-01'
var endTime='2014-01-02'

var url=`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}`

d3.json(url).then(function(data){

    var features=data.features[1]
    // console.log(features.properties.time)

    var lat=features.geometry.coordinates[1]
    var long=features.geometry.coordinates[0]
    var depth=features.geometry.coordinates[2]
    var mag=features.properties.mag
    var place=features.properties.place
    var time=new Date(features.properties.time)

})