import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListPost() {

    const [posts, setPosts] = useState([]);
        

    useEffect(() => {
        getPosts();
    }, []);

    function getPosts() {
        axios.get('http://localhost/react-crud-php-api-mysql/api/posts/').then(function(response) {
            console.log(response.data);
            setPosts(response.data);
        });

    }
    

    const deletePost = (id) => {
        axios.delete(`http://localhost/react-crud-php-api-mysql/api/post/${id}/delete`).then(function(response){
            console.log(response.data);
            getPosts();
        });
    }


  const filterBySearch = (event) => {
        // Access input value
        const query = event.target.value;
        console.log(query);
        // Create copy of item list
        var updatedList = [...posts];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
        return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setPosts(updatedList);

  };

    return (
    
        <div>
            <h1>List Posts</h1>
                 <div className="search-header">
                    <div className="search-text">Search:</div>
                    <input id="search-box" onChange={filterBySearch} />
                  </div>


                    <table class="table">                
                    <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, key) =>
                        <tr key={key}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.slug}</td>
                            <td>{post.content}</td>
                            <td>
                                <Link className="btn btn-primary" to={`post/${post.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button className="btn btn-danger" onClick={() => deletePost(post.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}

