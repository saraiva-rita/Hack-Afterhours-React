import './style.css';

function Contacts() {
  const openLinkInNewTab = (url) => {
    const newTab = window.open(url, '_blank');
    newTab.focus();
  };

  return (
    <div className="about wrapper">
      <h2 className="page-title">Contacts</h2>
      <br />
      <div className="container mt-4">
        <div className="contacts-card">
          <div className="card" style={{ width: '18rem' }}>
            <img
              className="card-img-top"
              src="./public/images/rita.jpg"
              alt="Rita Saraiva"
            />
            <div className="card-body">
              <h5 className="card-title">Rita Saraiva</h5>
              <p> Web Developer</p>
              <a
                href="#"
                onClick={() =>
                  openLinkInNewTab('https://www.linkedin.com/in/rita-saraiva/')
                }
              >
                <i className="fa-brands fa-linkedin"></i> Connect on LinkedIn
              </a>
              <br />
              <a
                href="#"
                onClick={() =>
                  openLinkInNewTab('https://github.com/saraiva-rita')
                }
              >
                <i className="fa-brands fa-github"></i> Check my work
              </a>
            </div>
          </div>
          <div className="card" style={{ width: '18rem' }}>
            <img
              className="card-img-top"
              src="./public/images/bruno.jpeg"
              alt="Bruno Cunha"
            />
            <div className="card-body">
              <h5 className="card-title">Bruno Cunha</h5>
              <p> Web Developer</p>
              <a
                href="#"
                onClick={() =>
                  openLinkInNewTab(
                    'https://www.linkedin.com/in/brunorcunha3000/'
                  )
                }
              >
                <i className="fa-brands fa-linkedin"></i> Connect on LinkedIn
              </a>
              <br />
              <a
                href="#"
                onClick={() =>
                  openLinkInNewTab('https://github.com/brcunha3000')
                }
              >
                <i className="fa-brands fa-github"></i> Check my work
              </a>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
export default Contacts;
