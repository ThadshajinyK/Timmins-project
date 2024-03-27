import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_6dwiys9', 'template_cod2ny2', form.current, {
        publicKey: 'Hp7zwn8I3jI5UnvZ7',from_name: "Vinoyan Vijayakumar"
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="to_name" required/> <br/><br/>
      <label>Email</label>
      <input type="email" name="to_email" required/><br/><br/>
      <label>Message</label>
      <textarea name="message" /><br/><br/>
      <input type="text" name="from_name" value="itfac thadsha"/><br/><br/>
      
      <input className="display-none" type="submit" value="Send" /><br/><br/>
    </form>
  );
};