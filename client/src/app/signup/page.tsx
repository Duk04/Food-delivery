import { CreateEmail, CreateEmailPic } from "./components";

const SignUp = () => {
  return (
    <div className="grid grid-cols-2 items-center justify-center">
      <CreateEmail />
      <CreateEmailPic />
    </div>
  );
};

export default SignUp;
