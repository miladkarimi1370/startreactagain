import React, { useEffect } from 'react';
import { AddContact, Contacts, EditContact, Navbar, ViewContact } from './components';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import { createContact, getAllContacts, getAllGroups, deleteContact } from "./services/contactService";
import { COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from './helpers/colors';

import { ContactContext } from './context/contactContext';
import _ from "lodash";
import { useImmer } from 'use-immer';
import { Icons, ToastContainer, toast } from 'react-toastify';

const App = () => {

    const [loading, setLoading] = useImmer(false);
    const [contacts, setContacts] = useImmer([]);
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    const [groups, setGroups] = useImmer([]);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactsData } = await getAllContacts();
                const { data: groupsData } = await getAllGroups();
                setContacts(contactsData);
                setGroups(groupsData);
                setFilteredContacts(contactsData)
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }

        fetchData();
    }, [])



    const createContactForm = async (values) => {


        try {
            setLoading(draft => !draft);
            const { status, data } = await createContact(values);
            if (status === 201) {
                toast.success(`مخاطب ${data.fullName} با موفقیت ساخته شد`);
                setContacts(draft => {
                    draft.push(data)
                });
                setFilteredContacts(draft => {
                    draft.push(data)
                });
                setLoading(draft => !draft);
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }


    const confirmDalete = (contactId, fullName) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <>
                        <div dir='rtl'
                            style={{ backgroundColor: CURRENTLINE, border: `1px solid ${PURPLE}`, borderRadius: "1em" }} className='p-4'>
                            <h4 style={{ color: YELLOW }}>حذف مخاطب</h4>
                            <p style={{ color: FOREGROUND }}>مطمئن هستید که میخواهید مخاطب {fullName} را پاک کنید ؟ </p>
                            <button onClick={() => {
                                removeContact(contactId);
                                onClose();
                            }}
                                className='btn mx-2'
                                style={{ backgroundColor: PURPLE }}
                            >بله</button>
                            <button onClick={onClose} className='btn mx-2' style={{ backgroundColor: COMMENT }}>انصراف</button>
                        </div>
                    </>
                )
            }
        })
    }

    const removeContact = async (contactId) => {
        const contactsBackUp = [...contacts];
        try {
            setContacts(draft => draft.filter(c => c.id !== parseInt(contactId)));
            setFilteredContacts(draft => draft.filter(c => c.id !== parseInt(contactId)));
            setContacts()
            const { status } = await deleteContact(contactId);
            toast.warning("مخاطب با موفقیت حذف شد ")
            if (status !== 200) {

                setContacts(contactsBackUp);
                setFilteredContacts(contactsBackUp);

            }
        } catch (err) {

            console.log(err.message);
            setContacts(contactsBackUp);
            setFilteredContacts(contactsBackUp);

        }
    }



    const contactSearch = _.debounce(query => {
        if (!query) return setFilteredContacts([...contacts]);

        setFilteredContacts(draft => draft.filter(c => c.fullName.toLowerCase().includes(query.toLowerCase())))
    }, 1000)
    return (
        <ContactContext.Provider value={{
            loading,
            setLoading,

            setContacts,
            contacts,
            groups,
            setFilteredContacts,
            filteredContacts,

            deleteContact: confirmDalete,
            createContact: createContactForm,
            contactSearch,

        }}>
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"

                />
                <Navbar />
                <Routes>
                    <Route path='/' element={<Navigate to="/contacts" />} />
                    <Route path='/contacts' element={<Contacts />} />
                    <Route path='/contacts/add' element={<AddContact />}
                    />
                    <Route path='/contacts/:contactId' element={<ViewContact />} />
                    <Route path='/contacts/edit/:contactId' element={<EditContact />} />
                </Routes>

            </div>
        </ContactContext.Provider>
    )
}

export default App