import { Outlet } from "react-router-dom"
import Provider from "./context/Provider"

function App() {

  return (
    <>
      <Provider>
        <Outlet />
      </Provider>
    </>
  )
}

export default App
