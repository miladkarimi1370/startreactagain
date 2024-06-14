import React, { useContext } from "react";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";


import Contact from "./Contact";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";


const Contacts = () => {
    const { filteredContacts, loading, deleteContact } = useContext(ContactContext);
    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3 float-start">
                                <Link to={"/contacts/add"} className="btn mx-2" style={{ backgroundColor: PINK }}>ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2"></i>
                                </Link>

                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ?
                    <Spinner /> :
                    (
                        <section className="container">
                            <div className="row">
                                {/* the contact part  */}
                                {filteredContacts.length > 0 ? filteredContacts.map((c) => (
                                    <Contact key={c.id} contact={c} deleteContact={() => deleteContact(c.id, c.fullName)} />
                                )) : (
                                    <div className="text-center py-5" style={{ backgroundColor: CURRENTLINE }}>
                                        <p className="h3" style={{ color: ORANGE }}>مخاطب یافت نشد . . .</p>
                                        <img src={require("../../assets/notfound.jpg")} alt="not found" className="w-25 rounded" />
                                    </div>
                                )
                                }

                            </div>
                        </section>
                    )
            }

        </>
    )
}

export default Contacts;