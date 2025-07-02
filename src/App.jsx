import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Provider from "./context";
import Login from "./pages/Login";
import NewPage from "./pages/NewPage";
import Profille from "./pages/Profille";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="homepage" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="newspage" element={<NewsPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/newpage" element={<NewPage />} />
              <Route path="/profille" element={<Profille />} />
            </Route>
          </Routes>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
