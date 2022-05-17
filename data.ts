import { struct } from 'fp-ts/Eq';
import { Eq as eqNumber, Ord as ordNumber } from 'fp-ts/number';
import { Eq as eqString, Ord as ordString } from 'fp-ts/string';
import { Ord, contramap } from 'fp-ts/Ord';
import { TaskEither, tryCatch } from 'fp-ts/TaskEither';
import { toError } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

export type Car = { year: number; make: string; model: string };
export type Query = { take: number; offset: number };

const carData: Car[] = [
  { make: 'Honda', model: 'Civic', year: 2019 },
  { make: 'Toyota', model: 'Highlander', year: 2013 },
  { make: 'Nissan', model: 'Maxima', year: 2018 },
  { make: 'Toyota', model: 'Sienna', year: 2013 },
  { make: 'Honda', model: 'Accord', year: 2005 },
  { make: 'Toyota', model: 'Highlander', year: 2013 },
  { make: 'Honda', model: 'Accord', year: 2004 },
  { make: 'Toyota', model: '4-Runner', year: 2013 },
  { make: 'Honda', model: 'Civic', year: 2004 },
  { make: 'Honda', model: 'Civic', year: 2004 },
  { make: 'Honda', model: 'Accord', year: 2013 },
  { make: 'Honda', model: 'Civic', year: 2018 },
  { make: 'Toyota', model: 'Highlander', year: 2021 },
  { make: 'Nissan', model: 'Maxima', year: 2008 },
  { make: 'Toyota', model: 'Sienna', year: 2002 },
  { make: 'Honda', model: 'Accord', year: 2002 },
  { make: 'Toyota', model: 'Highlander', year: 2014 },
  { make: 'Honda', model: 'Accord', year: 2014 },
  { make: 'Toyota', model: '4-Runner', year: 2003 },
  { make: 'Honda', model: 'Civic', year: 2014 },
  { make: 'Honda', model: 'Civic', year: 2014 },
  { make: 'Honda', model: 'Accord', year: 2013 },
];

const mockCarQuery = (query: Query): Promise<Car[]> => {
  const { take, offset } = query;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(carData.slice(offset, take + offset));
    }, 1500);
  });
};

// this is a safe promise (TaskEither)
// it is also possible to compose multiple calls from different endpoints
export const getCars = (query: Query): TaskEither<Error, Car[]> => {
  return pipe(tryCatch((): Promise<Car[]> => mockCarQuery(query), toError));
};

export const eqMakeAndModel = struct<Partial<Car>>({
  make: eqString,
  model: eqString,
});

export const eqMakeAndYear = struct<Partial<Car>>({
  make: eqString,
  year: eqNumber,
});

export const ordByMake: Ord<Car> = contramap((car: Car) => car.make)(ordString);
export const ordByYear: Ord<Car> = contramap((car: Car) => car.year)(ordNumber);
