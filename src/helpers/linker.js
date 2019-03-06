const _ = require('lodash');
const path = require('path');

const { readCSV } = require('./csv');

const CSV_OPTIONS = {
  colParser: {
    lat: {
      flat: true,
      cellParser: "number"
    },
    lon: {
      flat: true,
      cellParser: "number"
    }
  }
}; 


const EVENTS = readCSV(path.resolve('events.csv'), CSV_OPTIONS);

function closestLocation(targetLocation, locationData) {
  function vectorDistance(dx, dy) {
      return Math.sqrt(dx * dx + dy * dy);
  }

  function locationDistance(location1, location2) {
      const dx = location1.lat - location2.lat,
          dy = location1.lon - location2.lon;

      return vectorDistance(dx, dy);
  }

  return _.reduce(locationData, (prev, curr) => {
      const prevDistance = locationDistance(targetLocation , prev),
          currDistance = locationDistance(targetLocation , curr);
      return (prevDistance < currDistance) ? prev : curr;
  });
}

exports.linker = async (interests) => {
  const events = await EVENTS;

  const response = _.reduce(interests, (interest, cur) => ({ ...interest, [cur.name]: { ...cur, clicks: 0, impressions: 0 }}), {})

  events.forEach((event) => {
    const { name } = closestLocation(event, interests);

    if (event.event_type === 'click')
     response[name].clicks += 1;
    else if (event.event_type === 'imp')
      response[name].impressions += 1;
  });

  return Object.keys(response).map((name) => response[name]);
};
