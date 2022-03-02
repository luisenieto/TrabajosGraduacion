import Rutas from './rutas';
import {BrowserRouter} from 'react-router-dom';
import Tema from './tema';
import {ThemeProvider} from '@mui/material/styles';

function App() {    
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={Tema}>
        <Rutas />
      </ThemeProvider>      
    </BrowserRouter>
  )
}

export default App;
