import React, { useContext } from "react";
import { PURPLE } from "../../helpers/colors";
import { ContactContext } from "../../context/contactContext";
const ContactSearch = () => {
    const { contactSearch } = useContext(ContactContext)
    return (
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" id="basic-addone1" style={{ backgroundColor: PURPLE }}>
                <i className="fas fa-search"></i>
            </span>
            <input
                className="form-control"
                dir="rtl"
                placeholder="جستجوی مخاطبین . . ."
                type="text"
                aria-label="search"
                aria-describedby="basic-addone1"

                onChange={(e) => contactSearch(e.target.value)}
            />
        </div>
    )
}

export default ContactSearch;