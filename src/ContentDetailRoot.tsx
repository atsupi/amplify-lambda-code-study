import { Button } from "@aws-amplify/ui-react";
import { NavLink } from "react-router-dom";

export function ContentDetailRoot() {
    return (
        <>
        <p>ContentDetail Root</p>
        <NavLink to="/">
            <Button>Back</Button>
        </NavLink>
        </>
    )
}