import { Link } from "react-router-dom";
import { NAVIGATE } from "../utils/constants";

export const Logo = () => {

    return (
        <Link to={NAVIGATE.home} className="logo">
            Star Wars Explorer
        </Link>
    );
};