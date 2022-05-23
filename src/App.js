import React from 'react';
import { getPokemons, getPokemonsData, searchPokemon } from './api';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import { FavoriteProvider } from './contexts/favoritesContext';

const favoritesKey = 'f';

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [pokemons, setPokemons] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [favorites, setFavorites] = React.useState([]);

  const itensPerPage = 27;

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonsData(pokemon.url);
      });

      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage));
    } catch (error) {
      console.log(`fetchPokemons error: ${error}`);
    }
  };

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
    setFavorites(pokemons);
  }

  React.useEffect(() => {
    loadFavoritePokemons();
  }, []);

  React.useEffect(() => {
    fetchPokemons();
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1);
    }else {
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const onSearchHandler = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons()
    } 

    setLoading(true);
    setNotFound(false);

    const result = await searchPokemon(pokemon) 
    
    if(!result) {
      setNotFound(true);
      setPage(0);
      setTotalPages(1);
    } else {
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
    setLoading(false);

  }

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div>
        <Navbar />
        <Searchbar onSearch={onSearchHandler}/>
        { notFound ? (
          <div className='not-found-container'>
            <div className='not-found-pokedex'> 
            <Pokedex
            page={page}
            totalPages={totalPages}
            />
            </div>
          <div className='not-found-text'><p>Pokémon não encontrado.</p></div>  
        </div>  
        ) :
          (<Pokedex
            pokemons={pokemons}
            loading={loading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </FavoriteProvider>
  );
};

export default App;
