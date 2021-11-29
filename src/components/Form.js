import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createPost} from "../actions/posts";
import FileBase64 from "react-file-base64";
import './form.css'

const Form = () => {

    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        author: '',
        title: '',
        post: '',
        file: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createPost(postData));
        clearInputs();
    }

    const clearInputs = () => {
        setPostData({
            author: '',
            title: '',
            post: '',
            file: ''
        })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <p>Create post</p>
                <input
                    type="text"
                    placeholder="Author"
                    value={postData.author}
                    onChange={(e) => setPostData({...postData, author: e.target.value})}
                /><br/>
                <input
                    type="text"
                    placeholder="Title"
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                /><br/>
                <input
                    type="text"
                    placeholder="Post"
                    value={postData.post}
                    onChange={(e) => setPostData({...postData, post: e.target.value})}
                /><br/>
                <label className="file">
                    Attachment
                    <FileBase64
                        type="file"
                        multiple={false}
                        placeholder="Attachment"
                        accept=".jpg, .jpeg, .png"
                        onDone={({base64}) => setPostData({...postData, file: base64})}
                    />
                </label>
                <div className="buttonContainer">
                    <input type="submit" value="Create"/><br/>
                    <input
                        type="button"
                        value="Clear"
                        onClick={clearInputs}
                    /><br/>
                </div>
            </form>
        </div>
    );
}

export default Form;
