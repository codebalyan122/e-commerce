import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { productsData } from "src/Data/productsData";
import ProductsSlider from "../../Shared/MidComponents/ProductsSlider/ProductsSlider";
import SectionTitle from "../../Shared/MiniComponents/SectionTitle/SectionTitle";
import EventCounter from "./EventCounter";
import s from "./TodaySection.module.scss";

const TodaySection = () => {
  const { t } = useTranslation();

  const filterFlashSalesProducts = () =>
    productsData.filter((productData) => productData.sold > 100);

  return (
    <section className={s.todaysSection} id="todays-section">
      <div className={s.wrapper}>
        <SectionTitle eventName="Today's" sectionName={t("flashSales")} />
        <EventCounter eventName="flash-sales" timeEvent="3 23 19 56" />
      </div>

      <ProductsSlider filterFun={filterFlashSalesProducts} />

      <Link to="/products" className={s.viewProductsBtn}>
        View All Products
      </Link>
    </section>
  );
};
export default TodaySection;
