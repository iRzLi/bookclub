import React from 'react';


function Register(props) {
    const [displayName, setDisplayName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onChangeHandle = (callback) => {
        return e => {
            e.preventDefault();
            callback(e.currentTarget.value);
        }
    }

    const registerUser = e => {
        e.preventDefault();
        const data = {
            email,
            displayName,
            password,
        }
        props.registerUser(data);
    }

    const login = e => {
        e.preventDefault();
        props.history.push("/login")
    }

    return (
        <div className="flexRow flexCenter height100">
            <form className="userForm shadow" onSubmit={registerUser}>
                <label htmlFor="email">
                    <div className="width100">Email</div><input type="email" id="email" placeholder="email@gmail.com" value={email} onChange={onChangeHandle(setEmail)} required/>
                </label>
                <label htmlFor="displayName">
                    <div className="width100">Display Name</div><input type="text" id="displayName" placeholder="LowEcho" value={displayName} onChange={onChangeHandle(setDisplayName)} required/>
                </label>
                <label htmlFor="password">
                    <div className="width100">Password</div><input type="password" id="password" placeholder="password123" value={password} onChange={onChangeHandle(setPassword)} required autoComplete="off"/>
                </label>
                <label htmlFor="register">
                    <input id="register" className="submitButton width100" type="submit" value="Register" />
                </label>
                <div className="link">Already have an account? <span onClick={login}>login here</span></div>
            </form>
        </div>
    )
}

export default Register;