import Navbar from "./component/global/navbar";
import Slider from "./pages/slider";
import Products from "./pages/products";
import CategoryCall from "./pages/categoryCall";


function App() {
    return (
        <>
            <Navbar/>
            <Slider/>
            <Products/>
            <CategoryCall/>
        </>
    );
}

export default App;
