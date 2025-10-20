import SignoutButton from "../authentication/SignoutButton";
import DeleteAccountButton from "../UI/DeleteAccountButton";

function Logo() {
  return (
    <div className="flex min-h-[137px] flex-1 flex-col rounded-lg bg-linear-24 from-[#28a7ed] from-0% via-[#a337f6] via-53% to-[#e84d70] to-100% px-6 pt-4.5 pb-6 text-white">
      <div className="space-y-2 lg:flex lg:items-center lg:justify-between lg:space-y-0">
        <SignoutButton />
        <DeleteAccountButton />
      </div>
      <div className="mt-auto">
        <p className="text-xl font-bold">Frontend Mentor</p>
        <p className="text-base font-medium">Feedback Board</p>
      </div>
    </div>
  );
}

export default Logo;
