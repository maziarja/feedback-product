import { type Metadata } from "next";
import Header from "../../_components/authentication/Header";
import LoginForm from "../../_components/authentication/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

async function Page() {
  return (
    <div className="bg-linear-24 from-[#28a7ed] from-0% via-[#a337f6] via-53% to-[#e84d70] to-100%">
      <div className="relative grid w-full place-items-center">
        <Header>Login</Header>
        <LoginForm />
      </div>
    </div>
  );
}

export default Page;
