import { bankyLogo } from "../../assets";

const AuthLayout = ({ children, title, authImage }) => {
  return (
    <main className="min-h-screen md:flex">
      <div className="flex flex-col flex-1 min-h-screen items-center md:w-[30%] md:bg-primary-50 justify-center">
        <div className="text-center">
          <img src={bankyLogo} className="h-20 w-full" alt="Banky Logo" />
          <h1 className="text-2xl font-black">{title}</h1>
        </div>
        {children}
      </div>
      <div className="hidden md:w-[70%] md:flex items-center justify-center">
        <img src={authImage} className="h-[35rem]" alt="Auth Image" />
      </div>
    </main>
  );
};

export default AuthLayout;
