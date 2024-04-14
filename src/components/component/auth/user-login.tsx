"use client"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CardContent, Card } from "@/components/ui/card"
import { BACKEND_URL, FRONTEND_URL } from "@/utils/constants"
import { useApiSend } from "@/hooks/network/rq"
import { loginUser } from "@/hooks/server/auth/url"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "../home/loader"
import { Package2Icon } from "../../icons/page"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"


const FormSchema = z.object({
  roll: z.string().min(10, { message: 'roll number must be 10 characters' }).max(10, { message: 'roll number must be 10 characters' }).toUpperCase(),
  password: z.string()
})

export function UserLogin() {
  const { toast } = useToast();
  const searchParams = useSearchParams()

  const roll = searchParams.get('roll');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
       roll:roll || ""
       }
})



  const handleOauth = async (event: any) => {
    event.preventDefault();
    window.location.href = `${BACKEND_URL}/auth/callback/google/user`;
  };

  const { mutate, isError, isPending } = useApiSend(
    loginUser,
    (data: any) => {
      console.log(data)
      toast({
        title: "success",
        description: "Login Successful"
      })
      window.location.href = `${FRONTEND_URL}/oauth?token=${data?.access_token}&s_user=${JSON.stringify(data?.user)}`;
    },
    (e: any) => {
      toast({
        variant: "destructive",
        title: "Cannot Login",
        description: e?.message
      })
    },

  );

  const onSubmit = async (data:any) => {
    console.log(data);
    mutate({
     ...data
    });
  }

  if (isPending) {
    return (<div className="h-full w-full flex-col flex items-center gap-5 justify-center">
      <Package2Icon className="h-6 w-6" />
      <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
      <LoadingSpinner />
    </div>)
  }


  return (
    <>
    <Card className="max-w-sm mx-auto">
    <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      <CardContent className="space-y-4">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-8" />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
          <FormField
                    control={form.control}
                    name="roll"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg font-bold'>Roll</FormLabel>
                            <FormControl>
                            <Input {...field} placeholder="Enter your roll" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
          </div>
          <div className="space-y-2">
            
            <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg font-bold'>Password</FormLabel>
                            <FormControl>
                            <Input {...field} type="password" placeholder="Enter your Password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />    
                <div className="flex items-center space-x-2">
              <Link className="text-sm underline" href="#">
                Forgot password
              </Link>
            </div>
                      </div>
          <Button className="w-full" onClick={onSubmit} >Login</Button>
          <Separator className="my-8" />
          <Button onClick={handleOauth} className="w-full" variant="outline">
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <Link className="underline" href="/auth/register">
              Sign up
            </Link>
          </div>
        </div>
      </CardContent>
    </form>
    </Form>
    </Card>
    </>

  )
}
