
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectContext } from "@/contexts/ProjectContext";
import { 
  Settings, 
  Database, 
  Cloud, 
  Users, 
  Share2, 
  CreditCard,
  Globe,
  Github,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from "lucide-react";
import { useState } from "react";

const ProjectSettings = () => {
  const { currentProject, updateProject } = useProjectContext();
  const [activeTab, setActiveTab] = useState("general");

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Nenhum projeto selecionado</p>
      </div>
    );
  }

  const handleSocialUpdate = (platform: string, value: string) => {
    updateProject(currentProject.id, {
      socialAccounts: {
        ...currentProject.socialAccounts,
        [platform]: value
      }
    });
  };

  const handleDatabaseUpdate = (field: string, value: any) => {
    updateProject(currentProject.id, {
      database: {
        ...currentProject.database,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações do Projeto</h1>
          <p className="text-gray-600 mt-1">{currentProject.name}</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            currentProject.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
          }`} />
          {currentProject.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="database">Base de Dados</TabsTrigger>
          <TabsTrigger value="storage">Armazenamento</TabsTrigger>
          <TabsTrigger value="social">Redes Sociais</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Informações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Nome do Projeto</Label>
                  <Input
                    id="project-name"
                    value={currentProject.name}
                    onChange={(e) => updateProject(currentProject.id, { name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-type">Tipo</Label>
                  <Input
                    id="project-type"
                    value={currentProject.project_type}
                    disabled
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={currentProject.description || ''}
                  onChange={(e) => updateProject(currentProject.id, { description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="repository">Repositório</Label>
                  <Input
                    id="repository"
                    value={currentProject.repository || ''}
                    onChange={(e) => updateProject(currentProject.id, { repository: e.target.value })}
                    placeholder="https://github.com/user/repo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={currentProject.online_url || currentProject.local_url || ''}
                    onChange={(e) => updateProject(currentProject.id, { 
                      [currentProject.project_type === 'online' ? 'online_url' : 'local_url']: e.target.value 
                    })}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Guardar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Configurações da Base de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Estado da Conexão</h4>
                  <p className="text-sm text-gray-600">
                    {currentProject.database?.connected ? 'Conectado' : 'Desconectado'}
                  </p>
                </div>
                <Switch 
                  checked={currentProject.database?.connected || false}
                  onCheckedChange={(checked) => handleDatabaseUpdate('connected', checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="db-url">URL da Base de Dados</Label>
                  <Input
                    id="db-url"
                    value={currentProject.database?.supabaseUrl || ''}
                    onChange={(e) => handleDatabaseUpdate('supabaseUrl', e.target.value)}
                    placeholder="https://projeto.supabase.co"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-project">ID do Projeto</Label>
                  <Input
                    id="db-project"
                    value={currentProject.database?.supabaseProject || ''}
                    onChange={(e) => handleDatabaseUpdate('supabaseProject', e.target.value)}
                    placeholder="projeto-id"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Número de Tabelas</Label>
                  <div className="p-2 bg-gray-50 rounded">
                    {currentProject.database?.tables || 0} tabelas
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Último Backup</Label>
                  <div className="p-2 bg-gray-50 rounded">
                    {currentProject.database?.lastBackup ? 
                      new Date(currentProject.database.lastBackup).toLocaleDateString('pt-PT') : 
                      'Nunca'
                    }
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">Fazer Backup</Button>
                <Button>Testar Conexão</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Armazenamento na Cloud
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bucket-id">ID do Bucket</Label>
                  <Input
                    id="bucket-id"
                    value={currentProject.storage_bucket_id || ''}
                    onChange={(e) => updateProject(currentProject.id, { storage_bucket_id: e.target.value })}
                    placeholder="nome-do-bucket"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storage-url">URL de Armazenamento</Label>
                  <Input
                    id="storage-url"
                    value={currentProject.storage_url || ''}
                    onChange={(e) => updateProject(currentProject.id, { storage_url: e.target.value })}
                    placeholder="https://storage.exemplo.com"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Configuração Automática</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Configure automaticamente o armazenamento com o Supabase Storage.
                </p>
                <Button variant="outline" className="mt-2">
                  Configurar Automaticamente
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Redes Sociais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    value={currentProject.socialAccounts?.facebook || ''}
                    onChange={(e) => handleSocialUpdate('facebook', e.target.value)}
                    placeholder="@nomeDaPagina"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-pink-600" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={currentProject.socialAccounts?.instagram || ''}
                    onChange={(e) => handleSocialUpdate('instagram', e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-blue-400" />
                    Twitter/X
                  </Label>
                  <Input
                    id="twitter"
                    value={currentProject.socialAccounts?.twitter || ''}
                    onChange={(e) => handleSocialUpdate('twitter', e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-700" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={currentProject.socialAccounts?.linkedin || ''}
                    onChange={(e) => handleSocialUpdate('linkedin', e.target.value)}
                    placeholder="company/nome-da-empresa"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Integrações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Stripe</h4>
                      <p className="text-sm text-gray-600">Pagamentos online</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Configurar Stripe
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                      <Cloud className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Google Cloud</h4>
                      <p className="text-sm text-gray-600">Serviços na nuvem</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Configurar Google Cloud
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                      <Github className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub</h4>
                      <p className="text-sm text-gray-600">Repositório de código</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Conectar GitHub
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                      <Globe className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Vercel</h4>
                      <p className="text-sm text-gray-600">Deploy e hosting</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Configurar Vercel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectSettings;
