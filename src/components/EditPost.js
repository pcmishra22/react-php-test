import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        getPost();
    }, []);

    function getPost() {
        axios.get(`http://localhost/react-crud-php-api-mysql/api/post/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost/react-crud-php-api-mysql/api/post/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        
    }
    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                     <table class="table">
                    <tbody>
                        <tr>
                            <th>
                                <label>Title: </label>
                            </th>
                            <td>
                                <input value={inputs.title} type="text" name="title" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Slug: </label>
                            </th>
                            <td> 
                                <input value={inputs.slug} type="text" name="slug" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Content: </label>
                            </th>
                            <td>
                                <input value={inputs.content} type="text" name="mobile" onChange={handleChange} />
                            </td>
                        </tr>
                         <tr>
                        <td>&nbsp;</td>
                            <td align ="">
                                <button className="btn btn-primary">Update Post</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </form>
        </div>
    )
}
