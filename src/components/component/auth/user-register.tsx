"use client"
import Link from "next/link"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BACKEND_URL, FRONTEND_URL } from "@/utils/constants"
import { checkEmail, checkRoll, registerUser } from "@/hooks/server/auth/url"
import { useApiSend } from "@/hooks/network/rq"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Package2Icon } from "../../icons/page"
import { LoadingSpinner } from "../home/loader"
import { Badge } from "../../ui/badge"
import { DropDown } from "../extra/dropdown"

import { departments } from "@/utils/constants"
import { Register } from "@/types/types"

const FormSchema = z.object({
  roll: z.string().min(10, { message: 'must be 10 characters' }).max(10, { message: 'username must be 10 characters' }).toUpperCase().refine(async (value) => {
    return !await checkRoll({ roll: value });
  }, 'username already exists'),
  email: z.string().min(1, { message: 'Email is required' }).email('Invalid email address').refine(async (value) => {
    return !await checkEmail({ email: value });
  }, 'Email already exists'),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords does not match'
});




export function UserRegister() {

  const [department, setdepartment] = useState("");

  const { register, control, handleSubmit, formState } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { errors } = formState;

  const { toast } = useToast()

  const handleOauth = async (event: any) => {
    event.preventDefault();
    window.location.href = `${BACKEND_URL}/auth/callback/google`;
  };

  // useEffect(() => {
  //   console.log(errors)
  // }, [errors])



  const { mutate, isPending } = useApiSend(
    registerUser,
    (data: any) => {
      console.log(data)
      toast({
        title: "success",
        description: "Registration Successful"
      })
      window.location.href = `${FRONTEND_URL}/auth/signin?roll=${data?.roll}`;
    },
    (e: any) => {
      toast({
        variant: "destructive",
        title: "Cannot Register",
        description: e?.message
      })
    },

  );

  const onSubmit = async (data: Register) => {
    const payload = {
      email: data?.email,
      password: data.password,
      roll: data.roll,
      department: department || "NONE"
    } as any
    mutate(payload);
    console.log("submitted data", payload);
  }

  if (isPending) {
    return (<div className="h-full w-full flex-col flex items-center gap-5 justify-center">
      <Package2Icon className="h-6 w-6" />
      <span className="text-xl font-bold tracking-tight  sm:text-xl">MASCCA</span>
      <LoadingSpinner />
    </div>)
  }


  return (
    <div className="py-10 h-screen overflow-scroll">

    <Card className="max-w-sm mx-auto">
      <CardHeader className="space-y-2">
        <div className="space-y-2 text-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?
              <Link className="underline" href="#">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit as any)}>
          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input {...register("roll")} />
            {errors?.roll && <Badge variant="destructive">{errors?.roll?.message}</Badge>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} placeholder="m@example.com" type="email" />
            {errors?.email && <Badge variant="destructive">{errors?.email?.message}</Badge>}
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <DropDown departments={departments} value={department} setValue={(e:any) => setdepartment(e)} />
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input {...register("password")} type="password" />
            {errors?.password && <Badge variant="destructive">{errors?.password?.message}</Badge>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input {...register("confirmPassword")} type="password" />
            {errors?.confirmPassword && <Badge variant="destructive">{errors?.confirmPassword?.message}</Badge>}
          </div>
        <Separator className="h-8 bg-transparent" />
          <Button className="w-full" type="submit">Sign up</Button>
        </form>
        {/* <Button onClick={handleOauth} className="w-full" variant="outline">
          Sign up with Google
        </Button> */}
      </CardContent>
    </Card>
    </div>

  )
}
