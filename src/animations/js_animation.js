import React, {useRef, useState, useEffect} from "react";
import './animation.css';
import {saveMessageToLocalStorage} from "./utils";
import {useSelector} from "react-redux";

const AnimationJs = ({close, setPlayAnim}) => {
    const [animIsPlaying, setAnimIsPlaying] = useState(false);
    const [animIsStopped, setAnimIsStopped] = useState(false);
    const [message, setMessage] = useState('');
    const [circleTouchedBorder, setCircleTouchedBorder] = useState(false);
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);
    const [redBallDirection, setRedBallDirection] = useState(1);
    const [yellowBallDirection, setYellowBallDirection] = useState(1);
    const posts = useSelector((state) => state.posts);
    console.log(posts)

    const drawCircle = () => {
        let animField = document.getElementById("canvas");
        let redBall = document.getElementById("redBall");
        let yellowBall = document.getElementById("yellowBall");

        if (animIsPlaying) {

            if (dx >= animField.offsetWidth - 60 && redBallDirection === 1) {
                setRedBallDirection(prevState => -prevState);
                setMessage('Red circle touched right border');
            }
            if (dx <= 0 && redBallDirection === -1) {
                setRedBallDirection(prevState => -prevState);
                !(dx===0 && dy===0) && setMessage('Red circle touched left border');
            }
            if (dy >= animField.offsetHeight - 35 && yellowBallDirection === 1) {
                setYellowBallDirection(prevState => -prevState)
                setMessage('Yellow circle touched bottom border');
            }
            if (dy <= 0 && yellowBallDirection === -1) {
                setYellowBallDirection(prevState => -prevState);
                !(dx===0 && dy===0) && setMessage('Yellow circle touched top border');
            }
            yellowBall.style.top = dy + 'px';
            redBall.style.left = dx + 'px';

            if (!(dy >= 155 && dx >= 340 && dy <= 180 && dx <= 360)) {
                setDy(prevState => prevState + 1 / 25 * yellowBallDirection);
                setDx(prevState => prevState + 1 / 5 * redBallDirection);
            }else{
                setAnimIsStopped(true);
                setMessage('Animation stopped because two circles collided');
            }
        }
    }

    useEffect(() => {
        drawCircle();
    }, [dx, dy]);

    useEffect(() => {
        drawCircle();
    },[animIsPlaying]);

    useEffect(() => {
        saveMessageToLocalStorage(message);
    }, [message]);

    const pressReload = () => {
        setMessage('Animation was reloaded');
        setDx(0);
        setDy(0);
        setAnimIsStopped(false);
        setAnimIsPlaying(true);
    }

    return (
        <div className="container">
            <div className="controls">
                <div className="controls__btns">
                    {
                        animIsStopped ?
                            <div>
                                <button
                                    className="button"
                                    onClick={() => pressReload()}
                                >{posts[0].reloadBtnText}
                                </button>
                            </div> :
                            !animIsPlaying ?
                                <button
                                    className="button"
                                    onClick={() => {
                                        setAnimIsPlaying(true);
                                        setMessage('The animation was started');
                                    }}
                                >{posts[0].startBtnText}</button> :
                                <button
                                    className="button"
                                    onClick={() => {
                                        setAnimIsPlaying(false);
                                        setMessage('The animation was stopped');
                                    }}
                                >{posts[0].stopBtnText}</button>
                    }
                    <button
                        className="button"
                        onClick={() => {
                            saveMessageToLocalStorage('Animation was closed');
                            close(true);
                            setPlayAnim(false);
                        }}
                    >{posts[0].closeBtnText}
                    </button>
                </div>
                <div className="controls__messages">{message}</div>
            </div>
            <div id="canvas" className="anim-container anim-js-container">
                <div id="redBall" className="ball--red"></div>
                <div id="yellowBall" className="ball--yellow"></div>
            </div>
        </div>

    );
};

export default AnimationJs;
