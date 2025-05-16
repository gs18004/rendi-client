import wallpaper from '~/assets/img/wallpaper.png';
import bottomExitImg from '~/assets/svg/bottom-exit.svg';
import bottomChatImg from '~/assets/svg/bottom-chat.svg';
import { useDateTime } from '~/components/hooks/useDateTime';
import Alert from '~/pages/LiveCoaching/components/Alert';
import chatImg from '~/assets/img/chat.png';
import { useState, useEffect, useRef } from 'react';
import Review from '~/pages/LiveCoaching/components/Review';
import ChatCoaching from '~/pages/ChatCoaching/ChatCoaching';
import { LiveCoachingData } from '~/pages/LiveCoaching/LiveCoachingData';

const WS_URL = 'wss://api.rendi.online/ws/speech';
const SAMPLE_RATE = 16000;
const FRAME_MS = 20;
const FRAME_SAMPLES = (SAMPLE_RATE * FRAME_MS) / 1000;

export default function LiveCoaching() {
  const dateTime = useDateTime();
  const [showChatCoaching, setShowChatCoaching] = useState(false);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('');
  const [data, setData] = useState<LiveCoachingData | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      // WebSocket 연결
      wsRef.current = new WebSocket(WS_URL);
      wsRef.current.binaryType = 'arraybuffer';

      wsRef.current.onopen = () => {
        setConnectionStatus('🟢 Connected');
        setIsRecording(true);
      };

      wsRef.current.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        console.log('Received message:', msg);
        setData(msg);
      };

      wsRef.current.onerror = () => setConnectionStatus('❌ WebSocket Error');
      wsRef.current.onclose = () => {
        setConnectionStatus('🚫 Disconnected');
        setIsRecording(false);
      };

      // 마이크 권한 요청
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // AudioContext 설정
      audioCtxRef.current = new AudioContext({ sampleRate: SAMPLE_RATE });

      // AudioWorklet 설정
      const workletUrl = URL.createObjectURL(
        new Blob(
          [
            `
            class PCMProcessor extends AudioWorkletProcessor {
              constructor() {
                super();
                this.buf = [];
              }
              process(inputs) {
                const in0 = inputs[0][0];
                if (!in0) return true;
                this.buf.push(...in0);
                while (this.buf.length >= ${FRAME_SAMPLES}) {
                  this.port.postMessage(this.buf.splice(0, ${FRAME_SAMPLES}));
                }
                return true;
              }
            }
            registerProcessor('pcm-processor', PCMProcessor);
            `,
          ],
          { type: 'application/javascript' },
        ),
      );

      await audioCtxRef.current.audioWorklet.addModule(workletUrl);

      // WorkletNode 설정
      workletNodeRef.current = new AudioWorkletNode(
        audioCtxRef.current,
        'pcm-processor',
      );
      workletNodeRef.current.port.onmessage = (e) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const float32 = e.data;
          const pcm16 = new Int16Array(float32.length);
          for (let i = 0; i < float32.length; i++) {
            const s = Math.max(-1, Math.min(1, float32[i]));
            pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
          }
          wsRef.current.send(pcm16.buffer);
        }
      };

      // 오디오 라우팅
      const src = audioCtxRef.current.createMediaStreamSource(
        streamRef.current,
      );
      src
        .connect(workletNodeRef.current)
        .connect(audioCtxRef.current.destination);
    } catch (error) {
      console.error('Error starting recording:', error);
      setConnectionStatus('❌ 마이크 권한 거부');
    }
  };

  const stopRecording = () => {
    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }

    setIsRecording(false);
    setConnectionStatus('🚫 Disconnected');
  };

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const toggleAlert = (index: string) => {
    if (activeAlert === index) {
      setActiveAlert(null);
    } else {
      setActiveAlert(index);
    }
  };
  return (
    <>
      {showChatCoaching ? (
        <ChatCoaching
          onClose={() => setShowChatCoaching(false)}
          partnerMemory={{ content: data?.partner_memory.content ?? {} }}
        />
      ) : (
        <div className="relative flex h-dvh w-full flex-col items-center">
          <img
            src={wallpaper}
            alt="wallpaper"
            className="wallpaper h-full w-full object-cover"
          />
          <div className="absolute top-[70px] flex flex-col items-center justify-center gap-2">
            <p className="text-xl font-medium text-white">{dateTime.date}</p>
            <p className="text-[80px] font-bold text-white">{dateTime.time}</p>
          </div>
          <div className="absolute top-[200px] flex">
            <div className="flex w-[100px] flex-col items-center gap-3">
              <p className="text-[10px] font-medium leading-tight text-white">
                상대방의 호감도
              </p>
              <div className="h-[21px] w-[87px] overflow-hidden rounded-[6px] border-[1px] border-solid border-white bg-white/50">
                <div
                  className="h-full bg-gradient-to-r from-[#FFF2A4] to-[#2BCC9C]"
                  style={{
                    width: `${(data?.scores.partner_engagement ?? 0) * 25}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex w-[100px] flex-col items-center gap-3">
              <p className="text-[10px] font-medium leading-tight text-white">
                나의 표현 점수
              </p>
              <div className="h-[21px] w-[87px] overflow-hidden rounded-[6px] border-[1px] border-solid border-white bg-white/50">
                <div
                  className="h-full bg-gradient-to-r from-[#FFF2A4] to-[#FF8686]"
                  style={{
                    width: `${(data?.scores.user_engagement ?? 0) * 25}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex w-[100px] flex-col items-center gap-1">
              <p className="text-[10px] font-medium leading-tight text-white">
                대화 비율
              </p>
              <p className="text-2xl font-bold leading-tight text-white">
                {data?.scores.user_talk_share === undefined
                  ? '- : -'
                  : `${Math.round(data?.scores.user_talk_share * 10)} : ${
                      10 - Math.round(data?.scores.user_talk_share * 10)
                    }`}
              </p>
              <div className="flex items-center gap-6">
                <p className="text-[6px] font-medium text-white">나</p>
                <p className="text-[6px] font-medium text-white">상대</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-11 flex w-full items-center justify-between px-10">
            <button>
              <img
                src={bottomExitImg}
                alt="exit"
                onClick={() => {
                  stopRecording();
                  setShowReview(true);
                }}
              />
            </button>
            <div className="flex flex-col items-center gap-2">
              <button
                className={`rounded-full px-6 py-2 text-white ${
                  isRecording ? 'bg-red-500' : 'bg-blue-500'
                }`}
                onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? '녹음 중지' : '녹음 시작'}
              </button>
              {connectionStatus && (
                <p className="text-sm text-white">{connectionStatus}</p>
              )}
            </div>
            <button>
              <img
                src={bottomChatImg}
                alt="chat"
                onClick={() => setShowChatCoaching(true)}
              />
            </button>
          </div>
          <div className="absolute bottom-[118px] flex w-full flex-col gap-[7px] px-4">
            {data?.advice_metadatas.map((metadata) => (
              <Alert
                key={metadata.advice_id}
                title={metadata.emoji + ' ' + metadata.title}
                description={metadata.description}
                image={chatImg}
                onClick={() => toggleAlert(metadata.advice_id)}
                disabled={
                  activeAlert !== metadata.advice_id && activeAlert !== null
                }
                details={
                  activeAlert === metadata.advice_id
                    ? data?.advice_details.find(
                        (detail) => detail.advice_id === metadata.advice_id,
                      )?.advice.content
                    : undefined
                }
              />
            ))}
          </div>
          {showReview ? (
            <Review
              onClose={() => setShowReview(false)}
              review={data?.final_report ?? ''}
            />
          ) : null}
        </div>
      )}
    </>
  );
}
