import googleLogo from '~/assets/svg/google.svg';
import { BASE_URL } from '~/constants/api';

export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${BASE_URL}/auth/google`;
    } catch (error) {
      console.error('구글 로그인 에러:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-[15px] rounded-xl bg-white p-[15px] shadow-google">
      <img src={googleLogo} alt="Google Logo" />
      <p className="text-base font-semibold text-black/50">
        Google 계정으로 로그인
      </p>
    </button>
  );
}
