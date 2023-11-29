# MVC

## Why structure?

- Structure: Like a house, software needs a structure: the way we need organize our code.

- Maintainability: A project is never done! We need to be able to easily change it in the future.

- Expandability: We also need to be able to easily add new feature.

==> a well-established architecture pattern like: MVC, MVP, Flux, ...

## Component of architecture

- Business logic:

* Code that solve the actual business problem.

* directly related to what business does and what it needs.

* ex: sending messages, storing transaction, calculating taxes, ...

- State:

* Essentially store all the data about the application

* Should be the 'single source of truth'

* UI should be kept in sync with the state

* state libraries: redux, zustand, ...

- HTTP library

* responsible for marking and receiving AJAX request.

* optional but almost always necessary in real-world apps.

- Application logic (router)

* Code that is only concerned about the implementation of application itself;

* Handles navigation and UI events;

- Presentation logic (UI layer)

* Code that is concerned about the visible part of the application

* Essentially displays application state.

## MVC architecture

![MVC architecture](./src/img/mvc_architecture.jpg 'MVC architecture')

- View is the part of the application interacting with the user.

- Model contain business logic and state, they should be keep closely together

- Controller: bridge between model and views (which don't know about one another). The view and model will exist completely independent from one another, and not even knowing that the other one exists.

The big goal of this pattern is separate business logic from application logic, which make developing the application so much easier.

(1) Controller handle event.

(2) This handling may involve updating the user interface and also ask the model for some data. The controller dispatch to model and view. In other word, it controls and orchestrates this entire action.

(3) Asking data, of course involve dong an AJAX request to the API.

(4) When the data arrive, the controller take the data and sends it to the view.

(5) The view will render that data to the user interface.

Only the controller imports and calls functions from the model and view, but never the other way around.

## Example

Recipe flow

![MVC real](./src/img/mvc_real_flow.jpg 'MVC real')

Even handling: Publisher-subscriber pattern

- View code that knows when to react: PUBLISHER
- Controller code that wants to react: SUBSCRIBER. Subscribe to publisher by passing in the subscriber function

![Even handling](./src/img/mvc_even_handler.jpg 'Even handling')
![Even handling](./src/img/mvc_even_handler_1.jpg 'Even handling')

## Demo

Home page (without recipe id)
![Demo home](./src/img/demo_home.jpg 'Demo home')

Search + Recipe detail

![Demo search](./src/img/demo_search_recipe.jpg 'Demo search')

Bookmark

![Demo bookmark](./src/img/demo_search_recipe_bookmark.jpg 'Demo bookmark')

## Course

@Jonas Schmedtmann
