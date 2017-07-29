import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
   Meteor.startup(function() {
     SSLProxy({
        port: 3100, //or 443 (normal port/requires sudo)
        ssl : {
             key: Assets.getText("server.key"),
             cert: Assets.getText("server.crt"),

             //Optional CA
             //Assets.getText("ca.pem")
        }
     });
 });
});
