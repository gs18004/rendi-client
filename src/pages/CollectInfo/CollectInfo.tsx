import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/path';
import CollectMyInfo from '~/pages/CollectInfo/components/CollectMyInfo';
import CollectPartnerInfo from '~/pages/CollectInfo/components/CollectPartnerInfo';
import PartnerInfoStart from '~/pages/CollectInfo/components/PartnerInfoStart';

export default function CollectInfo() {
  const navigate = useNavigate();
  const [step, setStep] = useState<
    'my_info' | 'partner_info_start' | 'partner_info'
  >('my_info');

  return (
    <div>
      {step === 'my_info' ? (
        <CollectMyInfo onComplete={() => setStep('partner_info_start')} />
      ) : null}
      {step === 'partner_info_start' ? (
        <PartnerInfoStart onComplete={() => setStep('partner_info')} />
      ) : null}
      {step === 'partner_info' ? (
        <CollectPartnerInfo
          onComplete={() => navigate(PATH.COLLECT_INFO_COMPLETE)}
        />
      ) : null}
    </div>
  );
}
