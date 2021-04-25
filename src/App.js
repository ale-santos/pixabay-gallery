import { Switch, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobaState'
import Navbar from './components/NavBar';
import { PagePhoto } from './pages/PagePhoto';
import PageVideo from './pages/PageVideo';
import PageContact from './pages/PageContact';
import PagePhotoSingle from './pages/PagePhotoSingle';
import { PageCart } from './pages/PageCart';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <GlobalProvider>
            <main className="bg-indigo-50 h-full">
                <ScrollToTop />
                <Navbar />
                <Switch >
                    <Route exact path={
                        ["/", "/photos"]} >
                        <PagePhoto />
                    </Route>
                    <Route path="/photo/:id">
                        <PagePhotoSingle />
                    </Route>
                    <Route path="/videos" >
                        <PageVideo />
                    </Route>
                    <Route path="/contato" >
                        <PageContact />
                    </Route>
                    <Route path="/cart" >
                        <PageCart />
                    </Route>
                </Switch>
            </main>
        </GlobalProvider>
    );
}

export default App;