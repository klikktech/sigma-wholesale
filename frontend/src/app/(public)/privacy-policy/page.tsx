'use client'

import { Card, Divider } from "@nextui-org/react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card className="p-6 sm:p-8 bg-white shadow-lg">
                    {/* Header */}
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        Privacy Policy
                    </h1>

                    {/* Who We Are */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Who We Are</h2>
                        <p className="text-gray-700">
                            Our website address is: <a href="https://sigmawholesaletx.com/" className="text-blue-600 hover:underline">
                                https://sigmawholesaletx.com/</a>
                        </p>
                    </section>

                    <Divider className="my-6" />

                    {/* Comments */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                When visitors leave comments on the site we collect the data shown in the comments form,
                                and also the visitor&apos;s IP address and browser user agent string to help spam detection.
                            </p>
                            <p>
                                An anonymized string created from your email address (also called a hash) may be provided
                                to the Gravatar service to see if you are using it. The Gravatar service privacy policy is
                                available here: <a href="https://automattic.com/privacy/" className="text-blue-600 hover:underline">
                                    https://automattic.com/privacy/</a>
                            </p>
                            <p>
                                After approval of your comment, your profile picture is visible to the public in the
                                context of your comment.
                            </p>
                        </div>
                    </section>

                    <Divider className="my-6" />

                    {/* Media */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Media</h2>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                If you upload images to the website, you should avoid uploading images with embedded
                                location data (EXIF GPS) included. Visitors to the website can download and extract
                                any location data from images on the website.
                            </p>
                        </div>
                    </section>

                    <Divider className="my-6" />

                    {/* Cookies */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                If you leave a comment on our site you may opt-in to saving your name, email address
                                and website in cookies. These are for your convenience so that you do not have to fill
                                in your details again when you leave another comment. These cookies will last for one year.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>Cookie duration:</p>
                                <ul className="list-disc list-inside">
                                    <li>Login cookies last for two days</li>
                                    <li>Screen options cookies last for a year</li>
                                    <li>&quot;Remember Me&quot; selection persists for two weeks</li>
                                    <li>Article editing cookies expire after 1 day</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <Divider className="my-6" />

                    {/* Embedded Content */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Embedded Content From Other Websites
                        </h2>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website. These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
                            </p>
                        </div>
                    </section>

                    <Divider className="my-6" />

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Who We Share Your Data With
                        </h2>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                If you request a password reset, your IP address will be included in the reset email.
                            </p>
                        </div>
                    </section>

                    <Divider className="my-6" />

                    {/* Data Retention */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            How Long We Retain Your Data
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                Comments and their metadata are retained indefinitely. This is so we can recognize
                                and approve any follow-up comments automatically instead of holding them in a
                                moderation queue.
                            </p>
                            <p>
                                For users that register on our website, we also store the personal information they
                                provide in their user profile. All users can see, edit, or delete their personal
                                information at any time (except they cannot change their username).
                            </p>
                        </div>
                    </section>

                    <Divider className="my-6" />

                    {/* Your Rights */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Your Data Rights
                        </h2>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                You can request to receive an exported file of the personal data we hold about you,
                                including any data you have provided to us. You can also request that we erase any
                                personal data we hold about you. This does not include any data we are obliged to
                                keep for administrative, legal, or security purposes.
                            </p>
                        </div>
                    </section>

                    {/* Data Sharing */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Who We Share Your Data With
                        </h2>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                Visitor comments may be checked through an automated spam detection service.
                            </p>
                        </div>
                    </section>
                </Card>
            </div>
        </div>
    );
}
