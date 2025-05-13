import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/path';
import { http } from '~/utils/axios';
import { tokenStorage } from '~/utils/token';

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          throw new Error('인증 코드가 없습니다.');
        }

        // 백엔드에 인증 코드 전송
        const response = await http.get(`/auth/google/callback?code=${code}`);
        const { access_token: accessToken, refresh_token: refreshToken } =
          response.data;

        // 토큰 저장
        tokenStorage.setAccessToken(accessToken);
        tokenStorage.setRefreshToken(refreshToken);
      } catch (error) {
        console.error('구글 로그인 콜백 에러:', error);
        navigate(PATH.LOGIN);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <p>로그인 처리 중...</p>
    </div>
  );
}
