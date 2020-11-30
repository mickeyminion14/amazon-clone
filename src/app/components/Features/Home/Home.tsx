import React from "react";
import "./Home.scss";
import Product from "./Product/Product";

function Home() {
  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/GWphase2/v2/Phase2_Unrec_PC_1X_Hero_1500x600._CB417374214_.jpg"
        alt=""
      />
      <div className="home__row">
        <Product
          id="1"
          title="
        Mi Smart Band 5-1.1” AMOLED Color Display, 2 Weeks Battery Life, 5ATM Water Resistant"
          price={2498.0}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/719ZywAmvOL._SL1500_.jpg"
        />
        <Product
          id="12"
          title="
          Frsh by Salman Khan Perfumed Dedorant Body Spray-TIGER & SWAG-Pack of 2 Perfume Body Spray - For Men  (400 ml, Pack of 2)"
          price={337.0}
          rating={4}
          image="https://rukminim1.flixcart.com/image/416/416/kebpqq80/deodorant/k/m/5/400-perfumed-dedorant-body-spray-tiger-swag-pack-of-2-perfume-original-imafvfe8hywsyay6.jpeg?q=70"
        />
      </div>
      <div className="home__row">
        <Product
          id="123"
          title="
          Samsung 27 inch (68.6 cm) Curved Bezel Less, Speakers, Fabric Textured Back Side, FHD, VA Panel with DP, HDMI, VGA, Audio in, Headphone Ports - LC27T550FDWXXL"
          price={18999.0}
          rating={3}
          image="https://images-na.ssl-images-amazon.com/images/I/8182-cB%2BtUL._SL1500_.jpg"
        />
        <Product
          id="1234"
          title="
          Think Like a Monk: The secret of how to harness the power of positivity and be happy now"
          price={227.0}
          rating={5}
          image="https://m.media-amazon.com/images/I/41mXQJF3aEL.jpg"
        />
        <Product
          id="12345"
          title="
          Kore Weight Lifting Rods + One Pair Dumbbell Rods Combo with Accessories"
          price={837.0}
          rating={2}
          image="https://images-na.ssl-images-amazon.com/images/I/719JqcSX6LL._SL1500_.jpg"
        />
      </div>

      <div className="home__row">
        <Product
          id="123456"
          title="
          Sony Bravia 138.8 cm (55 inches) 4K Ultra HD Certified Android LED TV 55X7500H (Black) (2020 Model)"
          price={71240.0}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/91QD0vRZdVL._SL1500_.jpg"
        />
      </div>
    </div>
  );
}

export default Home;
