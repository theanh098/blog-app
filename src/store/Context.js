import { createContext } from "react";
const initialValue = JSON.parse(localStorage.getItem("user"));

const Context = createContext();
function Provider(props) {
  return (
    <Context.Provider value={initialValue}>{props.children}</Context.Provider>
  );
}
export { Context, Provider };
