import { API_KEY, API_URL, RESULT_PER_PAGE } from './config';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

const serializeRecipe = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/recipes/${id}?key=${API_KEY}`);

    state.recipe = serializeRecipe(data);

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadSearchResult = async function (query = '') {
  try {
    state.search.query = query;

    const data = await AJAX(
      `${API_URL}/recipes?search=${query}&key=${API_KEY}`
    );

    state.search.results = data.data.recipes.map((rec) => ({
      id: rec.id,
      title: rec.title,
      publisher: rec.publisher,
      image: rec.image_url,
    }));
    state.search.page = 1;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchResultPagination = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage - 1;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.find((bookmark) => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map((ing) => {
        console.log(ing);
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3) throw new Error('Wrong ingredient format!');
        const [quantity, unit, des] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, des };
      });
    const recipe = {
      title: newRecipe.title,
      description: newRecipe.description,
      publisher: newRecipe.publisher,
      source_url: newRecipe.url,
      image_url: newRecipe.url,
      servings: newRecipe.servings,
      cooking_time: newRecipe.prep,
      ingredients,
    };
    const data = await AJAX(`${API_URL}/recipes?key=${API_KEY}`, recipe);
    state.recipe = serializeRecipe(data);
  } catch (error) {
    throw error;
  }
};
