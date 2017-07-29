import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.onCreated(function mainOnCreated() {
   this.counter = new ReactiveVar(0);
   this.message = new ReactiveVar("");
   this.map;
});


Template.main.onRendered(function mainOnRendered()
{
   if (Meteor.isClient)
   {
      L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

      var bgn = [-35.3310416, 149.1256633];
      var map = Template.instance().map;
      var opt = { doubleClickZoom: true,
                  zoomControl: false,
                  touchZoom: true,
                  scrollWheelZoom: true,
                  maxZoom: 20 }
      map = L.map('map', opt)
         .setView(bgn, 13);

      L.tileLayer.provider('Thunderforest.Transport').addTo(map);

      // var bgnMsg = "<b>Hello!</b><br>Search a location above.<br>Pinpoint your current location with the button below.";
      // var marker = L.marker(bgn);
      // marker.addTo(map);
      // marker.bindPopup(bgnMsg).openPopup();

      L.control.zoom().setPosition('bottomright').addTo(map);

      var popup = L.popup();

      map.on('click', function(e){
         popup
             .setLatLng(e.latlng)
             .setContent("This location is:<br>" + e.latlng.toString())
             .openOn(map);
      });

      var circle = L.circle([-35.3310416, 149.1256633], 500, {
         color: 'red',
         fillColor: '#f03',
         fillOpacity: 0.5
      });
      circle.addTo(map);
      circle.bindPopup("I am a circle.");


      Template.instance().message.set("Map Loaded");
      Template.instance().map = map;
   }

});

Template.main.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  message() {
    return Template.instance().message.get();
  },
});






Template.main.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
    instance.message.set("you pressed the html button");
  },
  "click [data-action='polka']"(event, instance) {
    instance.counter.set(instance.counter.get() + 1);
    instance.message.set("you pressed the nice button");
  },
  "click [data-action='quack']"(event, instance) {

     var opt = { setView: true,
                 maxZoom: 16 };
     instance.map.locate(opt);

     instance.map.on("locationfound", function(e){

        var marker = L.marker(e.latlng);
        marker.addTo(instance.map);
        marker.bindPopup("This is your location").openPopup();

        instance.counter.set(999);
        instance.message.set(e.latlng);
     });

  },
});
