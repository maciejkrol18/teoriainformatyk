"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export default function AuthForms() {
  return (
    <>
      <Tabs defaultValue="login">
        <TabsList className="flex justify-center">
          <TabsTrigger value="login" className="w-full">
            Logowanie
          </TabsTrigger>
          <TabsTrigger value="register" className="w-full">
            Rejestracja
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </>
  );
}
