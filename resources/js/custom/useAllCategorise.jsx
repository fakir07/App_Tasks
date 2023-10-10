import axios from "axios"

const useAllCategorise = async () => {

    try {
        const response = await axios.get('/api/categoriesAll');
        return response.data;
    } catch (error) {
        console.log(error)

    }
}

export default useAllCategorise;