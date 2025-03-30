import { useState } from "react";
import BookList from "../components/BookList"
import CategoryFilter from "../components/categoryFilter"
import WelcomeBand from "../components/WelcomeBand"
import CartSummary from "../components/CartSummary";

function BooksMainPage () {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    return(
    <>
                <div className="container">
                    <CartSummary />
                    <WelcomeBand />
                <div className="row">
                    <div className="col-md-3">
                        <CategoryFilter
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                    </div>
                    <div className="col-md-9">
                        <BookList selectedCategories={selectedCategories} />
                    </div>
                </div>
            </div>
    </>
    );
}

export default BooksMainPage