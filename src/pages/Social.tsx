
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Share, 
  Calendar,
  TrendingUp,
  Clock,
  Plus,
  Edit
} from "lucide-react";
import { useSiteContext } from "@/contexts/SiteContext";

const Social = () => {
  const { currentSite } = useSiteContext();

  const socialStats = [
    {
      title: "Posts Publicados",
      value: "156",
      change: "+12%",
      icon: Share,
      color: "text-blue-600",
    },
    {
      title: "Posts Agendados",
      value: "23",
      change: "+5%",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Engagement Rate",
      value: "8.4%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Alcance Médio",
      value: "2.1K",
      change: "+15%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const scheduledPosts = [
    {
      id: "1",
      content: "🚀 Lançamento da nova funcionalidade! Descubra como pode melhorar a sua produtividade...",
      platforms: ["Facebook", "Instagram", "Twitter"],
      scheduledFor: "2024-01-22 14:00",
      status: "scheduled",
    },
    {
      id: "2",
      content: "📈 Dicas de marketing digital para pequenas empresas. Thread completa no nosso blog!",
      platforms: ["Twitter", "LinkedIn"],
      scheduledFor: "2024-01-22 16:30",
      status: "scheduled",
    },
    {
      id: "3",
      content: "🌟 Cliente satisfeito = negócio próspero! Veja alguns dos nossos cases de sucesso.",
      platforms: ["Facebook", "Instagram"],
      scheduledFor: "2024-01-23 10:00",
      status: "draft",
    },
    {
      id: "4",
      content: "💡 Webinar gratuito na próxima semana! Inscreva-se já e aprenda com os especialistas.",
      platforms: ["Facebook", "Twitter", "LinkedIn"],
      scheduledFor: "2024-01-24 09:00",
      status: "scheduled",
    },
  ];

  const recentPosts = [
    {
      id: "1",
      content: "✨ Obrigado a todos os que participaram no nosso evento! Foi incrível!",
      platform: "Instagram",
      publishedAt: "2024-01-20 15:30",
      likes: 45,
      comments: 12,
      shares: 8,
    },
    {
      id: "2",
      content: "📊 Relatório mensal: crescimento de 25% nas vendas online!",
      platform: "Facebook",
      publishedAt: "2024-01-19 11:00",
      likes: 23,
      comments: 5,
      shares: 15,
    },
    {
      id: "3",
      content: "🎯 5 estratégias essenciais para aumentar o engagement nas redes sociais",
      platform: "Twitter",
      publishedAt: "2024-01-18 14:15",
      likes: 67,
      comments: 34,
      shares: 28,
    },
  ];

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return 'bg-blue-500';
      case 'instagram': return 'bg-pink-500';
      case 'twitter': return 'bg-sky-500';
      case 'linkedin': return 'bg-blue-700';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Redes Sociais</h1>
          <p className="text-gray-600 mt-1">Gerir redes sociais do {currentSite.name}</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {socialStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} este mês
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Post Creator */}
      <Card>
        <CardHeader>
          <CardTitle>Criar Post Rápido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="O que pretende partilhar hoje?"
            className="min-h-[100px]"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Publicar em:</span>
              <div className="flex gap-2">
                {['Facebook', 'Instagram', 'Twitter'].map((platform) => (
                  <Badge key={platform} variant="outline" className="cursor-pointer hover:bg-gray-100">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar
              </Button>
              <Button>
                Publicar Agora
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Posts Agendados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <p className="text-sm text-gray-900 flex-1">{post.content}</p>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  {post.platforms.map((platform) => (
                    <div 
                      key={platform}
                      className={`px-2 py-1 rounded text-xs text-white ${getPlatformColor(platform)}`}
                    >
                      {platform}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    📅 {new Date(post.scheduledFor).toLocaleString('pt-PT')}
                  </span>
                  <Badge variant={post.status === 'scheduled' ? 'default' : 'secondary'}>
                    {post.status === 'scheduled' ? 'Agendado' : 'Rascunho'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Posts Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <p className="text-sm text-gray-900 flex-1">{post.content}</p>
                  <div className={`px-2 py-1 rounded text-xs text-white ${getPlatformColor(post.platform)}`}>
                    {post.platform}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>📅 {new Date(post.publishedAt).toLocaleString('pt-PT')}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{post.likes}</div>
                    <div className="text-gray-600">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{post.comments}</div>
                    <div className="text-gray-600">Comentários</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{post.shares}</div>
                    <div className="text-gray-600">Partilhas</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Social;
