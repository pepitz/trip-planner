import * as CONSTANTS from 'constants/index';

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
