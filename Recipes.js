import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { saveRecipe, removeRecipe } from "./actions";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const savedRecipes = useSelector(state => state.savedRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://www.food2fork.com/api/search?key=YOUR_API_KEY&q=shredded%20chicken"
      );
      setRecipes(result.data.recipes);
    };

    fetchData();
  }, []);

  const handleSave = recipe => {
    dispatch(saveRecipe(recipe));
  };

  const handleRemove = recipeId => {
    dispatch(removeRecipe(recipeId));
  };

  return (
    <Container>
      <Row>
        {recipes.map(recipe => (
          <Col key={recipe.recipe_id} md={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={recipe.image_url} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                {savedRecipes.includes(recipe.recipe_id) ? (
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(recipe.recipe_id)}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => handleSave(recipe)}>
                    Save
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecipeList;
