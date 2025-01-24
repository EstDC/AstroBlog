// src/components/SearchModal.jsx
import React, { useState, useEffect, useRef } from 'react';

function SearchModal({ posts }) {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // Manejar cambios en el input de búsqueda
  const handleOnSearch = (e) => {
    const valor = e.target.value;
    setQuery(valor);

    if (valor.trim() === '') {
      setFilteredResults([]);
      setIsModalOpen(false);
      return;
    }

    const lowerTerm = valor.toLowerCase();
    const filtrados = posts.filter(post =>
      post.title.toLowerCase().includes(lowerTerm) ||
      post.description.toLowerCase().includes(lowerTerm) ||
      post.content.toLowerCase().includes(lowerTerm)
    );

    setFilteredResults(filtrados);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Cerrar modal con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Cerrar modal al hacer clic fuera del contenido
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        closeModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isModalOpen]);

  return (
    <div className="relative">
      {/* Input de búsqueda */}
      <div className="p-4 w-3/4 ml-10">
        <input
          id="searchInput"
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={handleOnSearch}
          className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
          ref={inputRef}
        />
      </div>

      {/* Modal para resultados */}
      {isModalOpen && (
        <div className="absolute left-14 top-full mt-0 bg-white p-4 rounded-lg shadow-lg z-50 w-full md:w-4/6 max-h-96 overflow-y-auto" ref={modalRef}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-simplicity">Resultados de búsqueda</h2>
            <button 
              onClick={closeModal}
              className="text-2xl"
              aria-label="Cerrar búsqueda"
            >
              &times;
            </button>
          </div>
          <div>
            {filteredResults.length > 0 ? (
              filteredResults.map((post) => (
                <div key={post.id} className="mb-4 pb-2 border-b border-gray-300">
                  <a 
                    href={`/blog/${post.slug}`} 
                    className="text-red-600 hover:underline font-bold font-simplicity text-xl"
                    onClick={closeModal}
                  >
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-16 h-16 object-cover mr-2 inline-block" 
                    />
                    {post.title}
                  </a>
                  <p className="text-sm text-gray-500">{post.description}</p>
                </div>
              ))
            ) : (
              <p>No se encontraron resultados.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchModal;

