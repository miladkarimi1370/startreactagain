import React from "react";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";


import Contact from "./Contact";
import Spinner from "../Spinner";

const Contacts = ({ contacts, loading }) => {
    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <button className="btn mx-2" style={{ backgroundColor: PINK }}>ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2"></i>
                                </button>

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
                                {contacts.length > 0 ? contacts.map((c) => (
                                    <Contact key={c.id} contact={c} />
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