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
        </form>
    );
}