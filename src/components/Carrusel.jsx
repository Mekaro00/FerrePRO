export function Carrusel () {
    return(
        <div className="container py-3">
                    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="5000">
                                <img
                                    src="/imagenes pagina ferreteria/Imagenes carrusel/Imagen_1.png"
                                    className="d-block w-100" 
                                    alt="Imagen1"
                                />
                            </div>
                            <div className="carousel-item" data-bs-interval="5000">
                                <img
                                    src="/imagenes pagina ferreteria/Imagenes carrusel/Imagen_2.png"
                                    className="d-block w-100" 
                                    alt="Imagen2"
                                />
                            </div>
                            <div className="carousel-item" data-bs-interval="5000">
                                <img
                                    src="/imagenes pagina ferreteria/Imagenes carrusel/Imagen_3.png"
                                    className="d-block w-100" 
                                    alt="Imagen3"
                                />
                            </div>
                        </div>
                        <button 
                            className="carousel-control-prev" 
                            type="button"
                            data-bs-target="#carouselExampleInterval"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button 
                            className="carousel-control-next" 
                            type="button"
                            data-bs-target="#carouselExampleInterval"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
    )
}