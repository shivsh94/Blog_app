import React from 'react';

const About = () => {
    return (
        <div className='min-h-screen bg-gray-900 bg-opacity-90 border'>
            <div className="max-w-3xl mx-auto p-6 text-white font-sans ">
                <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
                <p className="text-lg leading-relaxed">
                    Welcome to our blog! We are passionate about sharing insightful content
                    on various topics, providing valuable knowledge, and engaging with our
                    community. Whether you're here to learn, explore new ideas, or just
                    enjoy a good read, we've got something for you.
                </p>

                <h2 className="text-2xl font-semibold mt-6">Our Mission</h2>
                <p className="text-lg leading-relaxed">
                    Our mission is to create a platform where ideas can flourish, and
                    meaningful discussions take place. We believe in the power of
                    storytelling and knowledge-sharing to inspire and educate.
                </p>

                <h2 className="text-2xl font-semibold mt-6">Who We Are</h2>
                <p className="text-lg leading-relaxed">
                    We are a team of enthusiastic writers, developers, and creatives
                    dedicated to bringing fresh and thought-provoking content to our
                    readers. Our diverse backgrounds allow us to cover a wide range of
                    topics with unique perspectives.
                </p>

                <h2 className="text-2xl font-semibold mt-6">Connect With Us</h2>
                <p className="text-lg leading-relaxed">
                    We love hearing from our readers! Feel free to reach out through our
                    social media channels or drop us an email. Let’s build a community
                    together!
                </p>
            </div>
        </div>
    );
}



export default About;
