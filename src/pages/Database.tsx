
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Database as DatabaseIcon,
  Plus,
  Settings,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useState } from "react";

const Database = () => {
  const { currentProject, updateProject } = useProjectContext();
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Nenhum projeto selecionado</p>
      </div>
    );
  }

  // Initialize database object if it doesn't exist
  const database = currentProject.database || {
    connected: false,
    tables: 0
  };

  const mockTables = [
    {
      name: "users",
      rows: 1250,
      size: "2.3 MB",
      lastModified: "2024-01-20 14:30",
    },
    {
      name: "posts",
      rows: 340,
      size: "1.8 MB", 
      lastModified: "2024-01-20 12:15",
    },
    {
      name: "comments",
      rows: 2890,
      size: "5.1 MB",
      lastModified: "2024-01-20 16:45",
    },
    {
      name: "categories",
      rows: 25,
      size: "12 KB",
      lastModified: "2024-01-18 09:20",
    },
  ];

  const handleConnectDatabase = () => {
    if (!supabaseUrl && !database.connected) {
      alert("Por favor, insira a URL do Supabase");
      return;
    }
    
    // Simular conexão à base de dados
    updateProject(currentProject.id, {
      database: {
        ...database,
        connected: true,
        supabaseUrl: supabaseUrl || database.supabaseUrl || 'https://new123.supabase.co',
        supabaseProject: `${currentProject.name.toLowerCase().replace(/\s/g, '-')}-db`,
        tables: 4,
        lastBackup: new Date().toISOString().split('T')[0],
      }
    });
    
    alert("Base de dados conectada com sucesso!");
  };

  const handleCreateNewSupabaseProject = () => {
    window.open('https://supabase.com/dashboard/new', '_blank');
  };

  const handleSync = () => {
    alert("Sincronização com Supabase será implementada");
  };

  const handleBackup = () => {
    alert("Backup da base de dados iniciado");
  };

  const handleOpenSupabase = () => {
    if (database.supabaseUrl) {
      window.open(database.supabaseUrl, '_blank');
    } else {
      alert("URL do Supabase não configurada");
    }
  };

  const handleCreateTable = () => {
    alert("Criador de tabelas será implementado");
  };

  const handleViewTableData = (tableName: string) => {
    alert(`Ver dados da tabela: ${tableName}`);
  };

  const handleTableSettings = (tableName: string) => {
    alert(`Configurações da tabela: ${tableName}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Base de Dados</h1>
          <p className="text-gray-600 mt-1">Base de dados do {currentProject.name}</p>
        </div>
        {database.connected ? (
          <Button onClick={handleCreateTable} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Tabela
          </Button>
        ) : (
          <Button onClick={handleConnectDatabase} className="flex items-center gap-2">
            <DatabaseIcon className="h-4 w-4" />
            Conectar Supabase
          </Button>
        )}
      </div>

      {/* Database Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Estado da Conexão
            </CardTitle>
            {database.connected ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant={database.connected ? 'default' : 'destructive'}>
                {database.connected ? 'Conectado' : 'Desconectado'}
              </Badge>
            </div>
            {database.supabaseProject && (
              <p className="text-sm text-gray-600 mt-2">
                Projeto: {database.supabaseProject}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Número de Tabelas
            </CardTitle>
            <DatabaseIcon className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{database.tables || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Último Backup
            </CardTitle>
            <Download className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {database.lastBackup 
                ? new Date(database.lastBackup).toLocaleDateString('pt-PT')
                : 'Nunca'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {!database.connected ? (
        /* Database Connection Setup */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DatabaseIcon className="h-5 w-5" />
              Configurar Base de Dados Supabase
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supabaseUrl">URL do Supabase</Label>
                <Input 
                  id="supabaseUrl"
                  placeholder="https://abc123.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supabaseKey">Chave Anónima</Label>
                <Input 
                  id="supabaseKey"
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleConnectDatabase}>
                Conectar Base de Dados
              </Button>
              <Button onClick={handleCreateNewSupabaseProject} variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Criar Novo Projeto Supabase
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Database Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Gestão da Base de Dados
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button onClick={handleSync} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sincronizar
                  </Button>
                  <Button onClick={handleBackup} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Backup
                  </Button>
                  <Button onClick={handleOpenSupabase} variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir Supabase
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">URL do Projeto</Label>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                      {database.supabaseUrl}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Nome do Projeto</Label>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                      {database.supabaseProject}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tables List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <DatabaseIcon className="h-5 w-5" />
                  Tabelas da Base de Dados
                </CardTitle>
                <Button onClick={handleCreateTable} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Tabela
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTables.map((table, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <DatabaseIcon className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{table.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{table.rows.toLocaleString()} linhas</span>
                          <span>{table.size}</span>
                          <span>Modificado: {new Date(table.lastModified).toLocaleString('pt-PT')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => handleViewTableData(table.name)} variant="outline" size="sm">
                        Ver Dados
                      </Button>
                      <Button onClick={() => handleTableSettings(table.name)} variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Database;
