import './index.css'

export const Login = () => {
    return (
        <>
            <div className="login-container">
                <div className="item">
                    <h2 className="title">Login</h2>
                    <form>
                        <input type="text" placeholder="Enter username"/>
                        <input type="password" placeholder="Enter password"/>
                    </form>
                </div>
                <div className="separator"></div>
                <div className="item">
                    <h2 className="title">Create an Account</h2>
                    <form>
                        <label htmlFor='file'>Upload an image</label>
                        <input type="file" id="file" style={{ display: "none" }}/>
                        <input type="text" placeholder="Enter username"/>
                        <input type="email" placeholder="Enter email"/>
                        <input type="password" placeholder="Enter password"/>
                    </form>
                </div>
            </div>
        </>
    )
}