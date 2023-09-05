import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost/react-crud-php-api-mysql/api/user/save', inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        
    }
    return (
        <div>
            <h1>Create post</h1>
            <form onSubmit={handleSubmit}>



                <table class="table">
                  <thead>

                  </thead>
                  <tbody>
                         <tr>
                            <th>
                                <label>Title: </label>
                            </th>
                            <td>
                                <input type="text" name="title" onChange={handleChange} />
                            </td>
                        </tr>
 
                        <tr>
                            <th>
                                <label>Slug: </label>
                            </th>
                            <td> 
                                <input type="text" name="slug" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Content: </label>
                            </th>
                            <td>
                                <input type="textarea" name="content" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                        <td>&nbsp;</td>
                            <td align ="">
                                <button className="btn btn-primary">Create Post</button>
                            </td>
                        </tr>
                  </tbody>
                </table>



                <table cellSpacing="10">
                    <tbody>
                 
                    </tbody>
                </table>
            </form>
        </div>
    )
}
