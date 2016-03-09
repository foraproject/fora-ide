import __polyfill from "babel-polyfill";
import isotropy from "isotropy";
import reactPlugin from "isotropy-plugin-react";
import { Provider } from 'react-redux'
import WorkspaceContainer from "./react/containers/workspace-container";
import configureStore from './store/configureStore'

const store = configureStore()

class App extends Component {
  render() {
    <WorkspaceContainer store={store}>
      <App />
    </WorkspaceContainer>
  }
}

function fn() {
  const routes = [
    { url: `/`, method: "GET", component: App }
  ];

  const apps = [
    {
      type: "react",
      routes,
      path: "/"
    }
  ];

  isotropy(apps, [reactPlugin], {}).catch((e) => console.log(e.stack));
}

if (document.readyState !== 'loading'){
  fn();
} else {
  document.addEventListener('DOMContentLoaded', fn);
}
