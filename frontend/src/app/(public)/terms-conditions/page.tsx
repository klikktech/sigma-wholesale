'use client'

import { Card, CardBody, CardHeader, Spacer } from "@nextui-org/react"

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-white shadow-xl">
                    <CardHeader className="flex flex-col gap-3 p-8 bg-primary">
                        <h1 className="text-3xl font-bold text-gray-800 text-center">
                            Terms and Conditions
                        </h1>
                        <p className="text-gray-500 text-center">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </CardHeader>

                    <CardBody className="p-8">
                        <div className="prose prose-gray max-w-none">
                            <div className="space-y-6">
                                <section className="bg-gray-50 p-6 rounded-lg">
                                    <p className="text-gray-700 leading-relaxed">
                                        This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    {/* Platform Ownership */}
                                    <div className="border-l-4 border-primary pl-4">
                                        <h2 className="text-xl font-semibold text-red-600 mb-3">
                                            Platform Ownership
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name [www.flipkart.com][www.flipkart.com] (“Website”), including the related mobile site and mobile application (hereinafter referred to as “Platform”)
                                            <Spacer y={4} />

                                            The Platform is owned by Flipkart Internet Private Limited a company incorporated under the Companies Act, 1956 with its registered office at Buildings Alyssa, Begonia & Clover, Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Bengaluru – 560103, Karnataka, India and its branch offices at 2nd Floor, Block F (Flora), Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Bengaluru-560103, Karnataka, India and; 447/C, 12th Main, 4th Block, Koramangala, Bengaluru-560034, Karnataka, India (hereinafter referred to as “Flipkart”).
                                            <Spacer y={4} />

                                            Your use of the Platform and services and tools are governed by the following terms and conditions (“Terms of Use”) as applicable to the Platform including the applicable policies which are incorporated herein by way of reference. If You transact on the Platform, You shall be subject to the policies that are applicable to the Platform for such transaction. By mere use of the Platform, You shall be contracting with Flipkart Internet Private Limited and these terms and conditions including the policies constitute Your binding obligations, with Flipkart.
                                            <Spacer y={4} />

                                            For the purpose of these Terms of Use, wherever the context so requires “You” or “User” shall mean any natural or legal person who has agreed to become a buyer on the Platform by providing Registration Data while registering on the Platform as Registered User using the computer systems. Flipkart allows the User to surf the Platform or making purchases without registering on the Platform. The term “We”, “Us”, “Our” shall mean Flipkart Internet Private Limited.
                                            <Spacer y={4} />

                                            When You use any of the services provided by Us through the Platform, including but not limited to, (e.g. Product Reviews, Seller Reviews), You will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service, and they shall be deemed to be incorporated into this Terms of Use and shall be considered as part and parcel of this Terms of Use. We reserve the right, at Our sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time without any prior written notice to You. It is Your responsibility to review these Terms of Use periodically for updates / changes. Your continued use of the Platform following the posting of changes will mean that You accept and agree to the revisions. As long as You comply with these Terms of Use, We grant You a personal, non-exclusive, non-transferable, limited privilege to enter and use the Platform.
                                            <Spacer y={4} />

                                            ACCESSING, BROWSING OR OTHERWISE USING THE SITE INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING. By impliedly or expressly accepting these Terms of Use, You also accept and agree to be bound by Flipkart Policies ((including but not limited to Privacy Policy available at Privacy) as amended from time to time.                    </p>
                                    </div>

                                    {/* Membership Eligibility */}
                                    <div className="border-l-4 border-primary pl-4">
                                        <h2 className="text-xl font-semibold text-red-600 mb-3">
                                            Membership Eligibility
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            Transaction on the Platform is available only to persons who can form legally binding contracts under Indian Contract Act, 1872. Persons who are “incompetent to contract” within the meaning of the Indian Contract Act, 1872 including un-discharged insolvents etc. are not eligible to use the Platform. If you are a minor i.e. under the age of 18 years, you may use the Platform or access content on the Platform only under the supervision and prior consent/ permission of a parent ormlegal guardian.
                                            <Spacer y={4} />
                                            As a minor if you wish to transact on the Platform, such transaction on the Platform may be made by your legal guardian or parents. Flipkart reserves the right to terminate your membership and / or refuse to provide you with access to the Platform if it is brought to Flipkart’s notice or if it is discovered that You are under the age of 18 years and transacting on the Platform.                    </p>
                                    </div>

                                    {/* Account Responsibilities */}
                                    <div className="border-l-4 border-primary pl-4">
                                        <h2 className="text-xl font-semibold text-red-600 mb-3">
                                            Your Account and Registration Obligations
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete or We have reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, or not in accordance with the this Terms of Use, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform and refuse to provide You with access to the Platform.
                                            <Spacer y={4} />
                                            Your mobile phone number and/or e-mail address is treated as Your primary identifier on the Platform. It is your responsibility to ensure that Your mobile phone number and your email address is up to date on the Platform at all times. You agree to notify Us promptly if your mobile phone number or e-mail address changes by updating the same on the Platform through a onetime password verification.
                                            <Spacer y={4} />
                                            You agree that Flipkart shall not be liable or responsible for the activities or consequences of use or misuse of any information that occurs under your Account in cases, including, where You have failed to update Your revised mobile phone number and/or e-mail address on the Website Platform.
                                            <Spacer y={4} />
                                            If You share or allow others to have access to Your account on the Platform (“Account”), by creating separate profiles under Your Account, or otherwise, they will be able to view and access Your Account information. You shall be solely liable and responsible for all the activities undertaken under Your Account, and any consequences therefrom.                    </p>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <h2 className="text-xl font-semibold text-red-600 mb-3">
                                            Communications
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            When You use the Platform or send emails or other data, information or communication to us, You agree and understand that You are communicating with Us through electronic records and You consent to receive communications via electronic records from Us periodically and as and when required. We may communicate with you by email or by such other mode of communication, electronic or otherwise.</p>
                                    </div>
                                    <div className="border-l-4 border-primary pl-4">
                                        <h2 className="text-xl font-semibold text-red-600 mb-3">
                                            Platform for Transaction and Communication
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            The Platform is a platform that Users utilize to meet and interact with one another for their transactions. Flipkart is not and cannot be a party to or control in any manner any transaction between the Platform’s Users.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-primary pl-4">
                                        <h2 className="text-xl font-semibold text-red-600 mb-3">
                                            Henceforward:
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            All commercial/contractual terms are offered by and agreed to between Buyers and Sellers alone. The commercial/contractual terms include without limitation price, shipping costs, payment methods, payment terms, date, period and mode of delivery, warranties related to products and services and after sales services related to products and services. Flipkart does not have any control or does not determine or advise or in any way involve itself in the offering or acceptance of such commercial/contractual terms between the Buyers and Sellers. All discounts, offers (including exchange offers) are by the Seller/Brand and not by Flipkart.
                                            <Spacer y={4} />
                                            Placement of order by a Buyer with Seller on the Platform is an offer to buy the product(s) in the order by the Buyer to the Seller and it shall not be construed as Seller’s acceptance of Buyer’s offer to buy the product(s) ordered. The Seller retains the right to cancel any such order placed by the Buyer, at its sole discretion and the Buyer shall be intimated of the same by way of an email/SMS. Any transaction price paid by Buyer in case of such cancellation by Seller, shall be refunded to the Buyer. Further, the Seller may cancel an order wherein the quantities exceed the typical individual consumption. This applies both to the number of products ordered within a single order and the placing of several orders for the same product where the individual orders comprise a quantity that exceeds the typical individual consumption. What comprises a typical individual’s consumption quantity limit shall be based on various factors and at the sole discretion of the Seller and may vary from individual to individual.
                                            <Spacer y={4} />

                                            Flipkart does not make any representation or Warranty as to specifics (such as quality, value, salability, etc) of the products or services proposed to be sold or offered to be sold or purchased on the Platform. Flipkart does not implicitly or explicitly support or endorse the sale or purchase of any products or services on the Platform. Flipkart accepts no liability for any errors or omissions, whether on behalf of itself or third parties.
                                            <Spacer y={4} />

                                            Flipkart is not responsible for any non-performance or breach of any contract entered into between Buyers and Sellers. Flipkart cannot and does not guarantee that the concerned Buyers and/or Sellers will perform any transaction concluded on the Platform. Flipkart shall not and is not required to mediate or resolve any dispute or disagreement between Buyers and Sellers.
                                            <Spacer y={4} />

                                            Flipkart does not make any representation or warranty as to the item-specifics (such as legal title, creditworthiness, identity, etc) of any of its Users. You are advised to independently verify the bona fides of any particular User that You choose to deal with on the Platform and use Your best judgment in that behalf.
                                            <Spacer y={4} />

                                            Flipkart does not at any point of time during any transaction between Buyer and Seller on the Platform come into or take possession of any of the products or services offered by Seller nor does it at any point gain title to or have any rights or claims over the products or services offered by Seller to Buyer.
                                            <Spacer y={4} />
                                            At no time shall Flipkart hold any right, title or interest over the products nor shall Flipkart have any obligations or liabilities in respect of such contract entered into between Buyers and Sellers. Flipkart is not responsible for unsatisfactory or delayed performance of services or damages or delays as a result of products which are out of stock, unavailable or back ordered.
                                            <Spacer y={4} />
                                            The Platform is only a platform that can be utilized by Users to reach a larger base to buy and sell products or services. Flipkart is only providing a platform for communication and it is agreed that the contract for sale of any of the products or services shall be a strictly bipartite contract between the Seller and the Buyer.
                                        </p>
                                    </div>
                                </section>

                                <div className="bg-gray-100 p-6 rounded-lg mt-8">
                                    <p className="text-sm text-gray-600 text-center">
                                        By accessing or using our Platform, you agree to be bound by these Terms and Conditions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
