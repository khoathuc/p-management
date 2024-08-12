import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";
import Header from "@/components/header";
import BodyContainer from "@/components/body-container";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header />
      <BodyContainer>
        <div className="grid grid-cols-2 mx-auto items-end mb-28">
          <div className="">
            <p className="text-[92px] leading-[87px] font-semibold tracking-tight">
              Write. Plan. Organize.
            </p>
            <p className="text-2xl leading-[30px] mt-6">
              With a little help from AI.
            </p>
            <div className="w-fit grid grid-cols-2 mt-8">
              <LoginButton>
                <Button variant={"secondary"} size={"lg"}>
                  Get Notion free
                </Button>
              </LoginButton>
              <Button variant={"secondary-reverse"} size={"lg"}>
                Request a demo
              </Button>
            </div>
          </div>
          <img
            src="https://www.notion.so/cdn-cgi/image/format=webp,width=1920/front-static/pages/product/super-duper/hero-illo.png"
            alt=""
          />
        </div>

        <section>
          <img
            src="https://www.notion.so/front-static/pages/product/super-duper/notion-hero-v3.png"
            alt=""
            className="border shadow-xl rounded-xl"
          />
        </section>
      </BodyContainer>
    </main>
  );
}
