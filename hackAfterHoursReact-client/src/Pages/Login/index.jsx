import './style.css';

function Login() {
  return (
    <div id="login-page">
      <div className="wrapper">
        <h2 className="page-title">Log In</h2>
        <div className="auth-form-wrapper">
          <form action="/auth/login" method="POST">
            <div>
              <label>
                Username
                <input
                  type="text"
                  name="username"
                  placeholder="Your username"
                />
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
            <br />
            <p>
              <b>
                No account?{' '}
                <a
                  className="login-a"
                  href="/auth/signup"
                  style={{ color: '#333' }}
                >
                  {' '}
                  Create One!
                </a>
              </b>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
