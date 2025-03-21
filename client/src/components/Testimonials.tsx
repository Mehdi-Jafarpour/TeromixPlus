import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center text-amber-500 mb-4">
      {[...Array(5)].map((_, i) => (
        <i 
          key={i} 
          className={`fas ${i < Math.floor(rating) ? 'fa-star' : i < rating ? 'fa-star-half-alt' : 'fa-star'}`}
        ></i>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-3">What Our Clients Say</h2>
            <p className="text-[#8C7354] max-w-2xl mx-auto">Loading testimonials...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-[#F9F5E7] p-6 rounded-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-24 bg-gray-200 rounded mb-6"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="ml-4">
                    <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-3">What Our Clients Say</h2>
          <p className="text-red-500">Failed to load testimonials. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-3">What Our Clients Say</h2>
          <p className="text-[#8C7354] max-w-2xl mx-auto">Here's what homeowners and designers have to say about our custom wooden millwork</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials && testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-[#F9F5E7] p-6 rounded-lg">
              <StarRating rating={testimonial.rating} />
              <p className="text-[#4A3C2A] italic mb-6">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.imageUrl} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#8C7354]"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-[#4A3C2A]">{testimonial.name}</h4>
                  <p className="text-sm text-[#8C7354]">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}

          {testimonials && testimonials.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-[#4A3C2A]">No testimonials available yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
