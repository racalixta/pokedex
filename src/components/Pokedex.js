import React from 'react';
import Pagination from './Pagination';
import Pokemon from './Pokemon';
import FavoriteContext from '../contexts/favoritesContext';

const Pokedex = (props) => {
  const { pokemons, loading, page, setPage, totalPages } = props;
  const {favoritePokemons} = React.useContext(FavoriteContext);

  const onLeftClickHandler = () => {
    if(page > 0){
      setPage(page - 1);
    }
  }
  
  const onRightClickHandler = () => {
    if(page + 1 !== totalPages){
      setPage(page + 1);
    }
  }

  return (
    <div className='pokedex-container'>
      <div className='pokedex-header'>
        <div>
          <h1>Pokédex</h1>
          <div className='pokedex-favorite'>
            Favoritos: ❤️{favoritePokemons.length} 
          </div>

        </div>
        <Pagination 
          page={page + 1}
          totalPages={totalPages}
          onLeftClick={onLeftClickHandler}
          onRightClick={onRightClickHandler}
        />
      </div>
      {loading ? (
        <div className='pokedex-grid'>Carregando...</div>
      ) : (
        <div className='pokedex-grid'>
          {pokemons && pokemons.map((pokemon, index) => {
            return (
              <div className='pokemon-card-container' key={index}>           
                <Pokemon pokemon={pokemon} key={index} search={true}/>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Pokedex;
