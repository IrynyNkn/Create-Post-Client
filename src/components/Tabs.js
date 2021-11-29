import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {deletePost, getPosts} from "../actions/posts";
import './tabs.css';

const TabContent = ({posts, toggleActive, setToggleActive}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts);
    },[])

    const onDeletePost = (post) => {
        dispatch(deletePost(post._id));
        setToggleActive(0);
    }

    return (
        posts.map((post, index) => (
            <div key={index} className={`tab__content ${index === toggleActive ? 'tab__content--active' : ''}`}>
                <div className={"wrapper"}>
                    <div className={"tab__info"}>
                        <div className={"tab__title"}>{post.title}</div>
                        <div className={"tab__author"}>Author: {post.author}</div>
                        <div className={"tab__post"}>{post.post}</div>
                        <button
                            className={"tab__btn tab__delete"}
                            onClick={() => onDeletePost(post)}
                        >Delete</button>
                    </div>
                    <div className={"tab__photo"}>
                        <img src={post.file}/>
                    </div>
                </div>
            </div>
        ))
    );
}

const TabPanel = ({posts, toggleActive, setToggleActive}) => {
    return (
        posts.map((post, index) => (
            <button key={index} className={`tab ${toggleActive===index ? 'tab--active' : ''}`} onClick={() => setToggleActive(index)}>
                {post.title}
            </button>
        ))
    );
};

const Tabs = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    const [toggleActive, setToggleActive] = useState(0);

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, []);

    return (
        <>
            <h1>Your Posts</h1>
            <div className={"container"}>
                <div className={"tabPanel"}>
                    {<TabPanel
                        posts={posts}
                        toggleActive={toggleActive}
                        setToggleActive={setToggleActive}
                    />}
                </div>
                {<TabContent
                    posts={posts}
                    toggleActive={toggleActive}
                    setToggleActive={setToggleActive}
                />}
            </div>
        </>
    );
}

export default Tabs;
