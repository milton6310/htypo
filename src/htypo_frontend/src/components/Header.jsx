import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Typo from "./typos/Typo";
import TypoGames from "./typos/TypoGames";
import Essay from "./Essay";
import logo from "../assets/logo.png";
import homeImage from "../assets/hunminjungeum.png";

function Header(props) {

    // const [userOwnedGallery, setOwnedGallery] = useState();
    // const [listingGallery, setListingGallery] = useState();

    // async function getNFTs() {
    //     const userNFTIds = await opend.getOwnedNFTs(CURRENT_USER_ID);
    //     console.log(userNFTIds);
    //     setOwnedGallery(<Gallery title="My NFTs" ids={userNFTIds} role="collection" />);

    //     const listedNFTIds = await opend.getListedNFTs();
    //     console.log(listedNFTIds);
    //     setListingGallery(<Gallery title="Discover" ids={listedNFTIds} role="discover" />);
    // };

    // useEffect(() => {
    //     getNFTs();
    // }, []);

    return (
        <BrowserRouter forceRefresh={true}>
            <div className="app-root-1">
                <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
                    <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
                        <div className="header-left-4"></div>
                        <img className="header-logo-11" src={logo} />
                        <div className="header-vertical-9"></div>
                        <Link to="/">
                            <h5 className="Typography-root header-logo-text">Hangul Typo</h5>
                        </Link>
                        <div className="header-empty-6"></div>
                        <div className="header-space-8"></div>
                        <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                            <Link to="/practice">
                                Practice
                            </Link>
                        </button>
                        <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                            <Link to="/games">
                                Games
                            </Link>
                        </button>
                        <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                            <Link to="/essays">
                                Essays
                            </Link>
                        </button>
                    </div>
        </header>
            </div>
            <Routes>
                <Route exact path="/" element={<img className="bottom-space" src={homeImage} />} />
                <Route path="/practice" element={<Typo />} />
                <Route path="/games" element={<TypoGames />} />
                <Route path="/essays" element={<Essay />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Header;
