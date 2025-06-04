import '../styles/ErrorPage.css'

function ErrorPage() {

    const uri = location.pathname;

    return (
        <>
        <h1>Estás viendo la página de Error</h1>
        <h2>Porque la página: {uri} no existe</h2>
        </>
    );
}

export default ErrorPage;