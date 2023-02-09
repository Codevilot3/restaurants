import React, { useState, useEffect } from 'react';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.map(recipe => (
        <Recipe key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Recipes;
