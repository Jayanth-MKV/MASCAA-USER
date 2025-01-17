import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { ReactNode } from "react"
import { LogoutPopUp } from "../auth/logout-alert"
import { cookies } from "next/headers"
import { BellIcon, Package2Icon } from "../../icons/page"
import { DrawerDemo } from "./mobile-nav"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "./Navbar"
import { ModeToggle } from "@/components/theme/ModeToggle"

export function HomePage({ children }: { children: ReactNode }) {
  const cuser:any = cookies().get('s_user') || "{value:'{}'}";
  const user = JSON.parse(cuser["value"]);
  // console.log(cookie)
  console.log(user)


  return (
    <div className="grid min-h-screen sm:max-h-screen md:overflow-hidden  w-full min-w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden overflow-hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[100px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <Package2Icon className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl">MASCCA</span>
            </Link>
            <div className="ml-auto h-8 w-8" >
              <ModeToggle  />
              <span className="sr-only">Toggle notifications</span>
            </div>
          </div>
          <Navbar />
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Link id="tour-step-upgrade" href="/pricing">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          <div className="p-5 flex justify-between border-gray border-t-2 border-solid">


            {user && user["profile"] ? <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src={user["profile"]}
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            /> :
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            }

            <h1 className="font-bold ">
              <span className="font-semibold font-mono">
                {user && user.name && 
                <>
                {user["name"]}
                </>
                }
              </span>
            </h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                  id="profile"
                  size="icon"
                  variant="ghost"
                >
                  <DotsHorizontalIcon />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutPopUp />
              </DropdownMenuContent>
            </DropdownMenu>

          </div>

        </div>
      </div>
      <div className="flex flex-col overflow-auto">
        <header className="flex h-20 lg:h-[100px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="/home">

            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1 h-full ">
            <h1 className=" mt-7 md:hidden block text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">MASCAA</h1>
            <h1 className="mt-9  hidden md:block text-end text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">Member Dashboard</h1>
          </div>
          <DrawerDemo>
          <div className="p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Link href="/user/pricing">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
            <div className="mt-auto p-5 flex justify-between border-gray border-t-2 border-solid">


              {user && user["profile"] ? <img
                alt="Avatar"
                className="rounded-full"
                height="32"
                src={user["profile"]}
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              /> :
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              }

              <h1 className="font-bold pl-5">
                <span className="font-semibold font-mono">
                  {user["name"]}
                </span>
              </h1>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                    id="profile"
                    size="icon"
                    variant="ghost"
                  >
                    <DotsHorizontalIcon />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuLabel >My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <LogoutPopUp />
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          </DrawerDemo>

        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 ">
          <div className="border break-words whitespace-pre-wrap scrollbar-hide shadow-sm rounded-lg overflow-y-scroll h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] pb-5 ">
            {children}
          </div>
        </main>
      </div>
    </div >
  )
}

