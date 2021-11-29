import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getPosts} from "./actions/posts";
import Tabs from "./components/Tabs";

const YourPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <div className="contentWrap">
            <header>
                <div className="sideText">
                    <div id="header-text" className="sideText__content">Some header text</div>
                </div>
                <div className="contentBox">
                    <h1 className="contentBox__text">Baby, i'm a sociopath</h1>
                    <i className="contentBox__icon fas fa-dove"></i>
                </div>
            </header>
            <main>
                <div className="inHeader"><h2>Home Sweet Home</h2></div>
                <div className="inAside">

                </div>
                <div id="inMain" className="inMain">
                    <Tabs/>
                </div>
            </main>
            <aside>
                <div className="menu">
                    <h3>Menu</h3>
                    <ul>
                        {/*<li><a href="./index.html">Your page</a></li>*/}
                        <li><Link to="/">Create Page</Link></li>
                    </ul>
                </div>
            </aside>
            <footer>
                <div className="contentBox">
                    <h2 className="contentBox__text">Sweet Serial Killer</h2>
                    <i className="contentBox__icon fas fa-hand-holding-heart"></i>
                </div>
                <div id="footer-text" className="footer__content">Some footer text</div>
            </footer>
        </div>
    );
}

export default YourPage;
