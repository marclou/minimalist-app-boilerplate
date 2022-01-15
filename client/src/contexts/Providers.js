import { Provider } from 'react-redux';
import { store } from '../state';
import { ThemeProvider } from './theme';

const Providers = ({ children }) => {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

export default Providers;
