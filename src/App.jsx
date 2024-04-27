import useStoreWebsiteDataToLocalStorage from "./Hooks/App/useStoreWebsiteDataToLocalStorage";
import useChangeLangDirOnKeys from "./Hooks/Helper/useChangeLangDirOnKeys";
import AppRoutes from "./Routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  useStoreWebsiteDataToLocalStorage();
  // useChangeLangDirOnKeys()

  return (
    <>
      <AppRoutes />;
      <Toaster />
    </>
  );
}

export default App;
