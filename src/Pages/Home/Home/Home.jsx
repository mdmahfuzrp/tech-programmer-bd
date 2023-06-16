import Header from "../Header/Header";
import NewOffers from "../NewOffers/NewOffers";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";

const Home = () => {
    return (
        <div>
            <div className="w-11/12 mx-auto mb-10">
                {/* Header Section */}
                <Header></Header>
            </div>
            <PopularClass></PopularClass>
            <NewOffers></NewOffers>
            <PopularInstructor></PopularInstructor>
        </div>
    );
};

export default Home;