import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


export default function Craete() {
    const [title, Settitle] = useState("");
    const [description, Setdescription] = useState("");
    const [catigorie_id, Setcatigorie_id] = useState("");
    const [status, Setstatus] = useState(false);
    const navigate = useNavigate();
    const [categories, Setcategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [laoding, Setloading] = useState(false);

    useEffect(() => {
        getCategories();
    }, [])


    const creationTasks = async (e) => {
        Setloading(true);
        e.preventDefault();
        const tasks = {
            title,
            description,
            catigorie_id,
        }
        try {
            await axios.post(`api/tasks`, tasks);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "tasks avec sauvgarder",
                showConfirmButton: false,
                timer: 4000
            });
            Setloading(false)
            navigate('/');

        } catch (error) {
            setErrors(error.response.data.errors);
            Setloading(false)
        }
    }


    // const renderErrors = () => {
    //     errors.?

    // }



    // function get All categories
    const getCategories = async () => {
        try {
            const responce = await axios.get(`api/categoriesAll`);
            Setcategories(responce.data);
        } catch (error) {
            console.log(error);

        }
    }




    return (
        <div className="container mt-5">
            <div className="col-md-12 mx-a">
                {Object.keys(errors).length > 1 ?
                    <div class="alert alert-danger" role="alert">
                        <strong>erros</strong>
                        <ul>
                            {Object.keys(errors).map((key) => (
                                errors[key].map((errorMessage, index) => (
                                    <li key={index}>{errorMessage}</li>
                                ))
                            ))}
                        </ul>
                    </div>
                    : ""
                }

                <div className="card">
                    <div className="card-header bg-white">
                        <div className="text border-bottom mt-2">
                            <h3> Creations les Tasks</h3>
                        </div>
                        <div className="card-body">
                            <form className="mt-2" onSubmit={creationTasks}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={title}
                                        onChange={(e) => Settitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" rows="6" className="form-control" id="description"
                                        onChange={(e) => Setdescription(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="catigorie_id" className="form-label">Categories</label>
                                    <select type="text" className="form-control" id="catigorie_id" value={catigorie_id}

                                        onChange={(e) => Setcatigorie_id(e.target.value)
                                        }
                                    >
                                        {
                                            categories?.map(categorie => (
                                                <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                {
                                    laoding ?
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> :
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-danger mt-2">Creation</button>
                                        </div>
                                }



                            </form>

                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
