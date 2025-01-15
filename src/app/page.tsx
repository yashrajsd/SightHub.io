import { RainbowButton } from "@/components/ui/rainbow-button";
import { Book } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home">
      <div className="min-h-screen">
        <div className="flex font-aeonik sticky top-0 z-20  bg-[#F0F5F5]  justify-between mt-4 lg:mx-[10%] items-center border-[1px] rounded-lg p-5">
          <span>SightHub</span>
          <span>
            <Link href={'/dashboard/user'}>
            <button className="text-white bg-[#292929] p-2 px-4 rounded-lg">
              Get Started
            </button>
            </Link>
          </span>
        </div>

        <div className="px-[10%] my-[2rem]">
          {/* <HyperText className="font-aeonik text-[4rem] text-left cursor-pointer m-0">
            SightHub
          </HyperText> */}
          <p className="font-aeonik text-[2rem]">
            Empowering businesses<br/>to transform raw data into actionable
            intelligence.
          </p>
          <div className="flex font-aeonik gap-2 items-center mt-[1rem]">
            <RainbowButton className="text-[0.9rem]">Get started</RainbowButton>
            <button className="rounded-xl h-fit border-[1px] flex items-center gap-2 text-[0.9rem] text-black p-3">
              <Book size={19} /> Documents
            </button>
          </div>
        </div>

        {/* Video Section */}
        <section className="w-full flex relative overflow-hidden flex-col items-center justify-center">
          <video
            className="video-player border-[1px] relative z-[10] rounded-md"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "80%", height: "auto" }}
          >
            <source src="/videos/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
      </div>
    </div>
  );
}
