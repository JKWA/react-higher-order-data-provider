import * as React from 'react';
import { getCars, eqMakeAndModel, ordByMake } from '../../data';
import { sort } from 'fp-ts/lib/Array';

import {
  withDeduplicateArrayDataProvider,
  BaseProps,
} from '../../data-providers';

type Props = BaseProps & { title: string };

const ByMakeAndModelComponent = (props: Props) => {
  const { title, arrayData = [] } = props;
  return (
    <div>
      <h2>{title}</h2>
      <ol>
        {sort(ordByMake)(arrayData).map((item, index) => (
          <li key={index}>
            {item.make} {item.model}
          </li>
        ))}
      </ol>
    </div>
  );
};

const inhancedComponent = withDeduplicateArrayDataProvider(
  ByMakeAndModelComponent
);
const withDedupLogic = inhancedComponent(eqMakeAndModel);
const withDataTask = withDedupLogic(getCars);

export default withDeduplicateArrayDataProvider(ByMakeAndModelComponent)(
  eqMakeAndModel
)(getCars);
