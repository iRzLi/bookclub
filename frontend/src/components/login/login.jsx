import React from 'react';


function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onChangeHandle = (callback) => {
        return e => {
            e.preventDefault();
            callback(e.currentTarget.value);
        }
    }

    const loginUser = e => {
        e.preventDefault();
        const data = {
            email,
            password,
        }
        props.loginUser(data);
    }

    const register = e => {
        e.preventDefault();
        props.history.push("/register")
    }

    return (
        <div className="flexRow flexCenter height100">
            <form className="userForm shadow" onSubmit={loginUser}>
                <label htmlFor="email">
                    <div className="width100">Email</div><input type="email" id="email" placeholder="email@gmail.com" value={email} onChange={onChangeHandle(setEmail)} required />
                </label>
                <label htmlFor="password">
                    <div className="width100">Password</div><input type="password" id="password" placeholder="password123" value={password} onChange={onChangeHandle(setPassword)} required autoComplete="on" />
                </label>
                <label htmlFor="login">
                    <input id="login" className="submitButton width100" type="submit" value="Login" />
                </label>
                <div className="link">Don't have an account? <span onClick={register}>register here</span></div>
            </form>
        </div>
    )
}

export default Login;