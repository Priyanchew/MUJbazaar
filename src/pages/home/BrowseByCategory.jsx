import CategoryBlock from '../../components/CategoryBlock';

import ForRentCategoryBg from '../../assets/images/bicycle.jpg';
import ForSaleCategoryBg from '../../assets/images/books.jpg';
import buds from '../../assets/images/buds.jpg';

function BrowseByCateogry() {
  return (
    <>
      <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">Browse by category</h2>
      <p className="text-gray-600 leading-loose text-center mb-8">
        Explore a wide range of categories tailored to your needs. Whether you're looking to buy, rent, or sell, we’ve got you covered!
      </p>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-3 md:gap-6">
        <CategoryBlock bgImage={ForSaleCategoryBg} categoryName="Buy" to="/category/sale" />
        <CategoryBlock bgImage={ForRentCategoryBg} categoryName="Rent" to="/category/rent" />
        <CategoryBlock bgImage={buds} categoryName="Sell" to="/create-listing" />
      </div>
    </>
  );
}

export default BrowseByCateogry;
