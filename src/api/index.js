import axios from "axios";

const url = 'https://post-creation-server.herokuapp.com/posts';

export const fetchPosts = async () => {
    let response = await fetch(url);

    if(response.ok) {
        let json = await response.json();
        return json;
    }else {
        console.log('Fetching error');
    }
}
export const createPost = async (newPost) =>{
    // axios.post(url, newPost);
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })

    return await response.json();
};

export const deletePost = (id) => axios.delete(`${url}/${id}`);
