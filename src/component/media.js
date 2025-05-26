import React, { useState } from 'react'; 
import { mediaImages } from './mediaurl';

const categories = ['All', ...new Set(mediaImages.map((img) => img.category))];

export default function MediaGallery() { const [selectedCategory, setSelectedCategory] = useState('All'); const [searchTerm, setSearchTerm] = useState(''); const [currentPage, setCurrentPage] = useState(1); const [lightboxImage, setLightboxImage] = useState(null);

const itemsPerPage = 8;

const filteredImages = mediaImages.filter((img) => { const inCategory = selectedCategory === 'All' || img.category === selectedCategory; const matchesSearch = img.title.toLowerCase().includes(searchTerm.toLowerCase()); return inCategory && matchesSearch; });

const paginatedImages = filteredImages.slice( (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage );

const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

return ( <section style={styles.container}> <header style={styles.header}> <p style={styles.subtitle}>Browse photos by category and search keywords</p> </header>

<div style={styles.categoryContainer}>
    {categories.map((cat) => (
          <button
                  key={cat}
                          onClick={() => {
                                    setSelectedCategory(cat);
                                              setCurrentPage(1);
                                                      }}
                                                              style={{
                                                                        ...styles.categoryButton,
                                                                                  ...(selectedCategory === cat ? styles.categoryButtonActive : {})
                                                                                          }}
                                                                                                >
                                                                                                        {cat}
                                                                                                              </button>
                                                                                                                  ))}
                                                                                                                    </div>

                                                                                                                      <div style={styles.searchContainer}>
                                                                                                                          <input
                                                                                                                                type="text"
                                                                                                                                      placeholder="Search images..."
                                                                                                                                            value={searchTerm}
                                                                                                                                                  onChange={(e) => setSearchTerm(e.target.value)}
                                                                                                                                                        style={styles.searchInput}
                                                                                                                                                            />
                                                                                                                                                              </div>

                                                                                                                                                                <div style={styles.grid}>
                                                                                                                                                                    {paginatedImages.map((img) => (
                                                                                                                                                                          <div key={img.id} onClick={() => setLightboxImage(img.url)} style={styles.card}>
                                                                                                                                                                                  <img src={img.url} alt={img.title} style={styles.image} loading="lazy" />
                                                                                                                                                                                          <p style={styles.caption}>{img.title}</p>
                                                                                                                                                                                                </div>
                                                                                                                                                                                                    ))}
                                                                                                                                                                                                      </div>

                                                                                                                                                                                                        <div style={styles.pagination}>
                                                                                                                                                                                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                                                                                                                                                                                  <button
                                                                                                                                                                                                                          key={page}
                                                                                                                                                                                                                                  onClick={() => setCurrentPage(page)}
                                                                                                                                                                                                                                          style={{
                                                                                                                                                                                                                                                    ...styles.pageButton,
                                                                                                                                                                                                                                                              ...(page === currentPage ? styles.pageButtonActive : {})
                                                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                                                                    {page}
                                                                                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                                                                              ))}
                                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                                  {lightboxImage && (
                                                                                                                                                                                                                                                                                                      <div style={styles.lightboxOverlay} onClick={() => setLightboxImage(null)}>
                                                                                                                                                                                                                                                                                                            <img src={lightboxImage} alt="Preview" style={styles.lightboxImage} />
                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                                                                                                                  </section>

                                                                                                                                                                                                                                                                                                                  ); }

                                                                                                                                                                                                                                                                                                                  const styles = { container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif', }, header: { textAlign: 'center', marginBottom: '40px' }, title: { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }, subtitle: { color: '#555' }, categoryContainer: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '30px' }, categoryButton: { padding: '8px 16px', borderRadius: '20px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer' }, categoryButtonActive: { backgroundColor: '#007BFF', color: '#fff', borderColor: '#007BFF' }, searchContainer: { textAlign: 'center', marginBottom: '30px' }, searchInput: { padding: '10px 15px', width: '100%', maxWidth: '400px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem' }, grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }, card: { cursor: 'pointer', textAlign: 'center' }, image: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }, caption: { marginTop: '8px', fontSize: '0.9rem', color: '#444' }, pagination: { marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '10px' }, pageButton: { padding: '8px 12px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#f5f5f5' }, pageButtonActive: { backgroundColor: '#007BFF', color: '#fff', borderColor: '#007BFF' }, lightboxOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }, lightboxImage: { maxWidth: '90%', maxHeight: '90%', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' } };

                                                                                                                                                                                                                                                                                                                  