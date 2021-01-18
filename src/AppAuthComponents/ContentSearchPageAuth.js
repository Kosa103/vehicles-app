import React from "react";

import OptionsBarAuth from "./OptionsBarAuth";
import RightBoxAuth from "./RightBoxAuth";
import SearchVehicles from "../CommonComponents/SearchVehicles";
import DisplaySearchResults from "../CommonComponents/DisplaySearchResults";


export default function ContentSearchPageAuth({ updateResults, searchResults, changeAuth }) {
    return (
        <>
            <div className="center-box">
                <OptionsBarAuth />
                <div className="content-box">
                    <SearchVehicles updateResults={updateResults} />
                    <DisplaySearchResults searchResults={searchResults} />
                </div>
            </div>
            <RightBoxAuth changeAuth={changeAuth} />
        </>
    );
}
