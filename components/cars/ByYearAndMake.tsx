import * as React from 'react';
import { getCars, eqMakeAndYear, ordByYear } from '../../data';
import { sort } from 'fp-ts/lib/Array';

import {
  withDeduplicateArrayDataProvider,
  BaseProps,
} from '../../data-providers';

type Props = BaseProps & { title: string };

const ByYearAndMakeComponent = (props: Props) => {
  const { title, arrayData = [] } = props;
  return (
    <div>
      <h2>{title}</h2>
      <ol>
        {sort(ordByYear)(arrayData).map((item, index) => (
          <li key={index}>
            {item.year} {item.make}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default withDeduplicateArrayDataProvider(ByYearAndMakeComponent)(
  eqMakeAndYear
)(getCars);
