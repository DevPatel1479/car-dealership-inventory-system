import {
    useState,
} from 'react';


import {
    createVehicle,
    updateVehicle,
} from '../api/vehicle.api';



interface VehicleFormProps {

    vehicle?: {
        id: string;
        make: string;
        model: string;
        category: string;
        price: number;
        quantity: number;
    };

}



export default function VehicleForm(
    {
        vehicle,
    }: VehicleFormProps,
) {


    const [form, setForm] = useState({

        make: vehicle?.make ?? '',
        model: vehicle?.model ?? '',
        category: vehicle?.category ?? '',
        price: vehicle?.price?.toString() ?? '',
        quantity: vehicle?.quantity?.toString() ?? '',

    });



    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {

        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });

    }



    async function handleSubmit(
        event: React.FormEvent,
    ) {

        event.preventDefault();


        const payload = {

            make: form.make,

            model: form.model,

            category: form.category,

            price: Number(form.price),

            quantity: Number(form.quantity),

        };



        if (vehicle) {


            await updateVehicle(
                vehicle.id,
                payload,
            );


        } else {


            await createVehicle(
                payload,
            );


        }


    }



    return (

        <form
            onSubmit={handleSubmit}
        >


            <label>

                Make

                <input
                    aria-label="Make"
                    name="make"
                    value={form.make}
                    onChange={handleChange}
                />

            </label>



            <label>

                Model

                <input
                    aria-label="Model"
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                />

            </label>



            <label>

                Category

                <input
                    aria-label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                />

            </label>



            <label>

                Price

                <input
                    aria-label="Price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                />

            </label>



            <label>

                Quantity

                <input
                    aria-label="Quantity"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                />

            </label>



            <button
                type="submit"
            >

                {
                    vehicle
                        ? 'Update Vehicle'
                        : 'Create Vehicle'
                }

            </button>



        </form>

    );

}