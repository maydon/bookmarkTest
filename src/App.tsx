import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LinkContext, { Link } from './contexts/LinkContext';
import HandelLink from './containers/HandelLink';
import Links from './containers/Links';
import usePersist from './hooks/usePersist';

function App() {
  const [links, setLinks] = usePersist([] as Link[], 'links');
  return (
    <LinkContext.Provider value={{ links, setLinks }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Links} />
          <Route exact path="/add" component={HandelLink} />
          <Route exact path="/update/:id" component={HandelLink} />
          <Route render={() => '404 not found'} />
        </Switch>
      </BrowserRouter>
    </LinkContext.Provider>
  );
}

export default App;
