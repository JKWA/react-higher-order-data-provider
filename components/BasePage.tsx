import * as React from 'react';
import { useState } from 'react';

import AllCars from './cars/AllCars';
import ByMakeAndModel from './cars/ByMakeAndModel';
import ByYearAndMake from './cars/ByYearAndMake';

const BasePage = () => {
  const [offset, setOffset] = useState(0);
  const take = 5;

  return (
    <div>
      <button onClick={() => setOffset(offset + 5)}>Get More</button>
      <AllCars title="All Cars" offset={offset} take={take} />
      <ByMakeAndModel
        title="Deduped by make and model"
        offset={offset}
        take={take}
      />
      <ByYearAndMake
        title="Deduped by year and make"
        offset={offset}
        take={take}
      />
    </div>
  );
};

export default BasePage;
