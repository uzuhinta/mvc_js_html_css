import { MODEL_CLOSE_SEC } from './config';
import * as model from './model';
import addRecipeView from './views/addRecipeView';
import bookmarkView from './views/bookmarkView';
import paginationView from './views/paginationView';
import recipeView from './views/recipeView';
import resultsView from './views/resultsView';
import searchView from './views/searchView';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultPagination());
    bookmarkView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
    recipeView.renderError(error.message);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();

    if (!query) return;

    resultsView.renderSpinner();

    await model.loadSearchResult(query);

    resultsView.render(model.getSearchResultPagination());

    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const handlePagination = function (goToPage) {
  resultsView.render(model.getSearchResultPagination(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    console.log('newRecipe', newRecipe);
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(handlePagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
