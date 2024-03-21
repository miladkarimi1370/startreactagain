import React from "react";
import SpinnerGif from "../assets/Disk-0.9s-261px.gif";

const Spinner = () => {
    return (
        <>
            <img src={SpinnerGif} alt="not found" className="d-block m-auto" style={{width : 200}} />
        </>
    )
}

export default Spinner;