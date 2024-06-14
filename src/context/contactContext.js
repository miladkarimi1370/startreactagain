import { createContext } from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => { },
  
    setContact: () => { },
    contacts: [],
    setFilteredContacts: () => { },
    setContacts: () => { },

    filteredContacts: [],
    groups: [],

    deleteContact: () => { },
    createContact: () => { },
    contactSearch: () => { },

});

