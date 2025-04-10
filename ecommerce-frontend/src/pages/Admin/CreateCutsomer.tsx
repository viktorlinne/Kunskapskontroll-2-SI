import { CustomerForm } from "../../components/CustomerForm";

export const CreateCustomer = () => {
  const handleSubmit = (id: number | null) => {
    console.log("Creating customer, received id:", id);
    // Maybe call an API or update state here
  };

  return (
    <>
      <CustomerForm submitHandler={handleSubmit} />
    </>
  );
};
