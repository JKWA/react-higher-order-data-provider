import * as React from 'react';
import { useState, useEffect } from 'react';

import { uniq } from 'fp-ts/Array';
import { Eq } from 'fp-ts/Eq';
import { pipe } from 'fp-ts/function';
import { TaskEither } from 'fp-ts/TaskEither';
import { map } from 'fp-ts/Task';
import { fold } from 'fp-ts/Either';
import { Query } from './data';

export type BaseProps = { offset: number; take: number; arrayData: any[] };

function concatItems(oldItems: any[], newItems: any[]): any[] {
  return oldItems.concat(newItems);
}

export const withArrayDataProvider =
  (BaseComponent) =>
  (data: (query: Query) => TaskEither<Error, any[]>) =>
  (props) => {
    const { offset = 0, take = 10 } = props;

    // if this needs to remember previous items, it needs to remember state
    const [items, setItems] = useState([]);

    useEffect(() => {
      pipe(
        data({ offset, take }),
        map(
          fold(console.error, (newItems) =>
            setItems(concatItems(items, newItems))
          )
        )
      )();
    }, [offset, take]);

    return <BaseComponent {...props} arrayData={items} />;
  };

export const withDeduplicateArrayDataProvider =
  (BaseComponent) =>
  (eq: Eq<unknown>) =>
  (data: (query: Query) => TaskEither<Error, any[]>) =>
  (props) => {
    const { offset = 0, take = 10 } = props;
    const [items, setItems] = useState([]);

    useEffect(() => {
      pipe(
        data({ offset, take }),
        map(
          fold(console.error, (newItems) =>
            setItems(concatItems(items, newItems))
          )
        )
      )();
    }, [offset, take]);

    return <BaseComponent {...props} arrayData={uniq(eq)(items)} />;
  };
