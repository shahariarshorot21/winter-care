import { Banner } from "@/components/banner";
import { Features } from "@/components/features";
import { Events } from "@/components/events";
import { Subscribe } from "@/components/subscribe";

export default function Home() {
  return (
    <>
      <main>
        <Banner />
        <Features />
        <Events limit={6} showSeeAll={true} />
        <Subscribe />
      </main>
    </>
  );
}