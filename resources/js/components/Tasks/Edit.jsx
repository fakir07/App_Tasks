import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAllCategorise from "../../custom/useAllCategorise";

import axios from "axios";
import Swal from "sweetalert2";


export default function Craete() {
    const [title, Settitle] = useState("");
    const [description, Setdescription] = useState("");
    const [catigorie_id, Setcatigorie_id] = useState("");
    const [done, Setdone] = useState(0);
    const navigate = useNavigate();
    const [categories, Setcategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [laoding, Setloading] = useState(false);
    const { taskId } = useParams();



    useEffect(() => {
        fetchTask();
        getCategories();
    }, [])

    const fetchTask = async () => {
        try {
            const response = await axios.get(`/api/tasks/${taskId}`);
            Settitle(response.data.title);
            Setdescription(response.data.description);
            Setcatigorie_id(response.data.catigorie_id);
            Setdone(response.data.done);
        } catch (error) {
            console.log(error);
        }

    }


    const updatetasks = async (e) => {
        Setloading(true);
        e.preventDefault();
        const tasks = {
            title: title,
            description: description,
            catigorie_id: catigorie_id,
            done: done,
        }
        try {
            await axios.put(`/api/tasks/${taskId}`, tasks);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "tasks avec modifier",
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






    // function get All categories
    const getCategories = async () => {
        const getCategories = await useAllCategorise();
        Setcategories(getCategories);
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
                            <form className="mt-2"
                                onSubmit={(e) => updatetasks(e)}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={title}
                                        onChange={(e) => Settitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" rows="6" className="form-control" id="description"
                                        onChange={(e) => Setdescription(e.target.value)}
                                        value={description}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="catigorie_id" className="form-label">Categories</label>
                                    <select type="text" className="form-control" id="catigorie_id"

                                        value={catigorie_id}

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

                                <div className="form-check  form-switch">
                                    <input className="form-check-input" type="checkbox"
                                        onChange={(e) =>
                                            Setdone(!done)
                                        }
                                        name="done"
                                        id="done"
                                        value={done}
                                        checked={done}
                                    />
                                    <label className="form-check-label" htmlFor="inlineCheckbox1">Status</label>
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
