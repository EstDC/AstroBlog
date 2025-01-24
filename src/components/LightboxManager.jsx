import React, { useState, useEffect } from "react";

export default function LightboxManager() {
  const [currentUrl, setCurrentUrl] = useState(null);

  // Cerrar el modal
  function closeModal() {
    setCurrentUrl(null);
  }

  useEffect(() => {
    // Función que maneja clicks globales
    function handleClick(e) {
      const target = e.target;
      // Si el elemento clicado es una <img> con data-image-url
      if (target.tagName === 'IMG' && target.dataset.imageUrl) {
        // Tomamos esa URL y abrimos el modal
        setCurrentUrl(target.dataset.imageUrl);
      }
    }

    // Agregamos el listener al montar el componente
    document.addEventListener("click", handleClick);

    // Lo quitamos al desmontar
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Si currentUrl NO es null, mostramos un overlay con la imagen
  // Si es null, no renderizamos nada (return null)
  return currentUrl ? (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
      // Al hacer clic en el fondo, cerramos
      onClick={closeModal}
    >
      <div className="relative" onClick={e => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button
          className="absolute top-2 right-2 text-white text-3xl font-bold"
          onClick={closeModal}
        >
          &times;
        </button>
        <img
          src={currentUrl}
          alt="Imagen ampliada"
          className="max-w-[80vw] max-h-[80vh] object-cover"
        />
      </div>
    </div>
  ) : null;
}