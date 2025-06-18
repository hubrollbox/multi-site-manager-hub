
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Hash, ExternalLink } from "lucide-react";

interface TrendingTopic {
  hashtag: string;
  posts: string;
  growth: string;
  platform: 'twitter' | 'instagram' | 'linkedin';
}

const TrendingTopics = () => {
  // Mock data for trending topics - in a real app this would come from APIs
  const trendingTopics: TrendingTopic[] = [
    // Twitter trends
    { hashtag: "#TechInnovation", posts: "125K", growth: "+45%", platform: "twitter" },
    { hashtag: "#AIRevolution", posts: "89K", growth: "+32%", platform: "twitter" },
    { hashtag: "#DigitalMarketing", posts: "67K", growth: "+28%", platform: "twitter" },
    
    // Instagram trends
    { hashtag: "#ContentCreator", posts: "234K", growth: "+56%", platform: "instagram" },
    { hashtag: "#BusinessTips", posts: "156K", growth: "+41%", platform: "instagram" },
    { hashtag: "#Entrepreneurship", posts: "98K", growth: "+35%", platform: "instagram" },
    
    // LinkedIn trends
    { hashtag: "#Leadership", posts: "76K", growth: "+29%", platform: "linkedin" },
    { hashtag: "#RemoteWork", posts: "54K", growth: "+22%", platform: "linkedin" },
    { hashtag: "#CareerGrowth", posts: "43K", growth: "+18%", platform: "linkedin" },
  ];

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'bg-sky-500';
      case 'instagram': return 'bg-pink-500';
      case 'linkedin': return 'bg-blue-700';
      default: return 'bg-gray-500';
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'X (Twitter)';
      case 'instagram': return 'Instagram';
      case 'linkedin': return 'LinkedIn';
      default: return platform;
    }
  };

  const groupedTopics = trendingTopics.reduce((acc, topic) => {
    if (!acc[topic.platform]) {
      acc[topic.platform] = [];
    }
    acc[topic.platform].push(topic);
    return acc;
  }, {} as Record<string, TrendingTopic[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trending Topics da Semana
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedTopics).map(([platform, topics]) => (
          <div key={platform} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getPlatformColor(platform)}`} />
              <h4 className="font-medium text-sm text-gray-700">
                {getPlatformName(platform)}
              </h4>
            </div>
            
            <div className="space-y-2">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 flex-1">
                    <Hash className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{topic.hashtag}</p>
                      <p className="text-xs text-gray-500">{topic.posts} posts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {topic.growth}
                    </Badge>
                    <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="pt-3 border-t">
          <p className="text-xs text-gray-500 text-center">
            Dados atualizados há 2 horas • Próxima atualização em 6 horas
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
