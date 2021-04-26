import { IRecipe } from "../IRecipe";

const RecipeFound = (props: { recipe: IRecipe }) => {
  const { recipe } = props;

  return (
    <div className="recipe">
      <div className="title">
        <img src={recipe.thumbnail || 'http://localhost:3000/placeholder.jpg'} title={recipe.title} alt={recipe.title} />
      </div>
      {
        recipe.ingredients &&
        <ul>
          {recipe.ingredients.split(',').map(ingredient => <li>{ingredient}</li>)}
        </ul>
      }
      <a target="_blank" rel="noreferrer" href={recipe.href}>View Recipe</a>
    </div>
  )
}

export default RecipeFound;
