import React from "react";
import Main_section from "../Blocks/Main_section/Main_section";
import Collection_section from "../Blocks/Collection_section/Collection_section";
import History_section from "../Blocks/History_section/History_section";
import Flats_section from "../Blocks/Flats_section/Flats_section";
import Elegant_section from "../Blocks/Elegant_section/Elegant_section";
import Contacts from "../Blocks/Contacts/Contacts";
import Consultation from "../Blocks/Consultation/Consultation";

function Main_Page({ children, ...props }) {
    return (
        <main>
            <Main_section />
            <Collection_section />
            <History_section />
            <Flats_section />
            <Elegant_section />
            <Contacts />
            <Consultation />
        </main>
    );
}

export default Main_Page;