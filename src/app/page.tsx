import MovingNavbar        from "@/components/moving/Navbar";
import MovingHero          from "@/components/moving/Hero";
import MovingGoogleReviews from "@/components/moving/GoogleReviews";
import MovingServices      from "@/components/moving/Services";
import MovingGallery       from "@/components/moving/Gallery";
import MovingTestimonials  from "@/components/moving/Testimonials";
import MovingWhyUs         from "@/components/moving/WhyUs";
import MovingContact       from "@/components/moving/Contact";
import MovingFooter        from "@/components/moving/Footer";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden" style={{ background: "#070E18" }}>
      <MovingNavbar />
      <MovingHero />
      <MovingGoogleReviews />
      <MovingServices />
      <MovingGallery />
      <MovingTestimonials />
      <MovingWhyUs />
      <MovingContact />
      <MovingFooter />
    </main>
  );
}
