import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

type SortType = 'none' | 'alpha' | 'length';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [activeSort, setActiveSort] = useState<SortType>('none');
  const [isReversed, setIsReversed] = useState(false);

  const applySorting = (type: SortType) => {
    let sorted = [...goodsFromServer];

    if (type === 'alpha') {
      sorted = [...sorted].sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      sorted = [...sorted].sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setActiveSort(type);
  };

  const reverseList = () => {
    const newGoods = [...goods].reverse();
    setGoods(newGoods);
    setIsReversed(prev => !prev);
  };

  const resetList = () => {
    setGoods([...goodsFromServer]);
    setActiveSort('none');
    setIsReversed(false);
  };

  const isModified = goods.join() !== goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${activeSort === 'alpha' ? '' : ' is-light'}`}
          onClick={() => applySorting('alpha')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${activeSort === 'length' ? '' : ' is-light'}`}
          onClick={() => applySorting('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${isReversed ? '' : ' is-light'}`}
          onClick={reverseList}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
