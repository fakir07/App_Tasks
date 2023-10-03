import React, { useEffect, useState } from "react";
import useCategories from "../../custom/useCategories";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Craete() {
    const [title, Settitle] = useState("");
    const [description, Setdescription] = useState("");
    const [catigorie_id, Setcatigorie_id] = useState("");
    const [status, Setstatus] = useState(false);
    const navigate = useNavigate();
    const [categories, Setcategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])



    // function get All categories
    const getCategories = async () => {
        try {
            const responce = await axios.get(`api/categoriesAll`);
            Setcategories(responce.data);
        } catch (error) {
            console.log(error);

        }
    }

    /// function pour save data

    const creationTasks = (e) => {
        e.reventDefault();
        const tasks = {
            title,
            description,
            catigorie_id,
        }

        try {
            const respoonce = await axios.post(`api/tasks`,task)
            
        } catch (error) {
            
        }
    }



    return (
        <div className="container mt-5">
            <div className="col-md-12 mx-a">
                <div className="card">
                    <div className="card-header bg-white">
                        <div className="text border-bottom mt-2">
                            <h3> Creations les Tasks</h3>
                        </div>
                        <div className="card-body">
                            <form className="mt-2">
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
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="status" />
                                    <label className="form-check-label" htmlFor="status">Status</label>
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-danger mt-2">Creation</button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
