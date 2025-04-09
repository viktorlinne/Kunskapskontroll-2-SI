import { ICustomer } from "../interfaces/ICustomer";

export const CustomerInfo = ({ customer }: { customer: ICustomer }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg mb-10 w-full">
    <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
      Customer Information
    </h2>
    <div className="flex flex-col gap-2 text-gray-700">
      <p>
        <span className="font-semibold">Name:</span> {customer.firstname}{" "}
        {customer.lastname}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {customer.email}
      </p>
      <p>
        <span className="font-semibold">Phone:</span> {customer.phone}
      </p>
      <p>
        <span className="font-semibold">Address:</span>{" "}
        {customer.street_address}, {customer.postal_code} {customer.city},{" "}
        {customer.country}
      </p>
    </div>
  </div>
);
