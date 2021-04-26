import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import RecipeFound from './components/recipe';
import { IRecipe } from './IRecipe';

function App() {
  const [recipesFound, setRecipesFound] = useState<IRecipe[]>([]);
  const [recipeSearch, setRecipeSearch] = useState('');

  const searchForRecipes = async (query: string): Promise<IRecipe[]> => {
    const response = await fetch(`http://localhost:3001/?search=${query}`);
    const json = await response.json();
    return json.results
  }

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      if (query) {
        const response = await searchForRecipes(query);
        setRecipesFound(response);
      }
    })()
  }, [recipeSearch])

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipeSearch(input.value)
  }

  return (
    <div className="App">
      <h1>
        Recipe Search App
      </h1>
      <form className="searchForm" onSubmit={(event) => handleSearch(event)}>
        <input id="searchText" type="text" />
        <button>Search</button>
      </form>
      {recipeSearch && <p>Result for {recipeSearch} ...</p>}
      <div className="recipes-container">
        {recipesFound?.length > 0 && recipesFound.map((recipe) => <RecipeFound key={recipe.href} recipe={recipe}></RecipeFound>)}
      </div>
    </div>
  );
}

export default App;
