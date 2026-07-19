import {
    useState,
} from 'react';


import {
    createVehicle,
} from '../api/vehicle.api';



export default function VehicleForm() {


    const [form, setForm] = useState({
        make: '',
        model: '',
        category: '',
        price: '',
        quantity: '',
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


        await createVehicle({
            make: form.make,
            model: form.model,
            category: form.category,
            price: Number(form.price),
            quantity: Number(form.quantity),
        });


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
                Create Vehicle
            </button>


        </form>
    );

}