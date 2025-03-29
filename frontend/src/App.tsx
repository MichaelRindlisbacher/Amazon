import { useState } from 'react';
import './App.css';
import BookList from './BookList';
import CategoryFilter from './categoryFilter';
import WelcomeBand from './WelcomeBand';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <>
            <div className="container">
                <div className="row bg-secondary text-white">
                    <WelcomeBand />
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <CategoryFilter
                          selectedCategories = {selectedCategories}
                          setSelectedCategories = {setSelectedCategories}
                        />
                    </div>
                    <div className="col-md-9">
                        <BookList 
                          selectedCategories={selectedCategories} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
