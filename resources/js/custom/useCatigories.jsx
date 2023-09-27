import axios from "axios"

const useCatigories = async () => {

    try {
        const response = await axios.get('/api/categories');
        return response.data;


    } catch (error) {
        console.log(error)

    }
}

export default useCatigories;