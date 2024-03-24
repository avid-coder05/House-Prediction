import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

export default function Signup() {
    const [border, setBorder] = useState('#ffffff');
    const [opacity, setOpacity] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setOpacity(1);
        }, 10);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const form = Object.fromEntries(formData.entries());
        const pswd=form.password;
        const chkPswd=form.checkPassword;

        if(pswd!=chkPswd) {
            setBorder('#994400');
            alert("Passwords do not match");
        }
        else {
            const testForm = { ...form, 'login':0};
            delete testForm.checkPassword;

            try {
                const res = await fetch("https://house-prediction-backend.onrender.com", {
                    method: e.target.method,
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(testForm)
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error("Failed add credentials");
                }
                else {

                    if('error' in data) {
                        setErrorMessage(data.error);
                    }
                    else {
                        if(data.login) {
                            setOpacity(0);
                            setTimeout(() => {
                                navigate("/");
                            }, 3000);
                        }
                    }
                }

            } catch (error) {
            alert(error.message);
            }
        }

    }

    function handleBack() {
        setOpacity(0);
        setTimeout(() => {
            navigate("/");
        }, 1400);
    }

    return (
        <div className="sign-super-container" style={{opacity: opacity}}>
        <h1 className="sign-heading">Enter your username and set a Password</h1>
        <div className="sign-container">
            <form method="post" onSubmit={handleSubmit} className="sign-form">
                <label className="sign-label">Username: </label><input type="text" name="username" className="sign-input"/>
                <label className="sign-label">Password: </label><input type="password" name="password" style={{background: border}} className="sign-input"/>
                <label className="sign-label">Re-enter password: </label><input type="password" name="checkPassword" style={{background: border}} className="sign-input"/>
                <div className="sign-buttons">
                    <button type="submit" className="sign-button">Submit</button>
                    <button type="button" className="sign-button" onClick={handleBack}>Back</button>
                </div>
                {errorMessage && (
                    <div className="errormsg" style={{color: 'red'}}>
                    {errorMessage}
                    </div>
                )}
            </form>
        </div>
        </div>
    );
}