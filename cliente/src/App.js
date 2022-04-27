import { useContext } from 'react';
import Rutas from './rutas';
import {BrowserRouter} from 'react-router-dom';
import Tema from './tema';
import {ThemeProvider} from '@mui/material/styles';
import {ProviderContext} from './provider';
import { Typography } from '@mui/material';
import './splash-screen.css';

function App() {    
  const { cargando } = useContext(ProviderContext);

  const mensajeCargando = () => {
    return (
      <div className = 'divPadre'>
        <div className = 'divHijo'>          
          <Typography variant="h5" style = {{color : '#3f4771'}}>
            Cargando
          </Typography>
          <div className = 'splash-screen'>
            <div className = 'loading-dot'>
              .
            </div>                  
          </div>
        </div>
      </div>

      // <div className = 'loader'>
      //   Cargando...
      // </div>
    )
  }

  return (
    <>
      {
        cargando 
        ?  
          <div>
              {
                mensajeCargando()
              }
          </div>
        :
        <BrowserRouter>
          <ThemeProvider theme={Tema}>
            <Rutas />
          </ThemeProvider>      
        </BrowserRouter>
      }
    </>
  )
}

export default App;
