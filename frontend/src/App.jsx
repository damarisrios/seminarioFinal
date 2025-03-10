import { BrowserRouter } from 'react-router-dom'
import RoutesComponent from './routes'
import "./css/base.css"

function App() {
  return (
    <BrowserRouter>
      <RoutesComponent/>
    </BrowserRouter>
  )
}

export default App
