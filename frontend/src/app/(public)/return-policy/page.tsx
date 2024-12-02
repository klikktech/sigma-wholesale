'use client'

import { Card, Divider, Spacer } from "@nextui-org/react";

export default function ReturnPolicy() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card className="p-6 sm:p-8 bg-white shadow-lg">
                    {/* Header */}
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        Return Policy
                    </h1>

                    {/* Company Address */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-8">
                        <h2 className="text-xl font-semibold mb-4">Who We Are</h2>
                        <p>
                            To ensure a refund, a credit on your account, or exchange for another item of the same price, please keep in mind these important points when returning an item:
                            <Spacer y={4} />
                            Shortage, discrepancy, or damage in a shipment must be reported within 2 business days. Please do not discard any boxes or wrapping supplies until the issue is resolved.
                            <Spacer y={4} />
                            It is the customer’s responsibility to properly pack, ship and insure the contents of all returned packages using a traceable ground shipping method (we recommend US Postal Service insured mail) to:
                            <Spacer y={4} />
                        </p>
                        <address className="not-italic">
                            Sacramento Cash and Carry<br />
                            1160 Tara Ct, Ste A<br />
                            Rocklin, CA 95765
                        </address>
                    </div>

                    {/* Important Return Guidelines */}
                    <section className="space-y-6 text-gray-700">
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                            <p className="font-medium">
                                All returns must be authorized. To obtain a Return Authorization Number,
                                email our Customer Service Department at sales@goscac.com
                                <Spacer y={4} />
                                We will refuse and reject all returned packages if there is no Return Authorization Number marked on the outside of the box.
                            </p>
                        </div>

                        {/* Return Requirements */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Return Requirements</h2>
                            <ul className="space-y-3 list-disc list-inside">
                                <li>Returned within 14 days from shipping date</li>
                                <li>In good condition, in original packaging with all products, parts and accessories and the UPC Code on the exterior and Received in saleable condition.</li>
                                <li>Write the Return Authorization Number on the outside of the box and on a copy of the original packing slip which should be packed inside the box.</li>
                                <li>All returns will be inspected and must be 100% complete.</li>
                                <li>All free items included with a specific product purchase must be returned as well to receive credit.</li>
                                <li>When buy in case but return less than case quantity, the refund price will be calculated using the next higher price level.</li>
                                <li>It’s the customers responsibility to make claims with the carrier for any proof of delivery or damage to shipment returned to Sacramento Cash and Carry.</li>
                                <li>All authorized returned items are subject to a 15% restocking fee unless the item(s), was received damaged or defective or wrong item received.</li>
                                <li>No returns can be made on clearance sale items; these are considered final sales.</li>
                                <li>Credit will always be issued to the same credit card to which they were charged.</li>
                                <li>We will issue a refund within 7 business days of receiving and processing your return. It should appear on your statement within two billing periods, depending on your billing cycle.</li>

                            </ul>
                        </section>

                        <Divider className="my-6" />

                        {/* Important Notices */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Notices</h2>
                            <div className="space-y-4">
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <p className="font-medium">
                                        All our shipments are 100% insured. It is very important to inspect your product thoroughly before accepting and signing for your carton(s). Packaging that appears in good condition does not guarantee that there is no “hidden” damage. The only way to be certain is to fully unpack and examine the contents carefully before signing. Legally, by applying your signature, you are signing a document stating that you have inspected the item and it is in good condition.
                                    </p>
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <p className="font-medium">
                                        Many times, it is common practice by UPS to leave packages on your doorstep if no one is available for signature. Again, please inspect the package by fully unpacking and examining the contents. If you notice damage to the product during inspection, please email our customer service department immediately at sales@goscac.com.
                                    </p>
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <p className="font-medium">
                                        Shortage, discrepancy, or damage Claims must by filed with 2 business days after receipt. We will issue a return merchandise authorization (RMA) number if claim is made within the period stated.                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Defective Merchandise</h2>

                            <p className="font-medium space-y-4">
                                You have 14 days on all defective parts returned to Sacramento Cash and Carry for replacement. If you receive a defective product upon delivery and it’s not due to shipping damages, please contact Customer Service Support at sales@goscac.com. Please have available order number and the original date of purchase for verification.
                            </p>
                        </div>

                        <Divider className="my-6" />

                        {/* Types of Returns */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Types of Return Requests</h2>
                            <div className="grid gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium mb-2">Restocking Fee Applied:</h3>
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>Buyer changes mind, buyer remorse or price difference</li>
                                        <li>Buyer changes mind and returns item. Item received was not received back in original form or was declared incomplete.</li>
                                        <li>Buyer refuses delivery</li>
                                        <li>Buyer returns an item, but it arrives to the seller damaged, defective, or materially different than what was originally shipped by seller.</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium mb-2">No Restocking Fee:</h3>
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>Buyer receives an item materially different from what they ordered. </li>
                                        <li>Items arrives to the buyer damaged or defective. </li>
                                        <li>Buyer refuses delivery due to visible damage incurred during shipping or caused by carrier </li>
                                        <li>Order is returned as undeliverable No Restocking Fee Applied but if buyer had knowledge or refused delivery of package(s) or wrong address provided by customer a $18.00 charge per box applied.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <Divider className="my-6" />

                        {/* Additional Fees */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Fees</h2>
                            <ul className="space-y-3">
                                <li>Buyer returns an item and fails to indicate RMA# on shipment; $18.00 fee assessed as RMA Processing Fee (this fee may be added on to any additional fees that may be assessed to the order as result of non-compliance)</li>
                                {/* <li>• $18.00 RMA Processing Fee for returns without RMA# marked on shipment</li> */}
                            </ul>
                        </section>

                        {/* Contact Information */}
                        <div className="bg-gray-50 p-4 rounded-lg mt-8">
                            <p className="font-medium">
                                For return status inquiries, contact Customer Service at sales@goscac.com<br />
                                Hours: 7:00am – 5:00pm PST Mon-Sat
                            </p>
                            <p className="mt-2 text-sm text-gray-600">
                                You will receive a response by email within 48 hours after submitting your request.
                            </p>
                        </div>
                    </section>
                </Card>
            </div>
        </div>
    );
}
