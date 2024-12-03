'use client'

import { Card, CardHeader, Divider, Spacer } from "@nextui-org/react";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 sm:p-8 bg-white shadow-lg">
          {/* Header */}
          <CardHeader className="flex flex-col gap-3 p-8 bg-primary">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Shipping Policy
            </h1>
          </CardHeader>
          {/* <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Shipping Policy
          </h1> */}
          <Spacer y={4} />
          {/* COVID Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-yellow-700 font-medium text-center">
              * PLEASE BE ADVISED THAT SHIPPING MAYBE DELAYED DUE TO THE CORONA VIRUS PANDEMIC *
            </p>
          </div>

          {/* General Information */}
          <div className="space-y-6 text-gray-700">
            <p>
              Sacramento Cash and Carry accepts online orders 24 hours a day, every day of the week.
              Phone orders are received Mon – Sat between 7 a.m. to 5 p.m. Orders are processed in
              the order they are received. All orders are shipped from our location in Roseville CA.
              Sacramento Cash and Carry ships to all Continental U.S. except to Hawaii, Alaska, Puerto Rico and other territories. We also currently do not ship to APO(Army Post Office ) or FPO (Fleet Post Office ) addresses.
              <Spacer y={4} />
              Orders placed are usually processed and shipped from Monday to Friday within 1-2 business days from the time the order is placed.
            </p>

            <Divider className="my-6" />

            {/* Free Shipping Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Free Shipping Order</h2>
              <p className="mb-4">
                There will be no shipping charges on the first order you place with us.
                All orders are shipped through UPS ground.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Some exclusions apply:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>No expedited delivery</li>
                  <li>No Drinks/Whip Its/Butane</li>
                  <li>Certain products may be restricted based on the store&apos;s internal policy</li>
                </ul>
              </div>
            </section>

            <Divider className="my-6" />

            {/* Expedited Shipping Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Expedited Shipping Order</h2>
              <ul className="space-y-3">
                <li>• Expedited shipping orders, such as Priority and Express shipping, are elevated in priority to meet the delivery deadline.</li>
                <li>• Priority and Express orders should be placed before 11:00 AM forprocessing and shipment on the same business day.</li>
                <li>• Priority and Express orders received after 11:00 AM will be processed and shipped on the next business day.</li>
                <li>• The day an order ships does not count as a day in transit.</li>
                <li>• Orders placed from Friday to Sunday will be processed the following Monday and shipped within 1-2 days. UPS does not pick up or deliver on weekends.</li>
              </ul>
            </section>

            <Divider className="my-6" />

            {/* Holiday Notice */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-700 font-medium">
                **Due to the high volume of orders during holiday seasons you may experience extended
                processing time of up to 3 business days.**
              </p>
            </div>

            {/* Additional Sections... */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Different Billing Address</h2>
              <ul className="space-y-3">
                <li>• Orders that contain a different shipping address from the billing address may be subject to review, in which case the customer will be contacted. This can delay shipping time.</li>
                <li>• Sacramento Cash and Carry cannot guarantee same day expedited shipping when an order is placed on hold for review.</li>
                <li>• If you change your shipping address please notify us by email or phone call or by specifically stating it in the notes section of your order.</li>
                <li>• We are not responsible for shipments that are delivered to a wrong address due to an incorrect or incomplete shipping address provided by the customer.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additions or Changes to your Shipping Order:</h2>
              <p className="space-y-3">
                In the event that you want to add items or make changes to your order, all orders or changes should be made before 2 p.m. (M-F) while the order is still in the processing stage. You will receive email notification of the status of your order periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Lost/Stolen/Damaged Shipments:</h2>
              <ul className="space-y-3">
                <li>• If your shipment status indicates “delivered” but you have not received the delivery, you must notify Sacramento Cash and Carry as well as the shipping carrier immediately.</li>
                <li>• Once you have reported a lost shipment, we will launch an inquiry with our carrier and attempt to have it recovered.</li>
                <li>• If the carrier declares the shipment to be a complete loss, we will reship your order to you at no charge if stock is available.</li>
                <li>• If you receive a damaged shipment do not accept it.Damaged shipment can include but is not limited to visible tear, crushed box etc. Make sure the Delivery Driver records that delivery was refused due to damage. Take pictures to demonstrate the damage. Then notify Sacramento Cash and Carry as well as the shipping carrier of the issue.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tracking Your Shipment:</h2>
              <ul className="space-y-3">
                <li>• Orders are shipped via UPS Ground and will be delivered by local post or its affiliates.</li>
                <li>• When your order ships from our warehouse, UPS willsend you a shipping confirmation email including your tracking number to the email provided by you on your account.</li>
                <li>• Sacramento Cash and Carry will also send you two emails:</li>
                <li>• a confirmation email that states that the order has been shipped.</li>
                <li>• a second confirmation email with a copy of your invoice confirming the final value of your order based on the items shipped including any shipping fees applicable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Undeliverable or Refused Shipment:</h2>
              <p className="space-y-3">
                If your shipment is unclaimed, or refused (not because of damage) and undeliverable due to wrong address, you are responsible for the following:
              </p>
              <ul className="space-y-3">
                <li>• Original shipping costs.</li>
                <li>• Service charges that are incurred on the shipment for both the original and return shipments.</li>
                <li>• The amount of these charges will be subtracted from your merchandise refund.</li>
                <li>• For orders that are refused due to change of mind or any other reason, a restocking fee will be applied to your account.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pick up Timings:</h2>
              <ul className="space-y-3">
                <li>• We ship using UPS/GSO/USPS</li>
                <li>• Carrier pick up time is 3:30 p.m. (UPS and GSO) and 9 a.m. for USPS</li>
                <li>• For free shipping we normally use UPS but we will. Also utilize GSO, USPS at our discretion.</li>
              </ul>
            </section>

            <Divider className="my-6" />

            {/* Shipping Restrictions */}
            <section className="bg-red-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Restrictions</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>We do not ship butane</li>
                <li>All tobacco sales are for California customers only (Including Hookah tobacco and wraps)</li>
                <li>These restrictions are in keeping with state/federal and shipping company regulations</li>
              </ul>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}
