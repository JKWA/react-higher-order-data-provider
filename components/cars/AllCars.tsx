import * as React from 'react';
import { getCars } from '../../data';

import { withArrayDataProvider, BaseProps } from '../../data-providers';

type Props = BaseProps & { title: string };

const AllCarsComponent = (props: Props) => {
  const { title, arrayData = [] } = props;
  return (
    <div>
      <h2>{title}</h2>
      <ol>
        {arrayData.map((item, index) => (
          <li key={index}>
            {item.year} {item.make} {item.model}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default withArrayDataProvider(AllCarsComponent)(getCars);
