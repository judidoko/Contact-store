import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import NavBar from "./Componets/NavBar/NavBar";
import ContactList from "./Componets/Contacts/ContactList/ContactList";
import AddContact from "./Componets/Contacts/AddContact/AddContact";
import ViewContact from "./Componets/Contacts/ViewContact/ViewContact";
import EditContact from "./Componets/Contacts/EditContact/EditContact";

let App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contacts/list"} />} />
        <Route path="/contacts/list" element={<ContactList />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/view/:contactId" element={<ViewContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
      </Routes>
    </>
  );
};

export default App;
