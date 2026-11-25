
import React, { useState } from 'react';
import "./Contact.css";
import Header from "./../Header/Header.jsx";
import Footer from "./../Footer/Footer.jsx";
import contactVector from "./../../assets/contact_anime.png";
import gitHub from "./../../assets/gh.png";
import linkedIn from "./../../assets/li.png";

function Contact() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult("");

    const formData = new FormData(event.target);
    formData.append(
      "access_key",
      "019f836a-3a34-4d48-862a-eeb6754a7358"
    );

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (data.success) {
        setResult("success");
        event.target.reset();
      } else {
        setResult("error");
      }
    } catch (error) {
      setResult("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='section-container'>
      <Header
        heading="Get in touch."
        subHeading="Interested to collaborate? Feel free to drop me an email."
      />

      <div className='contact-form-container'>

        {result === "success" && (
          <div className='alert'>
            Thanks for the submission!
          </div>
        )}

        {result === "error" && (
          <div className='alert'>
            Something went wrong. Please try again.
          </div>
        )}

        <form
          className='contact-form'
          onSubmit={onSubmit}
          id='contact-form'
        >
          <input
            type="email"
            className='input-box email-input'
            placeholder='Your Email Id'
            name='email'
            required
          />

          <textarea
            placeholder='Your Message'
            name='message'
            className='input-box body-input'
            required
          />

          <button
            type="submit"
            className="contact-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>

      <div className='social-icons-container'>
        <a
          href="https://github.com/rafidbinnasir"
          className='social-icon'
          target="_blank"
          rel="noreferrer"
        >
          <img src={gitHub} alt='github' loading="lazy"/>
        </a>

        <a
          href="https://www.linkedin.com/in/rafid-bin-nasir-292798288/"
          className='social-icon'
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedIn} alt='linkedin' loading="lazy"/>
        </a>
      </div>

      <Footer
        phrase="Read more "
        link="about me."
        toAddress="/about"
      />

      <div className='vector-frame'>
        <img
          src={contactVector}
          alt="contact"
          loading="lazy"
          className='about-vector'
        />
      </div>
    </div>
  );
}

export default Contact;
