import s from "./ContactForm.module.scss";

const ContactForm = () => {
  function handleSubmit(e) {
    e.preventDefault();
    resetForm(e);
    // Required a function to show popup message to notify user that the message has been sent
  }

  function resetForm(e) {
    const resetButton = e.target.querySelector("button[type=reset]");
    resetButton?.click();
  }

  return (
    <form className={s.contactForm} onSubmit={handleSubmit}>
      <div className={s.inputs}>
        <div className={s.wrapper}>
          <div className={s.input}>
            <input
              type="text"
              autoComplete="off"
              placeholder="Your Name"
              name="username"
              required
            />
            <span className={s.star} style={{ left: "103px" }} />
          </div>

          <div className={s.input}>
            <input
              type="email"
              autoComplete="off"
              placeholder="Your Email"
              name="email"
              required
            />
            <span className={s.star} style={{ left: "98px" }} />
          </div>

          <div className={s.input}>
            <input type="text" placeholder="Your Phone" name="phone" required />
            <span className={s.star} style={{ left: "103px" }} />
          </div>
        </div>

        <textarea
          name="message"
          autoComplete="off"
          placeholder="Your Message"
        />
      </div>

      <div className={s.buttons}>
        <button type="reset">Reset</button>
        <button type="submit">Send Message</button>
      </div>
    </form>
  );
};
export default ContactForm;
