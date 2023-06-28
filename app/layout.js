import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BeVeganState from './context/beVeganState'
export const metadata = {
  title: 'Home - Be Vegan',
  description: 
`
A Vegetarian Family Restaurant
Welcome to BE Vegan, your go-to destination for delicious vegetarian cuisine that caters to the whole family. Located in the heart of the city, our restaurant offers a warm and inviting atmosphere where you can enjoy a wide variety of flavorful plant-based dishes.

At BE Vegan, we believe that eating well doesn't mean compromising on taste or quality. That's why our talented chefs have crafted a menu that showcases the abundance of flavors and textures that can be found in vegetarian cuisine. From hearty soups and salads to savory main courses and mouthwatering desserts, every dish is thoughtfully prepared using only the freshest, locally sourced ingredients.

Whether you're a long-time vegetarian or simply looking to explore the world of plant-based eating, our menu has something for everyone. Start your meal with one of our delectable appetizers, such as crispy tofu bites or zucchini fritters, paired with a homemade dip bursting with flavor.

For the main course, you'll find an array of options that are sure to satisfy even the most discerning taste buds. Indulge in our signature beetroot burger, made with a homemade patty and topped with fresh vegetables and a tangy sauce. Or try our flavorful mushroom risotto, prepared with rich and creamy Arborio rice and a medley of seasonal mushrooms.

At BE Vegan, we understand the importance of catering to all dietary preferences and restrictions. That's why we offer a range of gluten-free, nut-free, and soy-free options, ensuring that everyone can enjoy a delicious meal without worry. Our knowledgeable staff is always on hand to assist with any dietary inquiries or special requests.

To complement your meal, we offer a carefully curated selection of beverages, including freshly squeezed juices, herbal teas, and locally sourced craft beers. And don't forget to save room for dessert! Indulge in a slice of our decadent chocolate cake or treat yourself to a refreshing fruit sorbet.

In addition to our mouthwatering menu, BE Vegan is committed to sustainability and environmental consciousness. We strive to minimize our carbon footprint by using eco-friendly packaging, supporting local farmers, and reducing food waste.

Whether you're looking for a cozy spot for a family dinner, a place to celebrate a special occasion, or simply craving a delicious vegetarian meal, BE Vegan is the perfect choice. Join us today and experience the flavors of vegetarian cuisine like never before.
`
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{backgroundColor: "#ffd700"}} suppressHydrationWarning={true}>
        <BeVeganState>
          <Navbar />
          {children}
          <Footer />
        </BeVeganState>
      </body>
    </html>
  )
}
