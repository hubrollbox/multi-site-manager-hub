
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useAuthHandlers } from '@/hooks/useAuthHandlers';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { handleSignIn, handleSignUp } = useAuthHandlers();

  // Redirect if already authenticated
  if (user) {
    navigate('/');
    return null;
  }

  const onSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    await handleSignIn(email, password);
    setIsLoading(false);
  };

  const onSignUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await handleSignUp(name, email, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AuthHeader />

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Bem-vindo</CardTitle>
            <CardDescription>
              Entre na sua conta ou crie uma nova para começar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Registar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <SignInForm onSubmit={onSignIn} isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <SignUpForm onSubmit={onSignUp} isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
