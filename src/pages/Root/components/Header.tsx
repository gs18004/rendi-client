import logoImg from '~/assets/svg/logo.svg';
import profileImg from '~/assets/svg/profile.svg';
export default function Header() {
  return (
    <div className="flex h-16 w-full items-center justify-between px-8">
      <div className="flex items-center gap-2.5">
        <img src={logoImg} alt="logo" className="h-5 w-5" />
        <p className="">Rendi</p>
      </div>
      <img src={profileImg} alt="profile" className="h-6 w-6" />
    </div>
  );
}
