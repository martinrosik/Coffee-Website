import ReservationComponent from "../../reservation/ReservationComponent";
import Navbar from "../../navbar/Navbar";
import FaqComponent from "@/faq/FaqComponent";
import BannerComponent from "@/banner/BannerComponent";
import Footer from "@/footer/Footer";
import GalleryComponent from "@/gallery/GaleryComponent";
import TeamComponent from "@/team/TeamComponent";

export default function HomePage() {
  return (
    <>
    <Navbar />
    <BannerComponent />
    <ReservationComponent />
    <FaqComponent />
    <TeamComponent />
    <GalleryComponent />
    <Footer />
    </>
  );
}
