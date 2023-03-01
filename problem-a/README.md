# Problem: Adoption Routes

In this exercise, you will practice implementing _client-side routing_ using [React Router](https://reacttraining.com/react-router/). Specifically, you will be turning a version of the previous "Pet Adoption" exercise into a single-page application, with separate "pages" for each pet to adopt.

## Running the Program
Because this app is created with React (and scaffolded through [Create React App](https://github.com/facebook/create-react-app)), you will need to install dependencies and run a developer web server in order to transpile and view the application. You can run this server by using the command:

```bash
# from inside the `problem-a/` folder
cd path/to/problem-a

# install dependencies
npm install  # only once

# run the server
npm start
```

You can then view the rendered page _in a web browser_. Remember to check the Developer console for any errors!

## Exercise Instructions
To complete the exercise, edit the included **`src/index.js`** and files in **`src/components/`** to add in the required code. Note that you will not need to edit all of the files; __only__ edit the ones specified in the instructions below.

1. In order to make your app perform client-side routing, you will need to `import` the `BrowserRouter` component from `react-router-dom` (which has already been installed as a dependency), and "wrap" the `<App>` component in a `<BrowserRouter>`. 

    Modify the **`index.js`** file so that instead of passing just an `<App>` component to `root.render()`, you pass a `<BrowserRouter>` that contains an `<App>` as a child element. _Do not_ put the `BrowserRouter` inside of the `App`.

2. In the **`src/components/App.js`** file, import the `Routes` and `Route` components from React Router (`react-router-dom`). Then modify the `App` component's returned value, replacing the rendered `<PetList>` element with the following set of Routes:

    - The route `about` will render a `<AboutPage>` element.
    - The route `resources` will render a `<ResourcesPage>` element.
    - The route `adopt` will render a `<PetPage>` element.
    
    You can test your changes by directly visiting the routes (e.g., typing in `localhost:3000/about` in the browser's URL bar) and confirming that the correct content is being shown.

3. But you still need to show the PetList! To do this, make the `adopt` route a **nested route**. Its child route should be the `index` route, and render a `<PetList>` element. Don't forget to pass in the `pets` prop!

    In the **`src/components/PetPage.js`** file, modify the `PetPage` component so it includes an **`<Outlet>`** element below the paragraph. You will need to import `Outlet` from `react-router-dom`. This element will display the child route's element when that route is visited.

    Now when you visit the `adopt` route, you should see both the the message from the `PetPage` "layout", as well as the list of pets to adopt!

4. Add a a "catch-all" route `*` that will render a `<Navigate>` element, redirecting `to` the `/adopt` route. This make sure your page renders content even if the user puts in a bad URL. 

    You can test this functionality by visiting a non-existent route (e.g., `/wrong`) and confirming that it takes you to the `/adopt` route instead.

5. To begin adding user navigation, modify the rendered `<header>` in the `App` component so that the `<h1>` contains a `<Link>` to the `/adopt` route. Remember to import `Link` from React Router!

    You can test that this works by directly visiting the `/about` page, and then clicking on the header link&mdash;it should take you to the `adopt` route

6. In the **`src/components/Nav.js`** file, modify the `AboutNav` component so that the links navigate to the indicated routes (but _without_ reloading the page). Replace the `<a>` elements with `<NavLink>` components (which you will need to import).

    You can test this functionality by clicking on each of the links. The page show the correct route, and the navigation link should be properly "highlighted"!

7. In the **`src/components/PetList.js`** file, replace the "Meet" button with another `<Link>` element (which you will need to import) to a details page for that individual pet. The link should navigate `to` the path `/adopt/PET_NAME`, replacing `PET_NAME` with the name of the pet (e.g., `"Fido"` or `"Spot"`). Note that the `<Link>` element should retain its same CSS classes so it continues to _look_ like a button.

    While these links won't go anywhere until you add the route, you can check your work in the browser by inspecting the element and previewing its target.

8. Finally, add the ability to view details about each pet available for adoption. In the `App` component, add _another_ `<Route>`&mdash;this route will also be a child of the `adopt` route (though will need to be listed first before the `index` route). The path for this new route should be a **URL parameter** (e.g., `:petName`) representing the name of the pet to see the details for. You will thus be able to visit this route at e.g., `/adopt/Fido` to see the details for Fido. Note though that you're only adding a single new route whose path is a parameter, you're not adding a specific route for Fido!

    Then in the **`src/components/PetDetail.js`** file, use React Router's `useParams()` hook to access the URL parameters. Assign the value of the appropriate param to the **`petNameString`** variable. This will cause the component to render the appropriate detail data.

    You can test this change by visiting routes (type in the URLs such as `/adopt/Fido` and `/adopt/Spot`, or click the "Meet" buttons)  and seeing details for the appropriate pet.

    (Note that the "adopt" button is disabled, since that functionality isn't implemented in this exercise!).
