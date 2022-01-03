import {Link} from "react-router-dom";
import React, {useState} from "react";
import Form from "./components/Form";
import './app_styles.css'
import AnimField from "./animations/canvas_animation";
import {saveMessageToLocalStorage} from "./animations/utils";

const CreatePage = () => {
    const [playAnim, setPlayAnim] = useState(false);
    const [closedByUser, setClosedByUser] = useState(false);

    const readFromLocalStorage = () => {
        let messageArr = [];
        for(let key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
                continue;
            }
            if(localStorage.getItem(key)){
                messageArr.push(`${localStorage.getItem(key)} : ${key}`)
            }
        }
        return messageArr.map(mes => <div>{mes}</div>);
    }

    return (
        <div className="contentWrap">
            <header>
                <div className="sideText">
                    <div id="header-text" className="sideText__content">Some header text</div>
                </div>
                <div className="contentBox">
                    <h1 className="contentBox__text">Have a nice day</h1>
                    <i className="contentBox__icon fas fa-dove"></i>
                </div>
            </header>
            <main>
                <div className="inHeader">
                    <h3>Animation canvas :)</h3>
                </div>
                <div className="inAside">
                    <button
                        className="btn-play"
                        onClick={()=>{
                            setPlayAnim(true);
                            setClosedByUser(false);
                            localStorage.clear();
                            if(playAnim){
                                saveMessageToLocalStorage('Animation was opened');
                            }
                        }}
                    >Play</button>
                    {closedByUser && readFromLocalStorage()}
                </div>
                <div id="inMain" className="inMain">
                    {playAnim ?
                        <AnimField playAnim={playAnim} setPlayAnim={setPlayAnim} close={setClosedByUser} /> :
                        // <Form/>
                        <p>Press play button to start canvas animation</p>
                    }
                </div>
            </main>
            <aside>
                <div className="menu">
                    <h3>Menu</h3>
                    <ul>
                        <li><Link to="/yourpage">Js animation</Link></li>
                    </ul>
                </div>
            </aside>
            <footer>
                <div className="contentBox">
                    <h2 className="contentBox__text">:)</h2>
                    <i className="contentBox__icon fas fa-hand-holding-heart"></i>
                </div>
                <div id="footer-text" className="footer__content">Some footer text</div>
            </footer>
        </div>
    )
}

export default CreatePage;
