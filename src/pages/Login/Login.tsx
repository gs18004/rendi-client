import logo from '~/assets/svg/logo.svg';
import GoogleLogin from '~/pages/Login/components/GoogleLogin';
export default function Login() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-[103px] bg-[#fafafa] px-4 pt-[206px]">
      <div className="flex flex-col items-center gap-12">
        <img src={logo} alt="Logo" className="h-[156px] w-[156px]" />
        <div className="flex flex-col items-center gap-[18px]">
          <p className="text-3xl font-semibold leading-none text-black">
            Rendi
          </p>
          <p className="text-sm font-extralight leading-none tracking-[4px] text-black/40">
            소개팅의 새로운 패러다임
          </p>
        </div>
      </div>
      <GoogleLogin />
    </div>
  );
}
