import React from "react";
import Main_section from "../Blocks/Main_section/Main_section";
import Collection_section from "../Blocks/Collection_section/Collection_section";
import History_section from "../Blocks/History_section/History_section";

function Main_Page({ children, ...props }) {
    return ( 
        <main>
            <Main_section/>
            <Collection_section/>
            <History_section/>
        </main>
     );
}

export default Main_Page;