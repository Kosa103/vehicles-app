import React from "react";

import OptionsBarUnauth from "./OptionsBarUnauth";
import RightBoxUnauth from "./RightBoxUnauth";

import SearchVehicles from "../CommonComponents/SearchVehicles";
import DisplaySearchResults from "../CommonComponents/DisplaySearchResults";


export default function ContentSearchPageUnauth({ updateResults, searchResults, changeAuth }) {
    return (
        <>
            <div className="center-box">
                <OptionsBarUnauth />
                <div className="content-box">
                    <SearchVehicles updateResults={updateResults} />
                    <DisplaySearchResults searchResults={searchResults} />
                </div>
            </div>
            <RightBoxUnauth changeAuth={changeAuth}/>
        </>
    );
}
