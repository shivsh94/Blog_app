import React from 'react';

const ContactPage = () => {

    return (
        <div className='min-h-screen bg-gray-900 bg-opacity-90 border'>
            <div className="max-w-2xl mx-auto p-6 text-white">
                <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
                <p className="text-lg leading-relaxed text-center">
                    Have any questions or feedback? We'd love to hear from you! Reach out to us
                    using the form below or through our social media channels.
                </p>

                <form className="mt-6 space-y-4 text-white">
                    <div>
                        <label className="block text-lg font-semibold">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Your Email"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold">Message</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Your Message"
                            rows="4"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}



export default ContactPage;
