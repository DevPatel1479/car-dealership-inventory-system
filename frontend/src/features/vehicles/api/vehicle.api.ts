interface Vehicle {
    id: string;
    make: string;
    model: string;
    category: string;
    price: number;
    quantity: number;
}


export async function getVehicles(): Promise<Vehicle[]> {

    return [
        {
            id: '1',
            make: 'Toyota',
            model: 'Camry',
            category: 'Sedan',
            price: 25000,
            quantity: 5,
        },
    ];

}