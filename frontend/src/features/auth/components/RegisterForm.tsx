export function RegisterForm() {
    return (
        <form>
            <label htmlFor="name">
                Name
            </label>

            <input
                id="name"
                name="name"
                type="text"
            />

            <label htmlFor="email">
                Email
            </label>

            <input
                id="email"
                name="email"
                type="email"
            />
        </form>
    );
}