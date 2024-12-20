import { useEffect } from "react";
import { skleraSDK } from "@sklera/sdk";

function App() {
  useEffect(() => {
    skleraSDK.loaded().then(console.log).catch(console.error);
  }, []);

  return <div>Wiener Linien Anzeige</div>;
}

export default App;
