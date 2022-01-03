import React, {useRef, useState, useEffect} from "react";
import './animation.css';
import {saveMessageToLocalStorage} from "./utils";
import {BIG_CIRCLE, SMALL_CIRCLE} from "./const";
import Circle from "./Circle";
import {useSelector} from "react-redux";



const AnimField = ({close, setPlayAnim}) => {
    const canvasRef = useRef(null);
    const [message, setMessage] = useState('');
    const [hidden, setHidden] = useState(false);
    const [redCircleDirection, setRedCircleDirection] = useState(null);
    const [yellowCircleDirection, setYellowCircleDirection] = useState(null);
    const posts = useSelector((state) => state.posts);
    console.log(posts)

    const [animIsPlaying, setAnimIsPlaying] = useState(false);

    const [redCirclePos, setRedCirclePos] = useState(null);
    const [yellowCirclePos, setYellowCirclePos] = useState(null);
    const [animIsStopped, setAnimIsStopped] = useState(false);

    const circlesAreNotCollided = true;

    const getDistance = (xpos1, ypos1, xpos2, ypos2) => {
        let res = Math.sqrt(Math.pow(xpos2 - xpos1, 2) + Math.pow((ypos2 - ypos1), 2));
        return res;
    }

    const drawCanvasAnim = () => {
        let ctx = document.getElementById('canvas').getContext('2d')
        let canvas = document.getElementById('canvas');

        if(!redCirclePos && !yellowCirclePos){
            let myCircle = new Circle(canvas.offsetWidth/2, 25, Number(posts[0].bigCircleRadius), 'red', 2, canvas.offsetWidth, canvas.offsetHeight);
            let myCircle2 = new Circle(10, canvas.offsetHeight/2, Number(posts[0].smallCircleRadius), 'yellow', 6, canvas.offsetWidth, canvas.offsetHeight, true);
            myCircle.draw(ctx);
            myCircle2.draw(ctx);

            const updateCircle = () => {
                setRedCirclePos([myCircle.xpos, myCircle.ypos]);

                setYellowCirclePos([myCircle2.xpos, myCircle2.ypos]);
                ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

                if (!animIsPlaying) {

                    myCircle.update(ctx, false);
                    myCircle2.update(ctx, false);
                } else {
                    myCircle.update(ctx, animIsPlaying);
                    myCircle2.update(ctx, animIsPlaying);
                }
                requestAnimationFrame(updateCircle);
            }

            updateCircle();
        } else {
            let myCircle = new Circle(redCirclePos[0], redCirclePos[1], 25, 'red', 2, canvas.offsetWidth, canvas.offsetHeight);
            let myCircle2 = new Circle(yellowCirclePos[0], yellowCirclePos[1], 10, 'yellow', 5, canvas.offsetWidth, canvas.offsetHeight, true);
            myCircle.draw(ctx);
            myCircle2.draw(ctx);

            const updateCircle = () => {
                setRedCirclePos([myCircle.xpos, myCircle.ypos]);
                setYellowCirclePos([myCircle2.xpos, myCircle2.ypos]);
                ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

                setRedCircleDirection(myCircle.dy<0 ? 'Red circle touched bottom border' : 'Red circle touched top border');
                setYellowCircleDirection(myCircle2.dx<0 ? 'Yellow circle touched bottom border' : 'Yellow circle touched top border');

                if(getDistance(myCircle.xpos, myCircle.ypos, myCircle2.xpos, myCircle2.ypos) < myCircle.radius-myCircle2.radius) {
                    setAnimIsStopped(true);
                    myCircle.update(ctx, false)
                    myCircle2.update(ctx, false);
                    setMessage('To circles collided');
                }else{
                    if(!animIsPlaying){
                        myCircle.update(ctx, false)
                        myCircle2.update(ctx, false);
                    }else{
                        myCircle.update(ctx, animIsPlaying);
                        myCircle2.update(ctx, animIsPlaying);
                    }
                }
                requestAnimationFrame(updateCircle);
            }

            updateCircle();
        }
    }

    useEffect(()=>{
        let canvas = document.querySelector('canvas')
        canvas.style.width ='100%'
        canvas.style.height='100%'

        canvas.width  = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        drawCanvasAnim();
    }, [])

    useEffect(() => {
        drawCanvasAnim();
    }, [animIsPlaying]);

    useEffect(() => {
        if(redCircleDirection){
            setMessage(redCircleDirection);
        }
    }, [redCircleDirection]);

    useEffect(() => {
        if(yellowCircleDirection){
            setMessage(yellowCircleDirection);
        }
    }, [yellowCircleDirection]);

    useEffect(() => {
        saveMessageToLocalStorage(message);
    }, [message]);

    const pressReload = () => {
        // setAnimIsPlaying(false);
        setAnimIsStopped(false);
        setRedCirclePos(null);
        setYellowCirclePos(null);
        setMessage('Animation was reloaded');
        setAnimIsPlaying(prevState => !prevState);
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
                <div
                    className="controls__messages"
                >{message}</div>
            </div>
            <div id="work" className="anim-container">
                <canvas id="canvas" ref={canvasRef} width="400px" height="400px"/>
            </div>
        </div>

    )
};

export default AnimField;
