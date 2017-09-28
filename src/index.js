// Train Empire Skill
'use strict';
var Alexa = require("alexa-sdk");
var appId = 'amzn1.ask.skill.c38bed75-d337-4724-b6ae-731c8f218116';

// common game variables.
const startingBudget = 1000000000;
const stationCost = 100000000;
const railCostPerMile = 500000;
const monthlyStationCosts = 2500000;
const monthlyRailMilageCosts = 10000;

// these are the available cities when the game initially begins
var cities = ["New York City","Los Angeles","Chicago","Dallas","Houston","Washington",
    "Philadelphia","Miami","Atlanta","Boston","San Francisco","Phoenix","Riverside",
    "Detroit","Seattle","Minneapolis","San Diego","Tampa","Denver","Baltimore",
    "Charlotte","Orlando","San Antonio","Portland",
    "Milwaukee","Indianapolis","Richmond","Wilmington","Virginia Beach",
    "Albuquerque","New Orleans","Birmingham","Memphis",
    "Salt Lake City","Las Vegas","Charleston","Raliegh",
    "Jacksonville","St. Louis"];

// this is the population between cities
var cityPopulations = [
    { "cityName":"New York City","population":20000000 },
    { "cityName":"Los Angeles", "population":13300000 },
    { "cityName":"Chicago",     "population":9500000 },
    { "cityName":"Dallas",      "population":7200000 },
    { "cityName":"Houston",     "population":6700000 },
    { "cityName":"Washington",  "population":6100000 },
    { "cityName":"Philadelphia","population":6000000 },
    { "cityName":"Miami",       "population":6000000 },
    { "cityName":"Atlanta",     "population":5700000 },
    { "cityName":"Boston",      "population":4800000 },
    { "cityName":"San Francisco","population":4700000 },
    { "cityName":"Phoenix",     "population":4700000 },
    { "cityName":"Riverside",   "population":4500000 },
    { "cityName":"Detroit",     "population":4300000 },
    { "cityName":"Seattle",     "population":3800000 },
    { "cityName":"Minneapolis", "population":3500000 },
    { "cityName":"San Diego",   "population":3300000 },
    { "cityName":"Tampa",       "population":3000000 },
    { "cityName":"Denver",      "population":2800000 },
    { "cityName":"Baltimore",   "population":2700000 },
    { "cityName":"Charlotte",   "population":2500000 },
    { "cityName":"Orlando",     "population":2400000 },
    { "cityName":"San Antonio", "population":2400000 },
    { "cityName":"Portland",    "population":2400000 },
    { "cityName":"Richmond",    "population":1000000 },
    { "cityName":"Wilmington",  "population":500000 },
    { "cityName":"Virginia Beach", "population":1700000 },
    { "cityName":"Raleigh",     "population":1200000 },
    { "cityName":"Milwaukee",   "population":2000000 },
    { "cityName":"St. Louis",   "population":2800000 },
    { "cityName":"Indianapolis","population":1000000 },
    { "cityName":"Albuquerque", "population":909000 },
    { "cityName":"Memphis",     "population":1300000 },
    { "cityName":"Birmingham",  "population":1100000 },
    { "cityName":"New Orleans", "population":1300000 },
    { "cityName":"Salt Lake City","population":1000000 },
    { "cityName":"Las Vegas",   "population":1000000 },
    { "cityName":"Charleston",   "population":1000000 },
    { "cityName":"Jacksonville",   "population":1000000 }
];

// these are the valid connections between cities including their distances
var cityConnections = [
    {
        "fromCity":"New York City",
        "distances":[
            {"toCity":"Baltimore","distance":190},
            {"toCity":"Washington","distance":226},
            {"toCity":"Boston","distance":190},
            {"toCity":"Philadelphia","distance":97},
            {"toCity":"Hartford","distance":116},
            {"toCity":"Wilmington","distance":127}
        ]
    },
    {
        "fromCity":"Boston",
        "distances":[
            {"toCity":"New York City","distance":190},
            ]
    },
    {
        "fromCity":"Los Angeles",
        "distances":[
            {"toCity":"Riverside","distance":60},
            {"toCity":"San Francisco","distance":380},
            {"toCity":"San Diego","distance":120},
            {"toCity":"Phoenix","distance":370},
            {"toCity":"Las Vegas","distance":270}
            ]
    },
    {
        "fromCity":"San Diego",
        "distances":[
            {"toCity":"Los Angeles","distance":120},
            {"toCity":"Riverside","distance":98}
            ]
    },
    {
        "fromCity":"Riverside",
        "distances":[
            {"toCity":"Los Angeles","distance":60},
            {"toCity":"San Diego","distance":98},
            {"toCity":"Phoenix","distance":320}
            ]
    },
    {
        "fromCity":"Phoenix",
        "distances":[
            {"toCity":"Riverside","distance":320},
            {"toCity":"Los Angeles","distance":370},
            {"toCity":"Albuquerque","distance":421},
            {"toCity":"Las Vegas","distance":297}
            ]
    },
    {
        "fromCity":"Albuquerque",
        "distances":[
            {"toCity":"Phoenix","distance":421},
            {"toCity":"Denver","distance":448},
            {"toCity":"Dallas","distance":647}
            ]  
    },
    {
        "fromCity":"Salt Lake City",
        "distances":[
            {"toCity":"San Francisco","distance":736},
            {"toCity":"Las Vegas","distance":420},
            {"toCity":"Denver","distance":520}
            ]
    },
    {
        "fromCity":"Las Vegas",
        "distances":[
            {"toCity":"Salt Lake City","distance":420},
            {"toCity":"Los Angeles","distance":270},
            {"toCity":"Phoenix","distance":297}
            ]
    },
    {
        "fromCity":"Denver",
        "distances":[
            {"toCity":"Albuquerque","distance":448},
            {"toCity":"Salt Lake City","distance":520},
            {"toCity":"Kansas City","distance":602}
            ]
    },
    {
        "fromCity":"Dallas",
        "distances":[
            {"toCity":"Albuquerque","distance":647},
            {"toCity":"Houston","distance":239},
            {"toCity":"Kansas City","distance":508},
            {"toCity":"San Antonio","distance":274}
            ]
    },
    {
        "fromCity":"Houston",
        "distances":[
            {"toCity":"Dallas","distance":239},
            {"toCity":"San Antonio","distance":197},
            {"toCity":"New Orleans","distance":350}
            ]
    },
    {
        "fromCity":"Atlanta",
        "distances":[
            {"toCity":"Charlotte","distance":244},
            {"toCity":"Nashville","distance":249},
            {"toCity":"Birmingham","distance":147},
            {"toCity":"Jacksonville","distance":345},
            {"toCity":"Charleston","distance":306}
            ]
    },
    {
        "fromCity":"Jacksonville",
        "distances":[
            {"toCity":"Atlanta","distance":345},
            {"toCity":"Tampa","distance":199},
            {"toCity":"Orlando","distance":141},
            {"toCity":"Charleston","distance":238},
            {"toCity":"Jacksonville","distance":546}
            ]
    },
    {
        "fromCity":"Charleston",
        "distances":[
            {"toCity":"Atlanta","distance":306},
            {"toCity":"Jacksonville","distance":238},
            {"toCity":"Charlotte","distance":208}
            ]
    },
    {
        "fromCity":"Orlando",
        "distances":[
            {"toCity":"Jacksonville","distance":141},
            {"toCity":"Tampa","distance":84},
            {"toCity":"Miami","distance":236}
            ]
    },
    {
        "fromCity":"Tampa",
        "distances":[
            {"toCity":"Jacksonville","distance":199},
            {"toCity":"Orlando","distance":84},
            {"toCity":"Miami","distance":270}
            ]
    },
    {
        "fromCity":"Miami",
        "distances":[
            {"toCity":"Tampa","distance":270},
            {"toCity":"Orlando","distance":236}
            ]
    },
    {
        "fromCity":"New Orleans",
        "distances":[
            {"toCity":"Birmingham","distance":343},
            {"toCity":"Jacksonville","distance":546},
            {"toCity":"New Orleans","distance":350}
            ]
    },
    {
        "fromCity":"Birmingham",
        "distances":[
            {"toCity":"Atlanta","distance":147},
            {"toCity":"New Orleans","distance":343},
            {"toCity":"Memphis","distance":239},
            {"toCity":"Nashville","distance":212}
            ]
    },
    {
        "fromCity":"Memphis",
        "distances":[
            {"toCity":"Birmingham","distance":239},
            {"toCity":"Saint Louis","distance":283},
            {"toCity":"Nashville","distance":212}
            ]
    },
    {
        "fromCity":"Saint Louis",
        "distances":[
            {"toCity":"Memphis","distance":283},
            {"toCity":"Chicago","distance":310},
            {"toCity":"Kansas City","distance":251},
            {"toCity":"Indianapolis","distance":243},
            {"toCity":"Nashville","distance":304},
            {"toCity":"Louisville","distance":261}
            ]
    },
    {
        "fromCity":"Indianapolis",
        "distances":[
            {"toCity":"Saint Louis","distance":243},
            {"toCity":"Chicago","distance":180},
            {"toCity":"Detroit","distance":287},
            {"toCity":"Cincinnati","distance":112},
            {"toCity":"Columbus","distance":175}
            ]
    },
    {
        "fromCity":"Detroit",
        "distances":[
            {"toCity":"Indianapolis","distance":287},
            {"toCity":"Chicago","distance":280},
            {"toCity":"Cleveland","distance":180},
            {"toCity":"Columbus","distance":199}
            ]
    },
    {
        "fromCity":"Columbus",
        "distances":[
            {"toCity":"Detroit","distance":199},
            {"toCity":"Indianapolis","distance":175},
            {"toCity":"Louisville","distance":206},
            {"toCity":"Cincinnati","distance":107},
            {"toCity":"Cleveland","distance":142},
            {"toCity":"Pittsburgh","distance":182}
            ]
    },
    {
        "fromCity":"Cincinnati",
        "distances":[
            {"toCity":"Columbus","distance":107},
            {"toCity":"Indianapolis","distance":112},
            {"toCity":"Louisville","distance":99}
            ]
    },
    {
        "fromCity":"Cleveland",
        "distances":[
            {"toCity":"Detroit","distance":180},
            {"toCity":"Cleveland","distance":142},
            {"toCity":"Pittsburgh","distance":140}
            ]
    },
    {
        "fromCity":"Pittsburgh",
        "distances":[
            {"toCity":"Cleveland","distance":140},
            {"toCity":"Columbus","distance":182},
            {"toCity":"Washington","distance":245}
            ]
    },
    {
        "fromCity":"Nashville",
        "distances":[
            {"toCity":"Saint Louis","distance":304},
            {"toCity":"Birmingham","distance":212},
            {"toCity":"Atlanta","distance":249},
            {"toCity":"Memphis","distance":212}
            ]
    },
    {
        "fromCity":"Charlotte",
        "distances":[
            {"toCity":"Charleston","distance":208},
            {"toCity":"Atlanta","distance":244},
            {"toCity":"Raleigh","distance":150}
            ]
    },
    {
        "fromCity":"Raleigh",
        "distances":[
            {"toCity":"Charlotte","distance":150},
            {"toCity":"Richmond","distance":170}
            ]
    },
    {
        "fromCity":"San Francisco",
        "distances":[
            {"toCity":"Los Angeles","distance":380},
            {"toCity":"Portland","distance":636}
            ]
    },
    {
        "fromCity":"Portland",
        "distances":[
            {"toCity":"San Francisco","distance":636},
            {"toCity":"Seattle","distance":173}
            ]
    },
    {
        "fromCity":"Chicago",
        "distances":[
            {"toCity":"Milwaukee","distance":93},
            {"toCity":"Saint Louis","distance":310},
            {"toCity":"Indianapolis","distance":180},
            {"toCity":"Minneapolis","distance":410},
            {"toCity":"Detroit","distance":280}
            ]
    },
    {
        "fromCity":"Milwaukee",
        "distance":[
            {"toCity":"Chicago","distance":93},
            {"toCity":"Minneapolis","distance":337}
            ]
    },
    {
        "fromCity":"Minneapolis",
        "distance":[
            {"toCity":"Milwaukee","distance":337},
            {"toCity":"Minneapolis","distance":410}
            ]
    },
    {
        "fromCity":"Washington",
        "distances":[
            {"toCity":"Baltimore","distance":40},
            {"toCity":"Richmond","distance":105},
            {"toCity":"Wilmington","distance":110},
            {"toCity":"Philadelphia","distance":180},
            {"toCity":"New York City","distance":226},
            {"toCity":"Pittsburgh","distance":245}
        ]
    },
    {
        "fromCity":"Richmond",
        "distances":[
            {"toCity":"Washington","distance":105},
            {"toCity":"Virginia Beach","distance":107},
            {"toCity":"Raleigh","distance":170}
        ]
    },
    {
        "fromCity":"Virginia Beach",
        "distances":[
            {"toCity":"Richmond","distance":107}
            ]
    },
    {
        "fromCity":"Wilmington",
        "distances":[
            {"toCity":"Baltimore","distance":65},
            {"toCity":"Washington","distance":110},
            {"toCity":"New York City","distance":127},
            {"toCity":"Philadelphia","distance":32}
            ]
    },
    {
        "fromCity":"Baltimore",
        "distances":[
            {"toCity":"New York City","distance":190},
            {"toCity":"Washington","distance":40},
            {"toCity":"Philadelphia","distance":105},
            {"toCity":"Wilmington","distance":65}
        ]
    },
    {
        "fromCity":"Philadelphia",
        "distances":[
            {"toCity":"Baltimore","distance":105},
            {"toCity":"Washington","distance":180},
            {"toCity":"New York City","distance":97},
            {"toCity":"Wilmington","distance":32}
            ]
    }
];

// This is used by the VoiceLabs analytics
var APP_ID = appId; 
//var VoiceInsights =require('voice-insights-sdk'),
//  VI_APP_TOKEN = '79091a90-09e5-11a7-2596-0eb19d13e26e';

// main handler
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    // initialize voice analytics
    console.log("initialize session");
    //VoiceInsights.initialize(event.session, VI_APP_TOKEN);

    alexa.appId = appId;
    alexa.dynamoDBTableName = 'trainEmpireUsers';
    alexa.registerHandlers(newSessionHandlers, startGameHandlers);
    console.log("ready to execute");
    alexa.execute();
};

var states = {
    STARTMODE: '_STARTMODE',  // Prompt the user to start or restart the game.
};

// these handlers address the initial startup state of the game, including initializing variables
var newSessionHandlers = {
    'NewSession': function() {
        console.log('new game started');
	// if first time, initiate the session attributes
        if(Object.keys(this.attributes).length === 0 || this.attributes['gameOver']) {
            console.log('no prior session found');
            this.attributes['budget'] = startingBudget;
            this.attributes['month'] = 1;
            this.attributes['gameOver'] = false;
            this.attributes['gamesPlayed'] = 0;
            this.attributes['stations'] = [];
            this.attributes['connections'] = [];

            var audioOutput = "Welcome to American Train Empire";
                audioOutput = audioOutput + "<break time=\"1s\"/>";
                audioOutput = audioOutput + "<audio src=\"https://s3.amazonaws.com/trainempire/sounds/trainSoundIntro.mp3\" />";
                audioOutput = audioOutput + "Are you ready to begin?";

            this.handler.state = states.STARTMODE;
        } else {
            console.log('prior session found');

            var audioOutput = "Welcome to American Train Empire. ";
                audioOutput = audioOutput + "<break time=\"1s\"/>";
                audioOutput = audioOutput + "We found an prior game in progress ";
            if (this.attributes['userName']) {
                audioOutput = audioOutput + "under the user name of " + this.attributes['userName'] + 
                    ". Would you like to resume?";
            } else {
                audioOutput = audioOutput + ". Would you like to resume?";
            }

            this.handler.state = states.STARTMODE;
        }

	var repromptOutput = "Say yes to start the game or no to quit.";

    this.emit(':ask', audioOutput, repromptOutput); 
    },
    "AMAZON.StopIntent": function() {
      this.emit(':tell', "Goodbye!");  
    },
    "AMAZON.CancelIntent": function() {
      this.emit(':tell', "Goodbye!");  
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.emit(":tell", "Goodbye!");
    }
};

var startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
    'NewSession': function () {
        console.log('new session within start game handler');
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    'AMAZON.HelpIntent': function() {
        var speechOutput = "You are playing Train Empire on Alexa. " +
            "This is a strategy game with a goal of creating a profitable train empire that " +
            "spans the United States. " +
            "Start by adding stations, then connect them. " +
            "Once you have cities connected, riders will begin to join, and you will start " +
            "to earn money to build more stations and trains. " +
            "Common voice commands to use are, Build Station, Connect Stations, and Run Empire. " +
            "You can customize your game by changing your profile name. Just say something like, " +
            "Set user name to Jackson. ";
        var repromptOutput = "If you would like to get started, please say something like, Build " +
            "a station in Chicago.";
        this.emit(':ask', speechOutput, message);
    },

    // this indicates that the user is ready to begin the game. Now create the first audio response to prepare the game.
    'YES': function() {
        var speechOutput = "Welcome to American Train Empire. You currently have $" + 
            Math.round((this.attributes['budget'])/1000000) * 1000000 + " to spend. ";

        if (this.attributes['stations'].length === 0) {
            speechOutput = speechOutput + "Please get started by building your first station. Just " +
                "say something like, Build a station in " + cities[0] + ". ";
        } else if (this.attributes['stations'].length === 0) {
            speechOutput = speechOutput + "You have built your first station in " +
                this.attributes['stations'][0] + ". Now lets build another so you can connect it " +
                "and begin your train empire.";
        } else {
            speechOutput = speechOutput + "You have " + this.attributes['stations'].length + " stations built. " +
            "To find out their locations, please say, List Current Stations.";
        }
        var repromptOutput = "We are glad you have come back. Let's get started by building another " +
            "station. Just say something like, build a station at " + cities[0] + ".";

        this.emit(':ask', speechOutput, repromptOutput);
    },
    'NO': function() {
        console.log("NOINTENT");
        this.attributes['gameOver'] = true;
        this.emit(':tell', 'Ok, I will delete this game and you can start over with a new game.');
    },
    "AMAZON.StopIntent": function() {
        console.log("STOPINTENT");
        this.attributes['gameOver'] = false;
        this.emit(':saveState', true);
        this.emit(':tell', "Thanks for playing. The game will be saved if you would like to resume at a later time.");  
    },
    // this function will share what the current leaderboard is
    "Leaderboard": function() {
        console.log("Leaderboard");
        var speechOutput = "Check back on the leaderboard as the game does not have enough players.";
        var repromptOutput = "To add a station, please say, Add Station, followed by the city name.";
        this.emit(':ask', speechOutput, repromptOutput);
    },
    // this function will set the user name for the game.
    "SetName": function() {
        console.log("Set Name");
        var speechOutput = "";
        var repromptOutput = "";

        // verify that a name was provided.
        if (this.event.request.intent.slots.name.value) {
            this.attributes['userName'] = this.event.request.intent.slots.name.value;
            speechOutput = "User name recorded as " + this.event.request.intent.slots.name.value +
                ". If you would like to continue playing, please say something like, Add a Station.";
            repromptOutput = "To add a station, please say, Add Station, followed by the city name.";
        } else {
            speechOutput = "Please provide a user first name when configuring the profile. " +
                "For example, say Set profile name to Frank.";
            repromptOutput = "No name provided. Please provide a first name. For example, " +
                "say Set profile name to Nicole.";
        }
        
        this.emit(':ask', speechOutput, repromptOutput);
    },
    // 
    "CurrentStations": function() {
        console.log("List current stations.");
        var speechOutput = "";
        if (this.attributes['stations'].length > 1) {
            speechOutput = "Here are the current stations you have built. ";
            for (var i = 0; i < this.attributes['stations'].length; i++ ) {
                speechOutput = speechOutput + this.attributes['stations'][i] + ".<break time=\"1s\"/>";
            }
            if (this.attributes['connections'].length > 0) {
                speechOutput = speechOutput + "If you would like to operate the train, please say, " +
                    "Run my empire.";
            } else {
                speechOutput = speechOutput + "You haven't connected these stations yet. Please say " +
                    "something like, Connect " + this.attributes['stations'][0] + " with " +
                    this.attributes['stations'][1] + ".";
            }
        } else if (this.attributes['stations'].length === 1) {
            speechOutput = speechOutput + "If you are ready to build another station, please say something like, " +
                "Build a station in " + cities[0] + ".";
        } else {
            speechOutput = "Sorry, no stations have been built so far. To get started, please build " +
                "your first station.";
        }
        var repromptOutput = "If you would like to build a new station, please say something like, " +
            "Build a new station in " + cities[0] + ".";
        this.emit(':ask', speechOutput, repromptOutput);    
    },
    // this is the function that lists out all of the available cities that stations can be built in.
    "ListCities": function() {
        console.log("List Cities");
        var speechOutput = "Here are the potential cities to put stations into. ";
        for (var i = 0; i < cities.length; i++ ) {
            speechOutput = speechOutput + cities[i] + ", ";
        }
            speechOutput = speechOutput + "If you would like to build in one of these sites, please " +
                "say something like, Build a station in " + cities[0];
        var repromptOutput = "If you would like to build a station, please say something like, " +
            "Build a station in " + cities[cities.length] + ".";
        this.emit(':ask', speechOutput, repromptOutput);  
    },
    // this is the function invoked when the user wants to know how much money they have to spend.
    "BudgetCheck": function() {
        console.log("Budget Check");
        var speechOutput = "You currently have " + this.attributes['budget'] + " dollars to spend. " +
            "If you would like to purchase a station, please do so now.";
        var repromptOutput = "If you would like to purchase a station, please name the city now.";
        this.emit(':ask', speechOutput, repromptOutput);  
    },
    // this is the function invoked when the user requests how far two cities are apart
    "DistanceCheck": function() {
        console.log("Distance Check");
        if (this.event.request.intent.slots.FromCity.value && this.event.request.intent.slots.ToCity.value) {
            var fromCity = this.event.request.intent.slots.FromCity.value;
            var toCity = this.event.request.intent.slots.ToCity.value;
            // these are used to track the route distance if found and will direct the user response
            var validRoute = false;
            var validFromCity = true;
            var routeDistance = 0;
            var speechOutput = "";
            var repromptOutput = "";
            // go through the connections between cities to find a match with the distance
            for (var i = 0; i < cityConnections.length; i++ ) {
                // start by matching the starting point city name
                if (fromCity.toLowerCase() === cityConnections[i].fromCity.toLowerCase()) {
                    console.log("From city is valid : " + fromCity);
                    for (var j = 0; j < cityConnections[i].distances.length; j++) {
                        // check if destination matches the request.
                        if (toCity.toLowerCase() === cityConnections[i].distances[j].toCity.toLowerCase()) {
                            //console.log("Matched Route at a distance of " + cityConnections[i].distances[j].distance);
                            routeDistance = cityConnections[i].distances[j].distance;
                            validRoute = true;
                        }
                    }
                }
                // create the response based on logic above
                if (validRoute) {
                    speechOutput = fromCity + " is " + routeDistance + " miles from " + toCity + ". ";
                    if (this.attributes['budget'] < (routeDistance * railCostPerMile)) {
                        speechOutput = "It requires $" + (routeDistance * railCostPerMile) + " to build " +
                            "this track, which is more than your cash on hand. Please run your trains " +
                            "for a while longer to get the funds to do this.";
                        repromptOutput = "If you would like to run trains, please say, Run Empire.";
                    } else {
                        speechOutput = speechOutput + "If you would like to connect these two locations, please say " +
                            "Add track between " + fromCity + " to " + toCity + ". " +
                            "You have the necessary $"+ (routeDistance * railCostPerMile) + " to build.";
                        repromptOutput = "If you would like to connect these two cities, please say " +
                            "Add track between " + fromCity + " to " + toCity + ". ";
                    }
                } else if (validFromCity) {
                    speechOutput = "No route found from " + fromCity + " to " + toCity + ".";
                    repromptOutput = "Sorry, no route found between " + fromCity + " and " + toCity +
                        ". If you would like to try another city from " + validFromCity + ", " +
                        "please try again.";
                } else {
                    console.log("Doesn't match city: " + cityConnections[i].fromCity);
                    speechOutput = "Can't find " + fromCity + ".";
                    repromptOutput = "Sorry, we couldn't find " + fromCity + " in our maps. Please " +
                        "try again.";
                    validFromCity = false;
                }
            }
            //cityConnections
            this.emit(':ask', speechOutput, repromptOutput);  
        } else {
            this.emit(':tell', "Sorry, please provide the city names.");  
        }
    },
    // this function lists the connections that have already been made between stations
    "ListTracks": function() {
        console.log("list tracks - which connections already exist");
        var speechOutput = "Here are the stations already connected. ";
        var repromptOutput = "If you would like to run the trains, please say Run Empire.";
        var currentConnections = this.attributes['connections'];
        for (var i = 0; i < currentConnections.length; i++) {
            console.log(JSON.stringify(currentConnections[i]));
            speechOutput = speechOutput + currentConnections[i].fromCity + " to " +
                currentConnections[i].toCity + ", ";
        }
        this.emit(':ask', speechOutput, repromptOutput);
    },
    // this is the function that gets called when the user wants to build a new station
    "BuildStation": function() {
        console.log("Attempt to build a station");
        var validStation = false;
        var duplicateStation = false;
        var lowBudget = false;
        
        // validate that the city name is valid to build a station in
        if (this.event.request.intent.slots.CityName.value) {
            console.log("validate city name: " + this.event.request.intent.slots.CityName.value);
            for (var i = 0; i < cities.length; i++) {
                if (this.event.request.intent.slots.CityName.value.toLowerCase() === cities[i].toLowerCase()) {
                    console.log(cities[i] + " is a valid city name.")
                    validStation = true;
                }
            }
        }
        // validate that the station hasn't already been built
        if (validStation) {
            var currentStations = this.attributes['stations'];
            for (var i = 0; i < currentStations.length; i++) {
                if (currentStations[i].toLowerCase() === this.event.request.intent.slots.CityName.value.toLowerCase()) {
                    console.log("station: " + this.event.request.intent.slots.CityName.value + " already built.");
                    duplicateStation = true;
                }
            }
        }
        // validate that enough money exists to build the station
        if (validStation && !duplicateStation) {
            if (this.attributes['budget'] < stationCost) {
                console.log("not enough budget to build. Only " + this.attributes['budget'] + ".");
                lowBudget = true;
            }
        }
        // if everything is okay, then build it
        if (this.event.request.intent.slots.CityName.value && validStation && !duplicateStation && !lowBudget) {
            console.log("Now Building City in " + this.event.request.intent.slots.CityName.value);
            var cityName = this.event.request.intent.slots.CityName.value;
            var speechOutput = "You just built a station in " + cityName + ". ";
            this.attributes['stations'].push(cityName);
            this.attributes['budget'] = this.attributes['budget'] - stationCost;
            // determine if this was the first station built and change prompt accordingly
            if (this.attributes['stations'].length === 1) {
                speechOutput = speechOutput + "Congratulations on building your first station. " +
                    "Please build another one so you can begin connecting the cities. ";
            } else {
                console.log("This was not the first city to be built.");
                speechOutput = speechOutput + "That cost $" + stationCost + ". ";
                var recommendCity = "";
                // find out what cities it can be connected to
                console.log("Number of current connections: " + cityConnections.length);
                for (var i = 0; i < cityConnections.length; i++) {
                    console.log("checking: " + cityConnections[i].fromCity.toLowerCase());
                    if (cityConnections[i].fromCity.toLowerCase() === cityName.toLowerCase()) {
                        speechOutput = speechOutput + "That station can be connected to ";
                        console.log(JSON.stringify(cityConnections[i].distances));
                        for (var j = 0; j < cityConnections[i].distances.length; j++) {
                            speechOutput = speechOutput + cityConnections[i].distances[j].toCity + ", ";
                            // now check if the city has been built as a station
                            for (var k = 0; k < this.attributes['stations'].length; k++) {
                                if (cityConnections[i].distances[j].toCity === this.attributes['stations'][k]) {
                                    recommendCity = cityConnections[i].distances[j].toCity;
                                }
                            }
                        }
                    }
                }
                if (recommendCity) {
                    speechOutput = speechOutput + "Please say, connect " + cityName + " to " + recommendCity + ". ";
                } else {
                    speechOutput = speechOutput + "Please build another station in one of these locations " +
                        "so you can connect this to. ";
                }
            }
            var repromptOutput = "If you would like to build another station, please request " +
                "that next. ";
            this.emit(':saveState', true);
            this.emit(':ask', speechOutput);
        } else if (lowBudget) {
            var speechOutput = "Sorry, you only have $" + this.attributes['budget'] + " to spend, and a " +
                "new station costs $" + stationCost + ". Please run your train empire for a few months " +
                "to get the necessary money to build more stations.";
            var repromptOutput = "Budget is too low. Please say, Run Empire, and gain revenue for " +
                "your existing trains to earn money to continue to expand.";
            this.emit(':ask', speechOutput, repromptOutput);
        } else if (duplicateStation) {
            // this logic is invoked when the city name wasn't provided
            var speechOutput = this.event.request.intent.slots.CityName.value + " already " +
                "has a station, please pick a different city to build a station in. ";
            var repromptOutput = "You have already built a station in this city. Please " +
                "select a different one to build in. For a full list of cities, please " +
                "say List Cities.";
            this.emit(':ask', speechOutput, repromptOutput);
        } else if (this.event.request.intent.slots.CityName.value) {
            // this logic is invoked when the city name wasn't provided
            var speechOutput = this.event.request.intent.slots.CityName.value + " isn't a city " +
                "that you can build a station in. " +
                "For example, say Build a station in " + cities[0] + ".";
            var repromptOutput = "You did not provide a valid city name to build the station in. Please say " +
                "something like, Build a Station in " + cities[0] + ". For a complete list of " +
                "cities, say List Cities.";
            this.emit(':ask', speechOutput, repromptOutput);
        } else {
            // this logic is invoked when the city name wasn't provided
            var speechOutput = "Please provide a city name that you would like to build. " +
                "For example, say Build a station in " + cities[0] + ".";
            var repromptOutput = "You did not provide a city to build the station in. Please say " +
                "something like, Build a Station in " + cities[0] + ". For a complete list of " +
                "cities, say List Cities.";
            this.emit(':ask', speechOutput, repromptOutput);
        }
    },
    // this function gets called when connecting track between two cities
    "ConnectCities": function() {
        console.log("Connect Two Cities");
        if (this.event.request.intent.slots.FromCity.value && this.event.request.intent.slots.ToCity.value) {
            // retrieve the current connections
            var currentConnections = this.attributes['connections'];
            var currentStations = this.attributes['stations'];
            var currentCash = this.attributes['budget'];
            
            // create an object with the slots provided by the user
            var connection = {};
                connection.fromCity = this.event.request.intent.slots.FromCity.value;
                connection.toCity = this.event.request.intent.slots.ToCity.value;

            // validate the connection is valid - this is in a separate function
            var validConnection = validateConnection(currentConnections, currentStations, connection, currentCash);
            console.log(JSON.stringify(validConnection));

            // process new route
            if (validConnection.newConnection.valid) {
                console.log("process new route");
                var connectionDistance = validConnection.newConnection.routeDistance;
                // these attributes are needed to calculate financials when running the trains
                    connection.trackLength = validConnection.newConnection.routeDistance;
                //var baseFare = calculateFare(connection).routeFare.baseAmount;
                //console.log("Fare Details: " + JSON.stringify(baseFare));
                    connection.baseFare = calculateFare(connection).routeFare.baseAmount;
                // reduce the amount of money based on the length of the track
                this.attributes['budget'] = this.attributes['budget'] - (connectionDistance * railCostPerMile);
                // store the new connection for this user instance.
                this.attributes['connections'].push(connection);
                // reply back to the user that the new connection has been built and ready to operate
                var speechOutput = "Connecting " + connection.fromCity + " with " + connection.toCity + ". ";
                    speechOutput = speechOutput + "<audio src=\"https://s3.amazonaws.com/trainempire/sounds/trainWhistle.mp3\" />";
                    speechOutput = speechOutput + "<break time=\"1s\"/>"
                    speechOutput = speechOutput + "That required " + connectionDistance + " miles of track. ";
                    speechOutput = speechOutput + "The base fare for this route will be $" + connection.baseFare + ". ";
                    speechOutput = speechOutput + "<break time=\"1s\"/>"
                    speechOutput = speechOutput + "You now have $" + Math.round((this.attributes['budget']/1000000))*1000000 + " to spend. ";
                    speechOutput = speechOutput + "If you are ready to operate your expanded empire, please say, " +
                        "Run Trains.";
                var repromptOutput = "Are you ready to run your trains? Please say, Run Empire, " +
                    "and your passengers will begin to ride.";
                this.emit(':saveState', true);
                this.emit(':ask', speechOutput, repromptOutput);
            } else {
                // respond back with the error message to the user
                var speechOutput = validConnection.newConnection.errorMessage;
                var repromptOutput = "Would you like to try again? If you would like to earn more " +
                    "money, please say something like, Run Empire.";
                this.emit(':ask', speechOutput, repromptOutput);
            }
        } else {
            // if city names weren't provided prompt the user to do so
            var speechOutput = "Please provide two city names to connect that have stations."
            var repromptOutput = "No city names provided. Please provide two city names to connect " +
                "that have stations.";
            this.emit(':ask', speechOutput, repromptOutput);
        }
    },
    // operate the train empire for a month
    "RunTrains": function() {
        console.log("run the trains");
        var speechOutput = "Running the trains for month " + this.attributes['month'] + ". ";
            speechOutput = speechOutput + "<break time=\"1s\"/>";
            speechOutput = speechOutput + "<audio src=\"https://s3.amazonaws.com/trainempire/sounds/trainSoundIntro.mp3\" />";

        this.attributes['month']++;
        var repromptOutput = "Would you like to earn more money? Just say, Run Empire, and " +
            "you will gain revenue for the next month.";
        // first check to see if enough progress has been made to run trains
        if (this.attributes['stations'].length === 0) {
            speechOutput = "Before you can operate the trains, you need to have stations. " +
                "To get started on building your first one, say something like Build a station at " + cities[0] + ".";
        } else if (this.attributes['stations'].length === 1) {
            speechOutput = "Before you can operate the trains, you need to build tracks. To do that, " +
                "you will need to create another station. Please say something like, Build a station at " + cities[0] +
                "that you can then connect with.";
        } else if (this.attributes['connections'].length === 0) {
            speechOutput = "You have the stations built, but before you can operate, you need to connect " +
                "them together. Please say something like, Connect " + this.attributes['stations'][0] + " and " +
                this.attributes['stations'][1] + " and you will lay down the track to run trains on.";
        } else {
            console.log("run the empire!");
            var currentConnections = this.attributes['connections'];
            var currentStations = this.attributes['stations'];
            // run function that calculates revenues
            var trainFinancials = runCalculations(currentConnections, currentStations).trainFinancials;
            // then create an audio response
            if (trainFinancials.profit > 0) {
                speechOutput = speechOutput + "For the month, you turned a profit of $" + 
                    Math.round((trainFinancials.profit/1000000)) * 1000000 + ". ";
            } else {
                speechOutput = speechOutput + "For the month, you lost $" + 
                    Math.round(((-1 * trainFinancials.profit)/1000000)) * 1000000 + ". ";
            }
            speechOutput = speechOutput + "<break time=\"1s\"/>"
            speechOutput = speechOutput + "Total riders were " + trainFinancials.totalRiders + ". ";
            speechOutput = speechOutput + "<break time=\"1s\"/>"
            speechOutput = speechOutput + "Station costs were $" + trainFinancials.stationCosts + ". ";
            speechOutput = speechOutput + "Track costs were $" + trainFinancials.trackCosts + ". ";
            speechOutput = speechOutput + "Net passenger revenue was $" + 
                Math.round((trainFinancials.passengerFares/10000)) * 10000 + ". ";
            this.attributes['budget'] += trainFinancials.profit;
            speechOutput = speechOutput + "<break time=\"1s\"/>"
            speechOutput = speechOutput + "You now have $" + 
                Math.round((this.attributes['budget']/1000000)) * 1000000 + " in cash.";
            speechOutput = speechOutput + "<break time=\"1s\"/>"

            if (trainFinancials.profit < 0) {
                speechOutput = speechOutput + "To become profitable, add more stations and routes. " +
                    "Just say, add stations. "; 
            } else {
                speechOutput = speechOutput + "To generate more profit, add more routes by connecting stations together. ";
            }
            console.log(JSON.stringify(trainFinancials));
        }
        this.emit(':saveState', true);
        this.emit(':ask', speechOutput, repromptOutput);
    },
    'SessionEndedRequest': function () {
        console.log("SESSIONENDEDREQUEST");
        this.emit(':saveState', true);
        this.emit(':tell', "Goodbye!");
    },
    'Unhandled': function() {
        console.log("UNHANDLED from Start Game");
        var message = 'Say yes to continue, or no to end the game.';
        this.emit(':ask', message, message);
    }
});

// this calculates the revenue and costs behind running the trains
function runCalculations(currentConnections, currentStations) {
    console.log("calculate costs of running the trains");
    var trainFinancials = {};
        trainFinancials.stationCosts = 0;
        trainFinancials.trackCosts = 0;
        trainFinancials.passengerFares = 0;
        trainFinancials.profit = 0;
        trainFinancials.totalRiders = 0;
    // cost for the stations - this is fixed based on the number of stations
    for (var j = 0; j < currentStations.length; j++) {
        trainFinancials.stationCosts += monthlyStationCosts;
    }

    // cost for running the trains is based on the length of track for each route
    for (var j = 0; j < currentConnections.length; j++) {
        trainFinancials.trackCosts += monthlyRailMilageCosts * currentConnections[j].trackLength;
    }

    console.log("calculate revenue for running the trains");
    // determine revenue based on routes
    for (var k = 0; k < currentConnections.length; k++) {
        //console.log(JSON.stringify(currentConnections[k]));
        // find the population of the cities that hold the stations
        var toCityPopulation = 0;
        var fromCityPopulation = 0;
        for (var m = 0; m < cityPopulations.length; m++) {
            console.log(JSON.stringify(cityPopulations[m]));
            if (cityPopulations[m].cityName.toLowerCase() === currentConnections[k].toCity.toLowerCase()) {
                toCityPopulation = cityPopulations[m].population;
            } else if (cityPopulations[m].cityName === currentConnections[k].fromCity) {
                fromCityPopulation = cityPopulations[m].population;
            }
        }
        // calculate the average monthly riders for the route
        var routeRiders = (toCityPopulation + fromCityPopulation) * 0.01;
        trainFinancials.totalRiders += routeRiders;
        
        // determine number of passengers based on population and fare
        trainFinancials.passengerFares += (currentConnections[k].baseFare * routeRiders);
    }
    

    // calculate profit by taking revenue - costs
    console.log("Summarize into a profit or loss");
    trainFinancials.profit = trainFinancials.passengerFares - trainFinancials.stationCosts - trainFinancials.trackCosts;

    return {
        trainFinancials
    };
}

// this determines the fare to charge for a particular route.
function calculateFare(connection) {
    console.log("calculating fare for " + JSON.stringify(connection));
    var routeFare = {};
    
    if (connection.trackLength > 500) {
        routeFare.baseAmount = 229;
    } else if (connection.trackLength > 350) {
        routeFare.baseAmount = 199;
    } else if (connection.trackLength > 250) {
        routeFare.baseAmount = 169;
    } else if (connection.trackLength > 150) {
        routeFare.baseAmount = 129;
    } else if (connection.trackLength > 100) {
        routeFare.baseAmount = 99;
    } else if (connection.trackLength > 80) {
        routeFare.baseAmount = 79;
    } else {
        routeFare.baseAmount = 49;
    }
        
    return {
        routeFare
    };
}

// this validates that the connection between two stations is accurate
function validateConnection(currentConnections, currentStations, connection, currentCash) {
    console.log("validate connetion function");
    console.log("cities:" + JSON.stringify(currentStations));
    console.log("connection:" + JSON.stringify(connection));
    var newConnection = {};
        newConnection.valid = true;

    // check for duplicates that the connection has already been made
    for (var i = 0; i < currentConnections.length; i++) {
        console.log("Check for duplicates");
        if (currentConnections[i].fromCity.toLowerCase() === connection.fromCity.toLowerCase() && 
            currentConnections[i].toCity.toLowerCase() === connection.toCity.toLowerCase()) {
            newConnection.valid = false;
            newConnection.errorMessage = "Duplicate. This connection already exists."
        }
    }

    // validate that the cities being connected have stations
    if (newConnection.valid) {
        console.log("Check if cities are stations");
        var validFromCity = false;
        var validToCity = false;
        for (var j = 0; j < currentStations.length; j++) {
            if (currentStations[j].toLowerCase() === connection.fromCity.toLowerCase()) {
                validFromCity = true;
            }
            if (currentStations[j].toLowerCase() === connection.toCity.toLowerCase()) {
                validToCity = true;
            }
        }
        if (validFromCity && validToCity) {
            console.log("Valid Connection");
        } else {
            console.log("Cities in connection aren't stations");
            newConnection.valid = false;
            if (validFromCity) {
                newConnection.errorMessage = "There isn't a station in " + connection.toCity + ". " +
                    "If you would like to do this, first say, Build a station in " + connection.toCity +
                    ". Then come back and connect it to " + connection.fromCity + ".";
            } else if (validToCity) {
                newConnection.errorMessage = "There isn't a station in " + connection.fromCity + ". " +
                    "If you would like to do this, first say, Build a station in " + connection.fromCity +
                    ". Then come back and connect it to " + connection.toCity + ".";
            } else {
                newConnection.errorMessage = "These cities aren't currently stations."
            }
        }
    }
    
    // validate that the cities can connect
    if (newConnection.valid) {
        var validRoute = false;
        console.log("check if the cities connect");
        for (var k = 0; k < cityConnections.length; k++) {
            // start by matching the starting point city name
            if (connection.fromCity.toLowerCase() === cityConnections[k].fromCity.toLowerCase()) {
                console.log("From city is valid : " + connection.fromCity);
                for (var m = 0; m < cityConnections[k].distances.length; m++) {
                    // check if destination matches the request.
                    if (connection.toCity.toLowerCase() === cityConnections[k].distances[m].toCity.toLowerCase()) {
                        console.log("Matched Route at a distance of " + cityConnections[k].distances[m].distance);
                        newConnection.routeDistance = cityConnections[k].distances[m].distance;
                        validRoute = true;
                    }
                }
            }
        }
        if (!validRoute) {
            newConnection.valid = false;
            newConnection.errorMessage = "These stations can't be connected as there isn't a direct path between them. " +
                "Please try again and connect two locations that you already have.";
        }
    }
    
    // validate that the user has enough money to build the route.
    if (newConnection.valid) {
        console.log("determine if enough budget exists");
        if (currentCash < (newConnection.routeDistance * railCostPerMile)) {
            newConnection.valid = false;
            newConnection.errorMessage = "This route would cost $" + (newConnection.routeDistance * railCostPerMile) +
                " to build, and you don't have enough cash on hand. " +
                "Please run the trains to generate money to build this route.";
        }
    }
    
    return {
        newConnection
    };
}
