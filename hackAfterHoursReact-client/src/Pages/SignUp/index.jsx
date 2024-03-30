import './style.css';

function SignUp() {
  return (
    <div id="signup-page">
      <div className="wrapper">
        <h2 className="page-title">Sign Up</h2>
        <div className="auth-form-wrapper">
          <form action="/auth/signup" method="POST">
            <label>
              Username
              <input type="text" name="username" placeholder="Your username" />
            </label>

            <label>
              Email
              <input type="email" name="email" placeholder="Your email" />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Your password"
              />
            </label>

            <button className="button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
