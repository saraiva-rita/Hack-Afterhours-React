import './style.css';

function Login() {
  return (
    <div className="wrapper">
      <h2>Log In</h2>
      <div className="auth-form-wrapper">
        <form action="/auth/login" method="POST">
          <div>
            <label>
              Username
              <input type="text" name="username" placeholder="Your username" />
            </label>
          </div>
          <div>
            <label>
              Email
              <input type="email" name="email" placeholder="Your email" />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Your password"
              />
            </label>
          </div>

          <button className="button" type="submit">
            Log In
          </button>
        </form>
      </div>
      <p>
        <b>
          No account?
          <a className="login-a" href="/auth/signup">
            Create One!
          </a>
        </b>
      </p>
    </div>
  );
}
export default Login;
