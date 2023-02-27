import "../../style/help-page.css";

function HelpPage(props: { userName: string }) {
  const { userName } = props;

  return (
    <div className="help-page">
      <div className="page-title">
        <h3>Support</h3>
      </div>
      <div className="help-page_main">
        <div className="help-page_window">
          <p className="help-page_form-title">Contact support</p>
          <div className="contact-form-wrapper">
            <form className="contact-form">
              <div className="form_line">
                <label htmlFor="name-input">Your name *</label>
                <input
                  className="form-input help_input"
                  id="name-input"
                  type="text"
                  placeholder={userName}
                  required
                />
              </div>
              <div className="form_line">
                <label htmlFor="email-input">Your email *</label>
                <input
                  className="form-input help_input"
                  id="email-input"
                  type="email"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="form_line">
                <label htmlFor="message-input">What can we help you with? *</label>
                <textarea
                  className="form-input help_input"
                  id="message-input"
                  placeholder="Type your message"
                  required
                />
              </div>
              <div className="form_line form_button-line">
                <input
                  className="button"
                  type="submit"
                  value="Submit"
                  onClick={(e) => e.preventDefault()}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
