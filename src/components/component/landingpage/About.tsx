import pilot from "../assets/pilot.png"
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const About = () => {
  return (
    <section
      id="about"
      className=" py-24 sm:py-32 mt-20"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col md:flex-row gap-8 md:gap-12">
          <Image
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                  Eddrix is a special place 
                <span className="ml-3 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]  text-transparent bg-clip-text">
                  {/* About{" "} */}
                  Just For Students & Startups.
                </span>

              </h2>
              <Card className=" my-4">
                <CardHeader>
                  <CardTitle className="py-3">
                    We&apos;re here to help you grow your skills and reach your goals.
                  </CardTitle>
                  <CardDescription className="text-md mb-5 text-justify ">
                    Our platform is built with students & entrepreneurs like you in mind. We want to connect you with the right people, tools, and mentors to help you along your path.
                    At the end of the day we believe that everyone have the potential and talent to live the life which they dream of.
                    For which one of our attempt as we for the we is <span className="lg:inline block font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl lg:whitespace-break-spaces">The Matrix Of Education & Entrepreneurs</span>.
                    
                  </CardDescription>
                </CardHeader>
                    <Badge className="rounded-sm p-3 font-mono">
                      Think of us as your guides, mentors, and leaders on your journey through the world of AI. We&apos;re here to support you every step of the way. Let&apos;s make your dreams a reality together!
                      </Badge>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
