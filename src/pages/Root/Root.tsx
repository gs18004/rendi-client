import AiRendiButton from '~/pages/Root/components/AiRendiButton';
import CheckList from '~/pages/Root/components/CheckList';
import Header from '~/pages/Root/components/Header';
import Top from '~/pages/Root/components/Top';

export default function Root() {
  return (
    <div className="flex w-full flex-col items-center gap-6 px-4 pb-8">
      <Header />
      <Top />
      <div className="flex w-full flex-col items-center gap-6 px-4">
        <CheckList />
        <AiRendiButton />
      </div>
    </div>
  );
}
