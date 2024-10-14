import React, { useState } from 'react';
import '/src/App.css'; 
import Swal from 'sweetalert2';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (name && email && message) {
      Swal.fire({
        title: 'Message Sent',
        text: 'Thanks for contacting us. We will get back to you soon.',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 1500,
        showConfirmButton: false,
      });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } else {
      Swal.fire({
        title: 'Form Incomplete',
        text: 'Please fill the form correctly!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Your Phone (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="map-section">
          <h3>Our Location</h3>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.888657178883!2d73.04796111535255!3d33.59513438074243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df91de191160f3%3A0x9e34c6d3ed2fcb59!2sRawalpindi%2C%20Pakistan!5e0!3m2!1sen!2sbd!4v1696387402356!5m2!1sen!2sbd" 
            width="100%" 
            height="250" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
