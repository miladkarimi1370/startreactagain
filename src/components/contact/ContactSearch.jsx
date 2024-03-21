import React from "react";
import { PURPLE } from "../../helpers/colors";
const ContactSearch = () => {
    return (
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" id="basic-addone1" style={{ backgroundColor: PURPLE }}>
                <i className="fas fa-search"></i>
            </span>
            <input className="form-control" dir="rtl" placeholder="جستجوی مخاطبین . . ." type="text" aria-label="search" aria-describedby="basic-addone1" />
        </div>
    )
}

export default ContactSearch;