import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const PricingCard = ({ title, description, price, features,link,index }:any) => {
  return (
    <Card className={"p-5 flex flex-col "+(index==1?"  border-2 border-orange-400":"p-5")}>
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      <p className="font-light text-gray-500 sm:text-md dark:text-gray-400">{description}</p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-4xl font-extrabold">{price}</span>
       {index==0 ?
       <span className="text-gray-500 dark:text-gray-400">/Test</span>
       :
       <span className="text-gray-500 dark:text-gray-400">/Month</span>
      }
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature:string, index:number) => (
          <li key={index} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
       className="">
        <Link
         href={link}
        >
        Get started
        </Link>
      </Button>
    </Card>
  );
};

const PricingSection = () => {
  const pricingOptions = [
    {
      title: "Individual",
      description: "Best for Students , teachers , recruiters for personal use.",
      price: "$1",
      features: [
        "Per Test",
        "Individual configuration",
        "No setup, or hidden fees",
        "Test size: 50 users",
      ],
      link:""
    },
    {
      title: "Team",
      description: "Best for startups & small organizations - Relevant for multiple users, extended & premium support.",
      price: "$50",
      features: [
        "Per Account",
        "Team configuration",
        "No setup, or hidden fees",
        "Test size: 200 users",
        "$1 for every extra user",
      ],
      link:""
    },
    {
      title: "Enterprise",
      description: "Best for universities and large organizations",
      price: "$200",
      features: [
        "Per Account",
        "No setup, or hidden fees",
        "Custom Plan",
        "Premium support: 36 months",
      ],
      link:""
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Designed for individuals, business & teams like yours</h2>
          <p className="mb-5 font-light text-gray-500 sm:text-md dark:text-gray-400">
            Here at MASCAA we focus on unlocking long-term value and strive to enhance customer experience.</p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {pricingOptions.map((option, index) => (
            <PricingCard key={index} {...option} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
