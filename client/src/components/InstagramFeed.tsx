const InstagramFeed = () => {
  // Mock Instagram feed data
  const instagramPosts = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      alt: "Handcrafted wooden table",
      likes: 124,
      comments: 8
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1604406491938-41e1ad7f246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      alt: "Workshop crafting process",
      likes: 98,
      comments: 5
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      alt: "Wooden cabinetry installation",
      likes: 215,
      comments: 12
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
      alt: "Finished wooden staircase",
      likes: 176,
      comments: 9
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-3">Follow Our Journey</h2>
          <p className="text-[#8C7354] max-w-2xl mx-auto">
            Get inspired by our latest projects and behind-the-scenes craftsmanship
          </p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-4 text-[#8C7354] hover:text-[#4A3C2A] font-medium">
            <i className="fab fa-instagram mr-2 text-xl"></i> @woodcraft_millworks
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map(post => (
            <a 
              key={post.id}
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block aspect-square overflow-hidden group relative"
            >
              <img 
                src={post.imageUrl} 
                alt={post.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#342917]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white flex space-x-4">
                  <span className="flex items-center"><i className="fas fa-heart mr-2"></i> {post.likes}</span>
                  <span className="flex items-center"><i className="fas fa-comment mr-2"></i> {post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
