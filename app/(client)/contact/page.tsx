const ContactPage = () => {
  return (
    <section className='p-5' >
        <div className='flex items-center justify-center'>
          <h3 className='text-3xl font-bold'>Contact Us</h3>
        </div>

      <div className='block md:flex items-center justify-around md:p-10 gap-10 pb-4 mt-6'>
        <div>
          <h1 className='font-bold text-3xl md:text-5xl mb-4'>Get In Touch</h1>
          <p className='text-xs md:text-sm'>
            Have any questions or need assistance? Contact us through the form below or reach out via phone or email.
          </p>
          <div className='mt-4'>
            <p className='font-semibold'>📍 Address:</p>
            <p>123 Tech Street, Yangon, Myanmar</p>
            <p className='font-semibold mt-2'>📞 Phone:</p>
            <p>+95 9 123 456 789</p>
            <p className='font-semibold mt-2'>✉ Email:</p>
            <p>support@myantech.com</p>
          </div>
        </div>
        <div className='mt-6 w-1/3 bg-white p-6 border border-neutral-200 rounded-2xl shadow-md'>
          <h2 className='font-bold text-xl md:text-2xl text-center mb-4'>Send Us a Message</h2>
          <form className='space-y-4'>
            <input type='text' placeholder='Your Name' className='w-full p-3 border rounded-lg' required />
            <input type='email' placeholder='Your Email' className='w-full p-3 border rounded-lg' required />
            <textarea placeholder='Your Message' className='w-full p-3 border rounded-lg h-32' required></textarea>
            <button type='submit' className='w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600'>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;