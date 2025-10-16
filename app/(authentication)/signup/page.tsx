import Header from "../../_components/authentication/Header";
import SignupForm from "../../_components/authentication/SignupForm";

function page() {
  return (
    <div className="bg-linear-24 from-[#28a7ed] from-0% via-[#a337f6] via-53% to-[#e84d70] to-100%">
      <div className="relative grid w-full place-items-center">
        <Header>Register</Header>
        <SignupForm />
      </div>
    </div>
  );
}

export default page;
