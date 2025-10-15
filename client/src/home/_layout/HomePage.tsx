import ReservationComponent from "../../reservation/ReservationComponent";
import Navbar from "../../navbar/Navbar";
import FaqComponent from "@/faq/FaqComponent";
import BannerComponent from "@/banner/BannerComponent";
import Footer from "@/footer/Footer";

export default function HomePage() {
  return (
    <>
    <Navbar />
    <BannerComponent />
    <ReservationComponent />
    <FaqComponent />
    <Footer />
    </>
  );
}
