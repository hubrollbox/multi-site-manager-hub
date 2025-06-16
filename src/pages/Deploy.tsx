
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  GitHub, 
  Globe,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Plus,
  Play
} from "lucide-react";
import { useSiteContext } from "@/contexts/SiteContext";

const Deploy = () => {
  const { currentSite } = useSiteContext();

  const deployStatus = {
    lastDeploy: {
      status: "success",
      timestamp: "2024-01-21 14:30",
      commit: "feat: adicionar nova funcionalidade de utilizadores",
      branch: "main",
      duration: "2m 34s",
    },
    currentStatus: "deployed",
    url: "https://principal-com.vercel.app",
    buildLogs: [
      "✓ Building application...",
      "✓ Installing dependencies...", 
      "✓ Running build process...",
      "✓ Optimizing assets...",
      "✓ Deploy completed successfully!",
    ],
  };

  const environmentVariables = [
    { key: "NEXT_PUBLIC_API_URL", value: "https://api.principal.com", isPublic: true },
    { key: "DATABASE_URL", value: "***************", isPublic: false },
    { key: "SUPABASE_URL", value: "https://abc123.supabase.co", isPublic: true },
    { key: "SUPABASE_ANON_KEY", value: "***************", isPublic: false },
    { key: "RESEND_API_KEY", value: "***************", isPublic: false },
  ];

  const deployHistory = [
    {
      id: "1",
      status: "success",
      timestamp: "2024-01-21 14:30",
      commit: "feat: adicionar nova funcionalidade de utilizadores",
      branch: "main",
      duration: "2m 34s",
    },
    {
      id: "2", 
      status: "success",
      timestamp: "2024-01-20 16:15",
      commit: "fix: corrigir bug no formulário de contacto",
      branch: "main",
      duration: "1m 52s",
    },
    {
      id: "3",
      status: "failed",
      timestamp: "2024-01-20 10:45",
      commit: "chore: atualizar dependências",
      branch: "develop",
      duration: "45s",
    },
    {
      id: "4",
      status: "success", 
      timestamp: "2024-01-19 11:20",
      commit: "style: melhorar design da página inicial",
      branch: "main",
      duration: "3m 12s",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'building': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Sucesso';
      case 'failed': return 'Falhado';
      case 'building': return 'A construir';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'default';
      case 'failed': return 'destructive';
      case 'building': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deploy & DevOps</h1>
          <p className="text-gray-600 mt-1">Gestão de deploys do {currentSite.name}</p>
        </div>
        <Button className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          Deploy Agora
        </Button>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Estado Atual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <Badge variant="default">Live</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">URL:</span>
              <a 
                href={deployStatus.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {deployStatus.url}
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Último Deploy:</span>
              <span className="text-sm text-gray-900">
                {new Date(deployStatus.lastDeploy.timestamp).toLocaleString('pt-PT')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Branch:</span>
              <Badge variant="outline">{deployStatus.lastDeploy.branch}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Duração:</span>
              <span className="text-sm text-gray-900">{deployStatus.lastDeploy.duration}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitHub className="h-5 w-5" />
              Último Commit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              {getStatusIcon(deployStatus.lastDeploy.status)}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {deployStatus.lastDeploy.commit}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {deployStatus.lastDeploy.branch} • {deployStatus.lastDeploy.timestamp}
                </p>
              </div>
            </div>
            <div className="pt-3 border-t">
              <Button variant="outline" size="sm" className="w-full">
                Ver no GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Build Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Logs do Último Build
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            {deployStatus.buildLogs.map((log, index) => (
              <div key={index} className="text-green-400 mb-1">
                {log}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environment Variables */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Variáveis de Ambiente
            </CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Variável
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {environmentVariables.map((envVar, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-600">Chave</Label>
                  <p className="font-mono text-sm">{envVar.key}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Valor</Label>
                  <p className="font-mono text-sm">{envVar.value}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={envVar.isPublic ? 'secondary' : 'destructive'}>
                  {envVar.isPublic ? 'Público' : 'Privado'}
                </Badge>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Deploy History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Histórico de Deploys
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {deployHistory.map((deploy) => (
            <div key={deploy.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {getStatusIcon(deploy.status)}
                <Badge variant={getStatusColor(deploy.status)}>
                  {getStatusText(deploy.status)}
                </Badge>
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{deploy.commit}</p>
                <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                  <span>{deploy.branch}</span>
                  <span>{new Date(deploy.timestamp).toLocaleString('pt-PT')}</span>
                  <span>{deploy.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Ver Logs
                </Button>
                {deploy.status === 'failed' && (
                  <Button variant="outline" size="sm">
                    Retentar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Deploy;
