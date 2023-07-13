import * as CONSTANTS from 'constants/index';
import { City, Distance } from 'types';

export const citiesGeographicData: Array<Array<number | string>> = [
  ['Paris', 48.856614, 2.352222],
  ['Marseille', 43.296482, 5.36978],
  ['Lyon', 45.764043, 4.835659],
  ['Toulouse', 43.604652, 1.444209],
  ['Nice', 43.710173, 7.261953],
  ['Nantes', 47.218371, -1.553621],
  ['Strasbourg', 48.573405, 7.752111],
  ['Montpellier', 43.610769, 3.876716],
  ['Bordeaux', 44.837789, -0.57918],
  ['Lille', 50.62925, 3.057256],
  ['Rennes', 48.117266, -1.677793],
  ['Reims', 49.258329, 4.031696],
  ['Le Havre', 49.49437, 0.107929],
  ['Saint-Étienne', 45.439695, 4.387178],
  ['Toulon', 43.124228, 5.928],
  ['Angers', 47.478419, -0.563166],
  ['Grenoble', 45.188529, 5.724524],
  ['Dijon', 47.322047, 5.04148],
  ['Nîmes', 43.836699, 4.360054],
  ['Aix-en-Provence', 43.529742, 5.447427],
];

export const cities = citiesGeographicData.map(
  ([city, _, __]) => city as string
);

const doCityQueryEquality = (cityName: string, q: string): boolean =>
  cityName.toLocaleLowerCase().includes(q.toLowerCase());

export const getCities = (query: string): Promise<string[]> => {
  if (query.length < 2) {
    return Promise.resolve([] as string[]);
  }
  return new Promise((resolve, reject) => {
    if (query.match(/fail/i)) {
      setTimeout(() => reject(new Error(CONSTANTS.MESSAGE_FAIL)), 1000);
    }
    const filteredCities = cities.filter((cityName) =>
      doCityQueryEquality(cityName, query)
    );
    setTimeout(() => resolve(filteredCities), 1000);
  });
};

const haversine = (cityA: City, cityB: City): number => {
  const R = 6371e3; // metres
  const φ1 = (cityA.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (cityB.latitude * Math.PI) / 180;
  const Δφ = ((cityB.latitude - cityA.latitude) * Math.PI) / 180;
  const Δλ = ((cityB.longitude - cityA.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const meters = R * c; // in metres
  return Math.round(meters / 10) / 100;
};

const citiesCoordinates = citiesGeographicData.map((item) => ({
  name: item[0] as string,
  latitude: item[1] as number,
  longitude: item[2] as number,
}));

export const fetchDistances = (cities: string[]): Promise<Distance[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (cities.find((item) => item.toLowerCase().includes('dijon'))) {
          throw new Error('Failed handling the request');
        }
        const distances = [];
        let mappedCities = cities.map(
          (item) => citiesCoordinates.find((city) => city.name === item)!
        );
        for (let i = 0; i < mappedCities.length - 1; i++) {
          distances.push({
            from: cities[i],
            to: cities[i + 1],
            distance: haversine(mappedCities[i], mappedCities[i + 1]),
          });
        }
        resolve(distances);
      } catch (e) {
        reject(e);
      }
    }, 250);
  });
};
