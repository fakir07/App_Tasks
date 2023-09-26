import axios from "axios";
import { useEffect, useState } from "react"

export default function Tasks() {

    const [tasks, SeTasks] = useState([]);

    useEffect(() => {
        fetchTask();
    }, [])

    const fetchTask = async () => {
        try {
            const response = await axios.get('/api/tasks/');
            SeTasks(response.data);
        } catch (error) {
            console.log(error);
        }

    }
    const checkIftask = (done) => (
        done ? (
            <span class="badge bg-success p-2">termines</span>

        )
            : (
                <span class="badge bg-danger p-2">en attente</span>
            )

    )


    return (
        <>
            <div className="row my-5">
                <div className="col-md-9 ">
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Catigories</th>
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
                                                <td>
                                                    <span className="btn btn-warning mx-2"> <i class="fa-solid fa-pen-to-square"></i></span>
                                                    <span className="btn btn-danger "> <i class="fa-solid fa-trash-can"></i></span>

                                                </td>


                                            </tr>
                                        ))



                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>


        </>
    )
}