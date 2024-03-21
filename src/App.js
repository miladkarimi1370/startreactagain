import React, { useState } from 'react';
import { Contacts, Navbar } from './components';


const App = () => {
    const [loading, setLoading] = useState(false);
    const [getContacts, setContacts] = useState([]);
    return (
        <div>
            <Navbar />
            <Contacts contacts={getContacts} loading={loading} />
        </div>
    )
}

export default App