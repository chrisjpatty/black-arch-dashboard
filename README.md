# Black Arch Dashboard

## Development Instructions
### Prerequisites
- Yarn
- Node 7+

### Installing the dashboard locally
1. Clone the repository.
2. Open a terminal to the root of the project folder.
3. Run `yarn` and wait for dependencies to install.

### Running the dashboard locally

1. Open a terminal to the root of the project folder.
2. Run `yarn start`
3. If your browser doesn't open automatically, open your browser to `localhost:3000`
4. Make any changes and save in your text editor. The browser should refresh automatically.

### Building the site for production

1. Open a terminal to the root of the project folder.
2. Run `yarn build`

### Project organization

- `src` contains all the `react` code.
- `src/components` contains reusable react components.
- `src/stories` contains story definitions for `react-storybook`
- `src/index.js` is the main entry point for Webpack. This is what renders the main app node to the DOM.
- `src/App.js` is the main react component. Responsible for url routing and fetching available stations.
- `src/serviceWorker.js` handles advanced caching and offline methods.
- `src/api.js` handles connection to the firebase database.
- `src/Login.js` react component for the login route.
- `src/Graph.js` reusable react component for connecting to a realtime websocket. Renders a Speedometer.
- `public` contains all static public files. These are files that won't be built by Webpack, but will be available on the server.
