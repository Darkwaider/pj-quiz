import axios from "axios";

export default axios.create({
    baseURL:"https://read-quiz-default-rtdb.firebaseio.com"
})