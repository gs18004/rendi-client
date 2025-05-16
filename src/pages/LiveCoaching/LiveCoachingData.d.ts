export interface LiveCoachingData {
  scores: {
    user_engagement: number;
    partner_engagement: number;
    user_talk_share: number;
  };
  partner_memory: Record<string, string[]>;
  analysis: {
    user_engagement: number;
    partner_engagement: number;
    user_talk_share: number;
  };
  advice_metadatas: Array<{
    advice_id: string;
    emoji: string;
    title: string;
    description: string;
    prompt_instruction: string;
  }>;
  advice_details: Array<{
    advice_id: string;
    advice: {
      content: Array<{
        title: string;
        description: string;
      }>;
    };
  }>;
  final_report: string;
  deleted_at: string;
  message: {
    message_id: string;
    role: string;
    content: string;
    timestamp: string;
  };
}
