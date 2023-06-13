import Header from "../Header/Header";
import NewOffers from "../NewOffers/NewOffers";

const Home = () => {
    return (
        <div>
            <div className="w-11/12 mx-auto">
                {/* Header Section */}
                <Header></Header>
            </div>
            <NewOffers></NewOffers>
        </div>
    );
};

export default Home;