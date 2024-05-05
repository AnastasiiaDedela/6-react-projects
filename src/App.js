import React, { useEffect, useState } from 'react';
import './index.scss';
import Collection from './components/Collection';

function App() {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = activeCategory ? `category=${activeCategory}` : '';

    fetch('https://f38de55f56f9987f.mokky.dev/categories')
      .then((res) => res.json())
      .then((categories) => setCategories(categories))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));

    fetch(`https://f38de55f56f9987f.mokky.dev/collections?page=${page}&limit=6&${category}`)
      .then((res) => res.json())
      .then((collections) => setCollections(collections))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, [activeCategory, page]);

  console.log(collections);

  const onChangeSesrchValue = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((category, index) => (
            <li
              key={index}
              className={activeCategory === index ? 'active' : ''}
              onClick={() => setActiveCategory(index)}>
              {category.name}
            </li>
          ))}
        </ul>

        <input
          value={searchValue}
          onChange={onChangeSesrchValue}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections.items &&
          collections.items
            .filter((collection) =>
              collection.name.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .map((collection, index) => (
              <Collection key={index} name={collection.name} images={collection.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li
            key={index}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? 'active' : ''}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
