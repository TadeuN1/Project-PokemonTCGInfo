import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import { Notfound } from "./pages/notfound";
import { Search } from "./pages/search";






const router = createBrowserRouter([
    {
        element: <Layout />,
        children:[
            {
                path:"/",
                element: <Home />
            },
            {
                path:"/list/:name",
                element: <Search />

            },
            {
                path:"/detail/:card",
                element: <Detail />
            },
            {
                path:'*',
                element: <Notfound />
            }
        ]
    }

])

export {router};