import React from 'react';
import { fetchCities } from '../../services/weatherService';
import PlusCircle from '../icons/PlusCircle';
import Loading from '../utility/Loading';
import close from '../../assets/xClose.svg';
import ResultItem from './ResultItem';

interface LocationSearchProps {
    trackedCities: any[];
    setTrackedCities: React.Dispatch<React.SetStateAction<any[]>>;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ trackedCities, setTrackedCities }) => {
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [loadingResults, setLoadingResults] = React.useState<boolean>(false);
    const [searchResults, setSearchResults] = React.useState<any>([]);
    const [showResults, setShowResults] = React.useState<boolean>(false);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingResults(true);
        const results = await fetchCities(searchTerm) ?? [];
        setSearchResults(results);
        setShowResults(true);
        setLoadingResults(false);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setShowResults(false);
    };

    return (
        <div className="flex items-center gap-2 relative z-[10]">
            <form onSubmit={handleSearch} className='flex items-center gap-2 relative'>
                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder={"Search locations"}
                        className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-primary text-white placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type='button' className="absolute top-1/2 -translate-y-1/2 right-2" onClick={handleClearSearch}>
                        <img src={close} alt="clear search" className='w-4' />
                    </button>
                </div>

                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-fit hover:bg-primary
            text-white py-2 px-6 rounded bg-primary/[0.8] whitespace-nowrap min-w-[100px]"
                    disabled={loadingResults || searchTerm.length === 0}
                >
                    {loadingResults ? (
                        <Loading />
                    ) : (
                        <>
                            <span>Search</span>
                        </>
                    )}

                </button>
            </form>

            {showResults && (
                <div className="absolute left-0 -bottom-2 translate-y-full w-full px-2 pt-12 pb-8 bg-gray-300 rounded-lg min-h-[200px]">
                    <button className="absolute top-2 right-2" onClick={() => setShowResults(false)}>
                        <img src={close} alt="cancel search" className="" />
                    </button>
                    {searchResults.length >= 1 ? (
                        <>
                            <div className="flex flex-col gap-1">
                                {searchResults?.map((city: any) => (
                                    <ResultItem
                                        key={city.id}
                                        city={city}
                                        trackedCities={trackedCities}
                                        setTrackedCities={setTrackedCities}
                                        setShowResults={setShowResults}
                                    />
                                ))}
                            </div>
                            <div className="absolute top-2 left-4">{searchResults.length} results</div>
                        </>

                    ) : (
                        <div className="absolute top-2 left-4">No results</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocationSearch;
