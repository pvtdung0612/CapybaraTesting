import axios from "axios"
import Authentication from "services/Authentication/Authentication"

export default function Test() {

    let login = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/login',
            data: {
                email: "20020390@vnu.edu.vn",
                password: "12345678"
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                console.log(response)
            }
        })
    }
    

    return (
        <div>
            <button onClick={login}>Login</button>
        </div>
    )
}