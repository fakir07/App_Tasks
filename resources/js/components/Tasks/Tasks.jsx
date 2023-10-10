import axios from "axios";
import { useEffect, useState } from "react"
import useCategories from "../../custom/useCategories";
import { useDebounce } from "use-debounce";
import Swal from "sweetalert2";
import { Await, Link } from "react-router-dom";

export default function Tasks() {

    const [tasks, SetTasks] = useState([]);
    const [page, SetPage] = useState(1);
    const [categories, SetCategories] = useState([])
    const [catId, SetCatId] = useState(null)
    const [orderby, SetOrderby] = useState(null)
    const [rechercher, Setrechercher] = useState(null)
    const rechdebounce = useDebounce(rechercher, 1000);

    useEffect(() => {
        if (!categories.length) {
            fetchcategories();
        }
        fetchTask();
    }, [page, catId, orderby, rechdebounce[0]])


    // function pour appel custom hooke use categories
    const fetchcategories = async () => {

        const fetchedcat = await useCategories();
        SetCategories(fetchedcat);
    }

    const fetchPrevNextTasks = (link) => {
        const url = new URL(link);
        SetPage(url.searchParams.get('page'));
    }

    const fetchTask = async () => {

        try {
            if (catId) {
                const response = await axios.get(`/api/categories/${catId}/tasks?page=${page}`);
                SetTasks(response.data);
                console.log(response.data)
            } else if (orderby && orderby.column === 'id') {
                const response = await axios.get(`/api/orderbyId/${orderby.direction}/tasks?page=${page}`);
                SetTasks(response.data);
                console.log(response.data)
            } else if (orderby && orderby.column === 'title') {
                const response = await axios.get(`/api/orderbyTitle/${orderby.direction}/tasks?page=${page}`);
                SetTasks(response.data);
                console.log(response.data)
            } else if (rechdebounce[0]) {
                const response = await axios.get(`/api/rechercher/${rechdebounce[0]}/tasks?page=${page}`);
                SetTasks(response.data);
                console.log(response.data)
            } else {
                const response = await axios.get(`/api/tasks?page=${page}`);
                SetTasks(response.data);
                console.log(response.data)

            }
        } catch (error) {
            console.log(error);
        }

    }

    const checkIftask = (done) => (
        done ? (
            <span className="badge bg-success p-2">termines</span>

        )
            : (
                <span className="badge bg-danger p-2">en attente</span>
            )
    )

    const renderPagination = () => (
        <ul className="pagination">
            {
                tasks.links?.map((link, index) => (
                    <li className={`page-item  ${link.active ? " active" : ""}`} key={index}>
                        <a
                            style={{ cursor: "pointer" }}
                            className="page-link"
                            onClick={() => fetchPrevNextTasks(link.url)}
                        >
                            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                        </a>
                    </li>
                ))
            }
        </ul>

    )


    const deleTasks = async (taskId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const response = await axios.delete(`api/tasks/${taskId}`);
                    Swal.fire(
                        'Deleted!',
                        response.data.message,
                        'success'
                    )
                    fetchTask()
                } catch (error) {
                    console.log(error)

                }
            }
        });
    }



    return (
        <>
            <div className="row my-5">

                <div className="row my-2">
                    <div className="col-md-4">
                        <div className="form-group">
                            <input type="text" className="form-control " placeholder="Rechercher"
                                value={rechercher}
                                onChange={(event) => {
                                    SetCatId(null);
                                    SetOrderby(null);
                                    SetPage(1);
                                    Setrechercher(event.target.value);

                                }}

                            />
                        </div>
                    </div>

                </div>
                <div className="col-md-9 ">
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>categories</th>
                                        <th>Satuts</th>
                                        <th>date </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.data?.map(task => (
                                            <tr key={task.id}>
                                                <td> {task.id}</td>
                                                <td> {task.title}</td>
                                                <td width="40%"> {task.description}</td>
                                                <td> {task.categories.name}</td>
                                                <td> {
                                                    checkIftask(task.done)
                                                }</td>
                                                <td> {task.created_at}</td>
                                                <td className="d-flex flex-row ">
                                                    <Link className="btn btn-warning mx-2 " to={`edit/${task.id}`}
                                                    > <i class="fa-solid fa-pen-to-square"></i></Link>
                                                    <button className="btn btn-danger "
                                                        onClick={() => deleTasks(task.id)}
                                                    > <i class="fa-solid fa-trash-can"></i></button>

                                                </td>


                                            </tr>
                                        ))



                                    }
                                </tbody>
                            </table>

                            <div className="my-4 d-flex justify-content-between">
                                <div>
                                    Showing {tasks.from || 0} to {tasks.to || 0}
                                    from {tasks.total} results
                                </div>
                                <div>
                                    {renderPagination()}

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header text-center bg-white">
                            <h5 className="mt-2"> Fillter by Catigorise</h5>
                        </div>
                        <div className="card-body">
                            <div className="form-check">
                                <input type="radio" name="categorie" id="categorie" className="form-check-input"

                                    onClick={() => {
                                        // fetchTask();
                                        SetPage(1);
                                        SetCatId(null)
                                        SetOrderby(null)
                                    }}

                                    checked={catId === null ? true : false}
                                />
                                <label htmlFor="categorie" className="form-check-label">Tous</label>
                            </div>
                            {
                                categories.map(categorie => (
                                    <div className="form-check" key={categorie.id}>
                                        <input type="radio" name="categorie" className="form-check-input"

                                            onClick={(event) => {
                                                fetchTask();
                                                SetPage(1);
                                                SetOrderby(null)
                                                SetCatId(event.target.value);
                                            }}
                                            value={categorie.id}
                                            id={categorie.id}
                                        />
                                        <label htmlFor={categorie.id} className="form-check-label">{categorie.name}</label>
                                    </div>
                                ))

                            }

                        </div>
                    </div>

                    <div className="card mt-2">
                        <div className="card-header text-center bg-white">
                            <h5 className="mt-2">
                                Order By
                            </h5>
                        </div>
                        <div className="card-body">
                            <div>
                                <h6>ID</h6>
                                <div className="form-check">
                                    <input type="radio" name="id" className="form-check-input"
                                        value='asc'
                                        onClick={(event) => {
                                            SetCatId(null);
                                            SetPage(1);
                                            SetOrderby({
                                                column: 'id',
                                                direction: event.target.value
                                            });
                                        }}
                                        checked={orderby && orderby.column === 'id' && orderby.direction === "asc" ? true : false}

                                    />
                                    <label htmlFor="id" className="form-check-label">
                                        <i class="fa-solid fa-up-long"></i>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="id" className="form-check-input"
                                        value='desc'
                                        onClick={(event) => {
                                            SetCatId(null);
                                            SetPage(1);
                                            SetOrderby({
                                                column: 'id',
                                                direction: event.target.value
                                            });
                                        }}
                                        checked={orderby && orderby.column === 'id' && orderby.direction === "desc" ? true : false}
                                    />
                                    <label htmlFor="" className="form-check-label">
                                        <i class="fa-solid fa-down-long"></i>
                                    </label>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h6>Title</h6>
                                <div className="form-check">
                                    <input type="radio" name="title" className="form-check-input"
                                        value='asc'
                                        onClick={(event) => {
                                            SetCatId(null);
                                            SetPage(1);
                                            SetOrderby({
                                                column: 'title',
                                                direction: event.target.value
                                            });
                                        }}
                                        checked={orderby && orderby.column === 'title' && orderby.direction === "asc" ? true : false}

                                    />
                                    <label htmlFor="title" className="form-check-label">
                                        A to Z
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="title" className="form-check-input"
                                        value='desc'
                                        onClick={(event) => {
                                            SetCatId(null);
                                            SetPage(1);
                                            SetOrderby({
                                                column: 'title',
                                                direction: event.target.value
                                            });
                                        }}
                                        checked={orderby && orderby.column === 'title' && orderby.direction === "desc" ? true : false}
                                    />
                                    <label htmlFor="title" className="form-check-label">
                                        Z to A
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </>
    )
}