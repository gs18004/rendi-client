import googleLogo from '~/assets/svg/google.svg';
export default function GoogleLogin() {
  return (
    <button className="shadow-google flex w-full items-center justify-center gap-[15px] rounded-xl bg-white p-[15px]">
      <img src={googleLogo} alt="Google Logo" />
      <p className="text-base font-semibold text-black/50">
        Google 계정으로 로그인
      </p>
    </button>
  );
}
