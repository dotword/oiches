const Maintenance = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-hero-maintenance bg-cover bg-center text-white">
            <div className="bg-black bg-opacity-40 p-8 rounded-lg text-center space-y-6 shadow-2xl backdrop-blur-md">
                <h1 className="text-4xl font-bold">Sitio en mantenimiento</h1>
                <p className="text-lg">
                    Estamos realizando algunos ajustes. Vuelve pronto.
                </p>
                <p className="text-sm">Gracias por tu paciencia.</p>
            </div>
        </div>
    );
};

export default Maintenance;
