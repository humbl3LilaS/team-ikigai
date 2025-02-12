const ContactPage = () => {
    return (
        <section className="py-2 px-4">
            <div className="flex items-center justify-center">
                <h3 className="text-3xl font-bold">Contact Us</h3>
            </div>

            <div className="flex flex-col h-full md:h-[500px] gap-5 md:flex-row items-start justify-between  md:p-10 pb-4 mt-6">
                <div className="py-5 w-full md:w-2/3 lg:w-3/4 px-10 h-full border">
                    <h1 className="font-bold flex pb-5 items-center justify-center text-xl md:text-3xl">
                        Get In Touch
                    </h1>
                    <p className="text-sm sm:text-lg font-semibold">
                        Have any questions or need assistance? Contact us
                        through the form below or reach out via phone or email.
                    </p>
                    <div className="mt-4 flex flex-col gap-5">
                        <div>
                            <p className="font-semibold">📍 Address:</p>
                            <p>123 Tech Street, Yangon, Myanmar</p>
                        </div>
                        <div>
                            <p className="font-semibold mt-2">📞 Phone:</p>
                            <p>+95 9 123 456 789</p>
                        </div>
                        <div>
                            <p className="font-semibold mt-2">✉ Email:</p>
                            <p>support@myantech.com</p>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white md:w-1/2 lg:w-2/4 p-6 border border-neutral-200 rounded-2xl shadow-md">
                    <h2 className="font-bold text-xl md:text-2xl text-center mb-4">
                        Send Us a Message
                    </h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            className="w-full p-3 border rounded-lg h-32"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
