import {
    useState,
} from 'react';


import {
    searchVehicles,
} from '../api/vehicle.api';



export default function VehicleSearch() {


    const [make, setMake] = useState('');



    async function handleSearch() {

        await searchVehicles({
            make,
        });

    }



    return (
        <div>

            <input
                placeholder="Search by make"
                value={make}
                onChange={(event) =>
                    setMake(
                        event.target.value,
                    )
                }
            />


            <button
                onClick={handleSearch}
            >
                Search
            </button>


        </div>
    );

}