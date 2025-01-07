import Navbar from "./component/global/navbar";
import Contactss from "./component/pages/contactss";
import Testimonialss from "./component/pages/testimonialss";
import Slider from "./pages/slider";
import Products from "./pages/products";
import CategoryCall from "./pages/categoryCall";


function App() {
    return (
        <>
            <Navbar/>
            <Contactss/>
            {/*<Testimonialss/>*/}
            <Slider/>
            <Products/>
            <CategoryCall/>
        </>
    );
}

export default App;
